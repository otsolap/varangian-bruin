// Extending the window object to include Matomo's tracking array
const windowWithMatomo = window || globalThis;
windowWithMatomo._mtm = windowWithMatomo._mtm || [];

export const pageView = (url) => {
  if (typeof windowWithMatomo._mtm !== "undefined") {
    windowWithMatomo._mtm.push({
      event: "mtm.PageView",
      url: url,
    });
  } else {
    console.log({
      event: "mtm.PageView",
      url: url,
    });
  }
};