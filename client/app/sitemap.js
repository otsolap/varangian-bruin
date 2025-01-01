import { getStrapiURL } from "@/utils/index"
import config from '@/utils/config'

export default async function sitemap() {
  const urls = [
    `/${config.pages.API_PAGES_QUERY}`,
    `/api/articles`,
    `/api/services`,
    `/${config.services.API_SERVICE_TYPES_PATH_QUERY}`,
    `/${config.blog.API_CATEGORY_PATH_QUERY}`
  ];

  const fetchPromises = urls.map(url => fetch(getStrapiURL(url)).then(res => res.json()));

  const [pages, articles, services, serviceTypes, categories] = await Promise.all(fetchPromises);

  const sitemapEntries = [
    {
      url: 'https://varangianventure.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
    },
    {
      url: 'https://varangianventure.com/services',
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: 'https://varangianventure.com/blog',
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
  ];

  const addEntry = (url, date) => {
    const lastModified = new Date(date);
    if (!isNaN(lastModified)) {
      sitemapEntries.push({
        url,
        lastModified,
      });
    }
  };

  pages.data.forEach(page => {
    addEntry(`https://varangianventure.com/${page.slug}`, page.updatedAt);
  });

  articles.data.forEach(article => {
    addEntry(`https://varangianventure.com/blog/${article.slug}`, article.updatedAt);
  });

  services.data.forEach(service => {
    addEntry(`https://varangianventure.com/services/${service.slug}`, service.updatedAt);
  });

  serviceTypes.data.forEach(serviceType => {
    addEntry(`https://varangianventure.com/service-types/${serviceType.slug}`, serviceType.updatedAt);
  });

  categories.data.forEach(category => {
    addEntry(`https://varangianventure.com/category/${category.slug}`, category.updatedAt);
  });

  return sitemapEntries;
}