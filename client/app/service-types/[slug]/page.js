import Hero from "@/components/blocks/Hero"
import { ArchiveSection } from "@/components/services/ArchiveSection"
import { getStrapiURL } from "@/utils/index"
import config from '@/utils/config'
import { notFound } from 'next/navigation'

export default async function serviceTypesSlug ({ params }) {
  const { hero, items, service_types } = await getContent(params)

  return (
    <>
      <Hero {...hero} />
      <ArchiveSection items={items} service_types={service_types} />
    </>
  )
}

export async function generateStaticParams() {
    const res =  await fetch(getStrapiURL(`/${config.services.API_SERVICE_TYPES_PATH_QUERY}`))
    const resData = await res.json()
    const slugs = resData.data.map(item => item.attributes.slug)
    return slugs.map(slug => ({
       params: { slug: slug }
    }))
  }
  

async function getContent(params) {
    try {
      const urls = [
        getStrapiURL(`/${config.services.API_SERVICE_TYPES_CONTENT_QUERY}&filters[slug][$eq]=${params.slug}`),
        getStrapiURL(`/${config.services.API_SERVICE_TYPES_PATH_QUERY}`),
      ];
  
      const [serviceTypeResponse, allServiceTypes] = await Promise.all(urls.map(url => fetch(url)));

      const archivePageData = await serviceTypeResponse.json();
      const serviceTypesData = await allServiceTypes.json();

      const matchingServiceType = archivePageData.data.find(
        (service_type) => service_type.attributes.slug === params.slug
      )
  
      return {
        hero: matchingServiceType.attributes.hero ?? {},
        items: matchingServiceType.attributes.services.data ?? {},
        service_types: serviceTypesData.data ?? {},   
      }
  
    } catch (error) {
      console.error('Error:', error);
      notFound()
    }
  }