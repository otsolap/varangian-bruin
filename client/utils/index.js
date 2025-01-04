import config from '@/utils/config'

  // Youtube url
  export const YouTubeGetID = (url) => {
      url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
      return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0]
  }
    
  // Paginate helper function
  export const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize
    return items.slice(startIndex, startIndex + pageSize)
  }

  // Take the title and return it as a "slug".
  // used for creating non spaced IDs for input and text fields.
  export const createID = (title) => {
    return title.replace(/\s+/g, '_').toLowerCase();
  }
  
  // Get the url of the Strapi API based on the env variable or the default local one.
  export function getStrapiURL(path) {
    return `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL}${path}`
  }

  export function getStrapiMedia(url) {
    if (url == null) {
      return null
    }

    // Return the full URL if the media is hosted on an external provider
    if (url.startsWith("http") || url.startsWith("//")) {
      return url
    }

    // Otherwise prepend the URL path with the Strapi URL
    return `${process.env.NEXT_PUBLIC_API_URL  || process.env.NEXT_PUBLIC_API_URL}${url}`
  }

  export async function fetchBannerData() {
    try {
      const urls = [
        getStrapiURL(`/${config.pages.API_SERVICES_BANNER_QUERY}`),
        getStrapiURL(`/${config.pages.API_SUBSCRIBE_FORM_QUERY}`)
      ];
  
      let servicesBannerResponse, subscribeFormResponse;
      try {
        [servicesBannerResponse, subscribeFormResponse] = await Promise.all(urls.map(url => fetch(url)));
      } catch (error) {
        console.error('Failed to fetch API data:', error);
      }

      const servicesBannerData = await servicesBannerResponse?.json() || null;
      const subscribeFormData = await subscribeFormResponse?.json() || null;
  
      return {
        servicesBanner: servicesBannerData.data.banner ?? null,
        subscribeForm: subscribeFormData.data ?? null
      };
    } catch (error) {
      console.error('fetch Banner data error:', error);
      return null;
    }
  }

  export async function fetchGlobalData() {
    try {
      const urls = [
        getStrapiURL(`/${config.global.API_NAVIGATION_QUERY}`),
        getStrapiURL(`/${config.global.API_FOOTER_QUERY}`),
        getStrapiURL(`/${config.global.API_ANALYTICS_QUERY}`),
        getStrapiURL(`/${config.global.API_BLOG_NAVIGATION_QUERY}`),
        getStrapiURL(`/${config.blocks.API_CONTENT_BLOG_SECTION_LATEST_QUERY}`),
      ];
  
      let navigationResponse, footerResponse, analyticsResponse, blogNavigationResponse, latestBlogs;
      try {
        [navigationResponse, footerResponse, analyticsResponse, blogNavigationResponse, latestBlogs] = await Promise.all(urls.map(url => fetch(url)));
      } catch (error) {
        console.error('Failed to fetch API data:', error);
      }
  
      const navigationData = await navigationResponse?.json() || null;
      const footerData = await footerResponse?.json() || null;
      const analyticsData = await analyticsResponse?.json() || null;
      const blogNavigationData = await blogNavigationResponse?.json() || null;
  
      return {
        navigation: navigationData,
        footer: footerData,
        analytics: analyticsData,
        blogNavigation: blogNavigationData,
      };
    } catch (error) {
      console.error('fetch Global Data error:', error);
      return null;
    }
  }
  
  export async function fetchGlobalSEOData() {
    try {
      const url = getStrapiURL(`/${config.global.API_BASE_SEO_QUERY}`);
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch Global SEO Data:', error);
      return null;
    }
  }

  export function generateOpenGraphImages(imageFormats) {
    if (!imageFormats) return null;

    return Object.values(imageFormats).map((image) => ({
      url: getStrapiMedia(image.url),
      width: image.width,
      height: image.height,
    }));
  }