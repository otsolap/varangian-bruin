import Hero from "@/components/blocks/Hero"
import { ArchiveSection } from "@/components/services/ArchiveSection"
import { getStrapiURL } from "@/utils/api"
import config from '@/utils/config'
import { notFound } from 'next/navigation'

export default async function serviceTypesSlug(props) {
  const params = await props.params;
  const { hero, items, service_types } = await getContent(params)

  return (
    <>
      <Hero {...hero} />
      <ArchiveSection items={items} service_types={service_types} />
    </>
  )
}

export async function generateStaticParams() {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    };
    const res =  await fetch(getStrapiURL(`/${config.endpoints.serviceTypes}`), { headers})
    const resData = await res.json()
    const slugs = resData.data.map(item => item.slug)
    return slugs.map(slug => ({
       params: { slug: slug }
    }))
  }
  

async function getContent(params) {
    try {
      const urls = [
        getStrapiURL(`/${config.serviceTypes.content}&${config.blocks.filterBySlug}=${params.slug}`),
        getStrapiURL(`/${config.endpoints.serviceTypes}`),
      ];
  
      const [serviceTypeResponse, allServiceTypes] = await Promise.all(
        urls.map(url => fetch(url))
      );

      const [archivePageData, serviceTypesData] = await Promise.all([
        serviceTypeResponse.json(),
        allServiceTypes.json()
      ]);

      const matchingServiceType = archivePageData.data.find(
        (service_type) => service_type.slug === params.slug
      )
  
      return {
        hero: matchingServiceType?.hero ?? {},
        items: matchingServiceType?.services?? {},
        service_types: serviceTypesData.data ?? {},   
      }
  
    } catch (error) {
      console.error('Error:', error);
      notFound()
    }
  }