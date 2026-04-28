const { db } = require("../utils/firebase");
const { syncApplicationToAlgolia } = require("../utils/algolia");

async function backfillApplications() {
  const targetApplicationId = process.argv[2];

  if (targetApplicationId) {
    await syncApplicationToAlgolia(targetApplicationId);
    console.log(`Backfilled ${targetApplicationId}`);
    console.log("Algolia backfill completed");
    return;
  }

  const snapshot = await db.collection("applications").get();

  console.log(`Found ${snapshot.size} applications to backfill`);

  for (const doc of snapshot.docs) {
    const applicationId = doc.data().applicationId;

    if (!applicationId) {
      console.warn(`Skipping ${doc.id}: missing applicationId`);
      continue;
    }

    await syncApplicationToAlgolia(applicationId);
    console.log(`Backfilled ${applicationId}`);
  }

  console.log("Algolia backfill completed");
}

backfillApplications()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Algolia backfill failed:", error);
    process.exit(1);
  });
