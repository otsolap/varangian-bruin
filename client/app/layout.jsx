import { poppins, hind_guntur } from "@/app/fonts"
import "@/styles/globals.css"
import { fetchGlobalData, fetchGlobalSEOData, generateOpenGraphImages, getStrapiURL } from "@/utils/index"
import config from '@/utils/config'
import Script from 'next/script';
import Header from "@/components/navigation/Header"
import Footer from "@/components/navigation/Footer"
import MobileFooter from "components/navigation/MobileFooter"

export const fetchCache = 'default-cache'

export default async function RootLayout({ children }) {
  let navigation, footer, analytics, blogNavigation, servicePaths, blogPaths

  try {
    const global = await fetchGlobalData()

    const [servicePathsRes, blogPathsRes] = await Promise.all([
      fetch(getStrapiURL(`/${config.services.API_SERVICES_NAV_QUERY}`)),
      fetch(getStrapiURL(`/${config.blog.API_BLOG_NAV_QUERY}`))
    ])
    
    const [servicePathsData, blogPathsData] = await Promise.all([
      servicePathsRes.json(),
      blogPathsRes.json()
    ])

    navigation = global.navigation.data
    footer = global.footer.data
    blogNavigation = global.blogNavigation.data
    analytics = global.analytics.data

    servicePaths = servicePathsData
    blogPaths = blogPathsData

    console.log(analytics.siteID, analytics.siteURL)

  } catch (error) {
    console.error('Error:', error);
  }
  
  return (
    <html lang="en" className={`${hind_guntur.variable} ${poppins.variable}`}>
      <body>
        <Header 
          navigation={navigation} 
          blogNavigation={blogNavigation} 
          servicePaths={servicePaths}
          blogPaths={blogPaths}
        />
        <main className={'container'}>
          {children}
        </main>
        <Footer footer={footer} />
        <MobileFooter 
            navigation={navigation} 
            blogPaths={blogPaths} 
            socialShare={blogNavigation.social}
        />
        <div id="modal-root"></div>
        <Script 
            id="matomo-site-tracker"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                var _mtm = window._mtm = window._mtm || [];
                _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
                (function() {
                  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                  g.async=true; g.src=\`${analytics.siteURL}\`; s.parentNode.insertBefore(g,s);
                })();
                
                // Initialize Matomo tracker
                var _paq = window._paq = window._paq || [];
                _paq.push(['trackPageView']);
                _paq.push(['enableLinkTracking']);
                (function() {
                  var u="${analytics.siteURL.split('/').slice(0, -1).join('/')}/";
                  _paq.push(['setTrackerUrl', u+'matomo.php']);
                  _paq.push(['setSiteId', '${analytics.siteID}']);
                  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                  g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
                })();
              `,
            }}
          />
      </body>
    </html>
  )
}

export async function generateMetadata() {
  let baseSEO

  try {
    const global = await fetchGlobalSEOData()
    baseSEO = global.data
  } catch (error) {
    console.error('Error:', error)
  }
  
  if(!baseSEO || Object.keys(baseSEO).length === 0) return null;

  const ogImages = generateOpenGraphImages(baseSEO.imageBlock?.image?.formats)
  
  return {
    metadataBase: baseSEO.URL ? new URL(`${baseSEO.URL}`) : null,
    robots: {
      index:  !baseSEO.preventIndexing,
      follow: !baseSEO.preventIndexing,
      googleBot: {
        index: !baseSEO.preventIndexing,
        follow: !baseSEO.preventIndexing
      }
    },
    title: {
      template: `%s — ${baseSEO.title}`,
      default: baseSEO.title
    },
    description: baseSEO.description,
    keywords: [baseSEO.keywords],
    twitter: {
      site: baseSEO.XTwitter,
      creator: baseSEO.XTwitter,
    },
    openGraph: {
      title: {
        default: baseSEO.title,
        template: `%s — ${baseSEO.title}`
      },
      description: baseSEO.description,
      images: ogImages,
    },
    icons: {
      icon: '/icons/favicon.ico',
      apple: '/icons/apple-touch-icon.png',
    },
    manifiest: '/icons/site.webmanifest',
  }
}