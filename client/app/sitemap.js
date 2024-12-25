import { getStrapiURL } from "@/utils/index"
import config from '@/utils/config'

export default function sitemap() {




// fetch(getStrapiURL(`/${config.pages.API_PAGES_QUERY}
//  fetch(getStrapiURL(`/api/articles`))
// await fetch(getStrapiURL(`/api/services`))
//     const res =  await fetch(getStrapiURL(`/${config.services.API_SERVICE_TYPES_PATH_QUERY}`))
//     const res =  await fetch(getStrapiURL(`/${config.blog.API_CATEGORY_PATH_QUERY}`))

    return [
      {
        url: 'https://varangianventure.com',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: 'https://varangianventure.com/services',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.8,
      },
      {
        url: 'https://varangianventure.com/blog',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
    ]
  }