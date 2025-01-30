import { getStrapiURL } from "@/utils/api"
import config from '@/utils/config'

export default async function sitemap() {
  const urls = [
    `/${config.pages.API_PAGES_QUERY}`,
    `/api/articles`,
    `/api/services`,
    `/${config.services.API_SERVICE_TYPES_PATH_QUERY}`,
    `/${config.blog.API_CATEGORY_PATH_QUERY}`
  ];

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
};

  const fetchPromises = urls.map(url => 
    fetch(getStrapiURL(url, { headers })).then(res => res.json())
  );

  const [pages, articles, services, serviceTypes, categories] = await Promise.all(fetchPromises);

  const sitemapEntries = [
    {
      url: `${process.env.PRODUCTION_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
    },
    {
      url: `${process.env.PRODUCTION_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: `${process.env.PRODUCTION_URL}/blog`,
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
    addEntry(`${process.env.PRODUCTION_URL}/${page.slug}`, page.updatedAt);
  });

  articles.data.forEach(article => {
    addEntry(`${process.env.PRODUCTION_URL}/blog/${article.slug}`, article.updatedAt);
  });

  services.data.forEach(service => {
    addEntry(`${process.env.PRODUCTION_URL}/services/${service.slug}`, service.updatedAt);
  });

  serviceTypes.data.forEach(serviceType => {
    addEntry(`${process.env.PRODUCTION_URL}/service-types/${serviceType.slug}`, serviceType.updatedAt);
  });

  categories.data.forEach(category => {
    addEntry(`${process.env.PRODUCTION_URL}/category/${category.slug}`, category.updatedAt);
  });

  return sitemapEntries;
}