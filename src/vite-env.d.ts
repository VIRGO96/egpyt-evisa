/// <reference types="vite/client" />

// reCAPTCHA Enterprise typings available at runtime
interface GrecaptchaEnterprise {
	execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

interface GrecaptchaGlobal {
	enterprise?: GrecaptchaEnterprise;
}

interface Window {
	grecaptcha?: GrecaptchaGlobal;
	CardSDK: any;
	dataLayer: any[];
}
