import { getStrapiMedia } from "@/utils/api"

// Youtube url
  export const YouTubeGetID = (url) => {
      url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
      return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0]
  }
    
  // Paginate helper function
  export const paginate = (items, pageNumber, pageSize) => {
    if (!items.length) return {}
    const startIndex = (pageNumber - 1) * pageSize
    return items.slice(startIndex, startIndex + pageSize)
  }

  // Take the title and return it as a "slug".
  // used for creating non spaced IDs for input and text fields.
  export const createID = (title) => {
    return title.replace(/\s+/g, '_').toLowerCase();
  }

  export function generateOpenGraphImages(imageFormats) {
    if (!imageFormats) return null;

    return Object.values(imageFormats).map((image) => ({
      url: getStrapiMedia(image.url),
      width: image.width,
      height: image.height,
    }));
  }