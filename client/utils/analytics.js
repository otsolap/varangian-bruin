// Extending the window object to include Matomo's tracking array
const windowWithMatomo = typeof window !== 'undefined' ? window : globalThis;

export const SITE_URL = process.env.NEXT_PUBLIC_MATOMO_SITE_URL;
export const TAG_MANAGER_ID = process.env.NEXT_PUBLIC_MATOMO_TAG_MANAGER_ID;

export const pageView = (url) => {
  if (typeof windowWithMatomo._mtm === 'undefined') {
    windowWithMatomo._mtm = [];
  }
  windowWithMatomo._mtm.push({
    event: "mtm.PageView",
    url: url,
  });
};