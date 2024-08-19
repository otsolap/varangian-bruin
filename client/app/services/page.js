import Hero from "@/components/blocks/Hero"
import { ArchiveSection } from "@/components/services/ArchiveSection"
import { getStrapiURL,  generateOpenGraphImages  } from "@/utils/index"
import config from '@/utils/config'
import { notFound } from 'next/navigation'

async function getContent() {
    try {
      const urls = [
        getStrapiURL(`/${config.services.API_ARCHIVE_PAGE_QUERY}`),
        getStrapiURL(`/${config.services.API_SERVICES_QUERY}`),
        getStrapiURL(`/${config.services.API_SERVICE_TYPES_PATH_QUERY}`)
      ];
  
      const [archivePageResponse, servicesResponse, serviceTypesResponse] = await Promise.all(urls.map(url => fetch(url)));
  
      const archivePageData = await archivePageResponse.json();
      const servicesData = await servicesResponse.json();
      const serviceTypesData = await serviceTypesResponse.json();
  
      return {
        meta: archivePageData.data.attributes.seo ?? {},
        hero: archivePageData.data.attributes.hero ?? {},
        items: servicesData.data ?? {},
        service_types: serviceTypesData.data ?? {},   
      }
  
    } catch (error) {
      console.error('Error:', error);
      notFound()
    }
  }

  export async function generateMetadata({ params }) {
    const pageUrl = `/${params.slug}`
    const { meta } = await getContent(params)
    
    if(!meta || Object.keys(meta).length === 0) return null;
  
    const ogImages = await generateOpenGraphImages(meta.imageBlock?.image?.data?.attributes?.formats)
  
    return {
      robots: {
        index:  meta.preventIndexing,
        follow: meta.preventIndexing,
        googleBot: {
          index: meta.preventIndexing,
          follow: meta.preventIndexing
        }
      },
      title: {
        default: meta.title,
      },
      description: meta.description,
      keywords: [meta.keywords],
      openGraph: {
        title: meta.title,
        description: meta.description,
        url: pageUrl,
        images: ogImages,
      },
      alternates: {
        canonical: pageUrl
      }
    }
  }

  export default async function Page () {
    const { hero, items, service_types } = await getContent()
  
    return (
      <>
        <Hero {...hero} />
        <ArchiveSection items={items} service_types={service_types} />
      </>
    )
  }
  
  