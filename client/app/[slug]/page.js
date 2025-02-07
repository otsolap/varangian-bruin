import { getStrapiURL, fetchBannerData, generateOpenGraphImages } from "@/utils/index"
import config from '@/utils/config'
import Blocks from "@/components/Blocks"
import { notFound } from 'next/navigation'
import Banner from "@/components/blocks/Banner"
import SubscribeForm from "components/blocks/SubscribeForm";

export default async function PageSlug(props) {
  const params = await props.params;
  const { blocks, showServicesBanner, showSubscribeForm } = await getContent(params)
  const banners = await fetchBannerData();
  const { servicesBanner, subscribeForm } = banners;

  return (
    <>
    <Blocks blocks={blocks} />
    {showServicesBanner && <Banner {...servicesBanner} />}
    {showSubscribeForm && <SubscribeForm {...subscribeForm} />}
    </>
  )
}

export async function generateStaticParams() {
  const res =  await fetch(getStrapiURL(`/${config.pages.API_PAGES_QUERY}`))
  const resData = await res.json()
  const slugs = resData.data.map(item => item.slug)
  
  return slugs.map(slug => ({
    params: { slug: slug }
  }))
  
}

async function getContent(params) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
  };

  try {
    const apiResponse = await fetch(getStrapiURL(`/${config.pages.API_PAGES_QUERY}?${config.blocks.API_DYNAMIC_ZONE_BLOCKS}&${config.blocks.API_SEO_BLOCK_QUERY}&filters[slug][$eq]=${params.slug}`), { headers });
    const fetchedData = await apiResponse.json();
    
    if (!fetchedData.data || fetchedData.data.length === 0) notFound();
    
    const { title, blocks, seo, showServicesBanner, showSubscribeForm } = fetchedData.data[0] ?? {};

    return {
        pageTitle: title ?? '',
        meta: seo ?? {},
        blocks: blocks ?? {},
        showServicesBanner: showServicesBanner ?? false,
        showSubscribeForm: showSubscribeForm ?? false,
    };
  } catch (error) {
    console.error('Error:', error);
    notFound()
  }
}

export async function generateMetadata(props) {
  const params = await props.params;
  const pageUrl = `/${params.slug}`
  const { meta, pageTitle } = await getContent(params)

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
    title: meta.title ?? pageTitle,
    description: meta.description,
    keywords: [meta.keywords],
    openGraph: {
      title: meta.title ?? pageTitle,
      description: meta.description,
      url: pageUrl,
      images: ogImages,
    },
    alternates: {
      canonical: pageUrl
    }
  }
}

