export default function sitemap() {
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