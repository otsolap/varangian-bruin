import { getStrapiURL, fetchBannerData, generateOpenGraphImages } from "@/utils/api"
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
  try {
    const res = await fetch(getStrapiURL(`/${config.pages.API_PAGES_QUERY}?${config.blocks.API_DYNAMIC_ZONE_BLOCKS}&filters[slug][$eq]=${params.slug}`))
    const resData = await res.json()

    if (!resData.data || resData.data.length === 0) notFound();

    return {
      pageTitle: resData.data[0]?.title ?? '',
      meta: resData.data[0]?.seo ?? {},
      blocks: resData.data[0]?.blocks ?? {},
      showServicesBanner: resData.data[0]?.showServicesBanner ?? false,
      showSubscribeForm: resData.data[0]?.showSubscribeForm ?? false,
    }
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

