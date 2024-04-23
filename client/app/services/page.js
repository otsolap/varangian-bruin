import Hero from "@/components/blocks/Hero"
import { ArchiveSection } from "@/components/services/ArchiveSection"
import { getStrapiURL } from "@/utils/index"
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
        hero: archivePageData.data.attributes.hero ?? {},
        items: servicesData.data ?? {},
        service_types: serviceTypesData.data ?? {},   
      }
  
    } catch (error) {
      console.error('Error:', error);
      notFound()
    }
  }