const axios = require("axios");
const { db } = require("./firebase");
const { getSecrets } = require("./secrets");

function normalizeString(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function normalizeEmail(value) {
  return normalizeString(value).toLowerCase();
}

function normalizeStatus(value) {
  return normalizeString(value).toLowerCase();
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function isDeletedTraveller(traveller) {
  const value = traveller?.deleted;
  return value === true || value === "true" || value === 1 || value === "1";
}

function toComparableNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function getTravellerSortIndex(traveller) {
  const index = toComparableNumber(traveller?.travellerIndex);
  return index === null ? Number.MAX_SAFE_INTEGER : index;
}

function getTravellerIdentityKey(traveller) {
  const travellerIndex = toComparableNumber(traveller?.travellerIndex);
  if (travellerIndex !== null) {
    return `index:${travellerIndex}`;
  }

  const passport = normalizeString(traveller?.passportNumber).toUpperCase();
  if (passport) {
    return `passport:${passport}`;
  }

  const email = normalizeEmail(traveller?.email);
  if (email) {
    return `email:${email}`;
  }

  return `fallback:${normalizeString(traveller?._docId)}`;
}

function selectLatestTravellerRecord(current, incoming) {
  const currentUpdatedAt = Math.max(
    toMillis(current?.updatedAt),
    toMillis(current?.createdAt)
  );
  const incomingUpdatedAt = Math.max(
    toMillis(incoming?.updatedAt),
    toMillis(incoming?.createdAt)
  );

  return incomingUpdatedAt >= currentUpdatedAt ? incoming : current;
}

function prepareTravellersForSearch(travellers) {
  const dedupedByIdentity = new Map();

  for (const traveller of travellers) {
    if (isDeletedTraveller(traveller)) {
      continue;
    }

    const key = getTravellerIdentityKey(traveller);
    const existing = dedupedByIdentity.get(key);

    if (!existing) {
      dedupedByIdentity.set(key, traveller);
      continue;
    }

    dedupedByIdentity.set(
      key,
      selectLatestTravellerRecord(existing, traveller)
    );
  }

  return [...dedupedByIdentity.values()].sort((a, b) => {
    const indexDiff = getTravellerSortIndex(a) - getTravellerSortIndex(b);
    if (indexDiff !== 0) {
      return indexDiff;
    }

    return toMillis(a?.createdAt) - toMillis(b?.createdAt);
  });
}

function toMillis(value) {
  if (!value) {
    return Date.now();
  }

  if (typeof value.toMillis === "function") {
    return value.toMillis();
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value._seconds === "number") {
    return value._seconds * 1000;
  }

  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? Date.now() : parsed;
}

async function getAlgoliaConfig() {
  const secrets = await getSecrets([
    "ALGOLIA_APP_ID",
    "ALGOLIA_ADMIN_KEY",
    "ALGOLIA_APPLICATION_INDEX",
  ]);

  if (
    !secrets.ALGOLIA_APP_ID ||
    !secrets.ALGOLIA_ADMIN_KEY ||
    !secrets.ALGOLIA_APPLICATION_INDEX
  ) {
    throw new Error("Algolia secrets are missing");
  }

  return {
    appId: secrets.ALGOLIA_APP_ID,
    adminKey: secrets.ALGOLIA_ADMIN_KEY,
    indexName: secrets.ALGOLIA_APPLICATION_INDEX,
  };
}

async function algoliaRequest(method, path, data) {
  const { appId, adminKey } = await getAlgoliaConfig();

  return axios({
    method,
    url: `https://${appId}.algolia.net/1${path}`,
    headers: {
      "X-Algolia-API-Key": adminKey,
      "X-Algolia-Application-Id": appId,
      "Content-Type": "application/json",
    },
    data,
    timeout: 15000,
  });
}

function buildApplicationSearchRecord(applicationId, applicationData, travellers) {
  const applicants = travellers.map((traveller) => ({
    name: normalizeString(traveller.fullName),
    email: normalizeEmail(traveller.email),
    nationality: normalizeString(traveller.nationality),
    status: normalizeStatus(traveller.status),
  }));

  return {
    objectID: applicationId,
    applicationId,
    amount: applicationData.paymentAmount || 0,
    currency: normalizeString(applicationData.paymentCurrency) || "GBP",
    createdAt: toMillis(applicationData.createdAt),
    updatedAt: toMillis(applicationData.updatedAt),
    paymentStatus: normalizeString(applicationData.paymentStatus),
    totalTravellers: applicationData.totalTravellers || applicants.length,
    applicants,
    searchableNames: uniqueValues(applicants.map((applicant) => applicant.name)),
    searchableEmails: uniqueValues(
      applicants.map((applicant) => applicant.email)
    ),
    searchableStatuses: uniqueValues(
      applicants.map((applicant) => applicant.status)
    ),
  };
}

async function saveApplicationRecord(record) {
  const { indexName } = await getAlgoliaConfig();

  await algoliaRequest(
    "put",
    `/indexes/${encodeURIComponent(indexName)}/${encodeURIComponent(record.objectID)}`,
    record
  );
}

async function searchApplicationRecords({ query, status, page = 0, limit = 10 }) {
  const { indexName } = await getAlgoliaConfig();
  const params = new URLSearchParams();

  params.set("query", query || "");
  params.set("page", String(page));
  params.set("hitsPerPage", String(limit));

  if (status && status !== "all") {
    params.set("filters", `searchableStatuses:${status}`);
  }

  const response = await algoliaRequest(
    "post",
    `/indexes/${encodeURIComponent(indexName)}/query`,
    { params: params.toString() }
  );

  return response.data;
}

async function syncApplicationToAlgolia(applicationId) {
  const applicationSnapshot = await db
    .collection("applications")
    .where("applicationId", "==", applicationId)
    .limit(1)
    .get();

  if (applicationSnapshot.empty) {
    console.warn(`Algolia sync skipped: application ${applicationId} not found`);
    return;
  }

  const applicationData = applicationSnapshot.docs[0].data();
  const travellersSnapshot = await db
    .collection("travellers")
    .where("applicationId", "==", applicationId)
    .get();

  const travellers = prepareTravellersForSearch(
    travellersSnapshot.docs.map((doc) => ({
      _docId: doc.id,
      ...doc.data(),
    }))
  );
  const record = buildApplicationSearchRecord(
    applicationId,
    applicationData,
    travellers
  );

  await saveApplicationRecord(record);
}

async function safeSyncApplicationToAlgolia(applicationId, context) {
  try {
    await syncApplicationToAlgolia(applicationId);
    console.log(
      `✅ Algolia sync completed for ${applicationId}${context ? ` (${context})` : ""}`
    );
  } catch (error) {
    console.error(
      `❌ Algolia sync failed for ${applicationId}${context ? ` (${context})` : ""}:`,
      error.message
    );
  }
}

module.exports = {
  buildApplicationSearchRecord,
  safeSyncApplicationToAlgolia,
  searchApplicationRecords,
  syncApplicationToAlgolia,
};
