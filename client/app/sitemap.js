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

  pages.data.forEach(page => {
    sitemapEntries.push({
      url: `https://varangianventure.com/${page.slug}`,
      lastModified: new Date(page.updatedAt),
    });
  });

  articles.data.forEach(article => {
    sitemapEntries.push({
      url: `https://varangianventure.com/blog/${article.slug}`,
      lastModified: new Date(article.updatedAt),
    });
  });

  services.data.forEach(service => {
    sitemapEntries.push({
      url: `https://varangianventure.com/services/${service.slug}`,
      lastModified: new Date(service.updatedAt),
    });
  });

  serviceTypes.data.forEach(serviceType => {
    sitemapEntries.push({
      url: `https://varangianventure.com/service-types/${serviceType.slug}`,
      lastModified: new Date(serviceType.updatedAt),
    });
  });

  categories.data.forEach(category => {
    sitemapEntries.push({
      url: `https://varangianventure.com/category/${category.slug}`,
      lastModified: new Date(category.updatedAt),
    });
  });

  return sitemapEntries;
}