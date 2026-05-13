import Hero from "@/components/blocks/Hero"
import { ArchiveSection } from "@/components/services/ArchiveSection"
import { getStrapiURL  } from "@/utils/api"
import { generateOpenGraphImages  } from "@/utils/helpers"
import config from '@/utils/config'
import { notFound } from 'next/navigation'

export default async function Page () {
  const { hero, items, service_types } = await getContent()

  return (
    <>
      <Hero {...hero} />
      <ArchiveSection items={items} service_types={service_types} />
    </>
  )
}

async function getContent() {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    };

    try {
      const urls = [
        getStrapiURL(`/${config.services.archivePage}&${config.blocks.seo}`),
        getStrapiURL(`/${config.services.archivePageContent}`),
        getStrapiURL(`/${config.endpoints.serviceTypes}`)
      ];
  
      const [archivePageResponse, servicesResponse, serviceTypesResponse] = await Promise.all(
        urls.map(url => 
          fetch(url, { headers })
        )
      );

      const [archivePageData, servicesData, serviceTypesData] = await Promise.all([
        archivePageResponse.json(),
        servicesResponse.json(),
        serviceTypesResponse.json()
      ]);
  
      return {
        meta: archivePageData.data?.seo ?? {},
        hero: archivePageData.data?.hero ?? {},
        items: servicesData.data ?? {},
        service_types: serviceTypesData?.data ?? {},   
      }
    } catch (error) {
      console.error('Error:', error);
      notFound()
    }
  }

  export async function generateMetadata(props) {
    const params = await props.params;
    const pageUrl = `/${params.slug}`
    const { meta } = await getContent(params)

    if(!meta || Object.keys(meta).length === 0) return null;

    const ogImages = await generateOpenGraphImages(meta.imageBlock?.image?.formats)

    return {
      robots: {
        index:  !meta.preventIndexing,
        follow: !meta.preventIndexing,
        googleBot: {
          index: !meta.preventIndexing,
          follow: !meta.preventIndexing
        }
      },
      title: meta.title,
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