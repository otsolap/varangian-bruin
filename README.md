# Varangian Theme

The Varangian Theme is the primary theme for projects developed by the Varangian Venture, leveraging the capabilities of Strapi and NextJS.

- **Development**: Otso Lappalainen

## Used Technology

- **[NextJS](https://nextjs.org/)**: A powerful React framework providing server-side rendering and generating static websites. This ensures optimal performance and SEO-friendly content delivery for your web projects.
- **[Strapi](https://strapi.io/)**: An open-source headless CMS that allows for easy creation and management of APIs. Strapi's flexibility in content management streamlines the process of building and managing your website's content.

## Features

- **Collection Types**: The theme includes two primary collection types: Articles and Services. This dual functionality makes the theme highly versatile, suitable both for blogging platforms and service information portals.
- **Dynamic Content Zones**: Dynamic zones offer the flexibility to choose and customize content blocks without being confined to strict page layouts. This feature enhances the adaptability of your web pages, allowing you to tailor the layout according to specific content needs. The dynamic content zones include features such as accordion, mediamix, image gallery, banner, and cards.
  - **Dynamic Form Embedding**: With the "form embed" block, you can create dynamic forms using Strapi. This allows you to choose the inputs for your form and embed it directly into your site. All responses to the form are saved in the "Contacts (Form)" collection, making data collection and management seamless.

- **Built-in Integrations**:
  - **Matomo**: For GDPR-compliant data analytics, ensuring that you can monitor and analyze website traffic without infringing on user privacy.
  - **Convertkit**: A robust tool for subscriber list growth, especially for newsletters, enhancing your digital marketing capabilities.
  - **Google Search-Console**: Integration for monitoring and optimizing your site's presence in Google search results.

 
## Getting Started

### Database

First, set up a MySQL database. I recommend using [docker-mysql](https://hub.docker.com/_/mysql). Go to the `api` directory and use `env.example` to configure MySQL properly. Use password generators for safe and secure passwords.

### Backend

Install and set up the Strapi API. Configure an API Token for the project in both the backend and frontend, as this is required for all non-public API requests. The API token is a custom value with rights to `find`, `findOne` and `update`. The update feature is used for revalidation. You can read more at [NextJS](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration#route-segment-config)

Start publishing content such as Home, Page(s), etc.

### Frontend

Navigate to the `client` directory and use `.env.example` to set up the client properly. 

### Integrations

- Built-in integrations include Matomo, Convertkit, and Google Search Console.

## Special thanks

- ** Guidance & Mentorship **: 
  - [Åsk 'Dabitch' Wåppling](https://dabitch.net/)
  - [Ville 'Fokke' Saarivaara](https://fokke.fi/)
