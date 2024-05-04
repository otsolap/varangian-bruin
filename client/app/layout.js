import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { poppins, hind_guntur } from "@/app/fonts";
import "@/styles/globals.css"
import { fetchGlobalData, getStrapiURL } from "@/utils/index"
import config from '@/utils/config'
import Header from "components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import MobileFooter from "components/navigation/MobileFooter";

export default async function RootLayout({ children }) {
  let navigation, footer, blogNavigation, servicePaths, blogPaths;

  try {
    const global = await fetchGlobalData();
    const [servicePathsRes, blogPathsRes] = await Promise.all([
      fetch(getStrapiURL(`/${config.services.API_SERVICES_PATH_QUERY}?populate=title,slug`)),
      fetch(getStrapiURL(`/${config.blog.API_BLOG_PATH_QUERY}?populate=title,slug`))
    ]);
    
    const [servicePathsData, blogPathsData] = await Promise.all([
      servicePathsRes.json(),
      blogPathsRes.json()
    ]);

  
    navigation = global.navigation.data.attributes;
    footer = global.footer.data;
    blogNavigation = global.blogNavigation.data.attributes;
    servicePaths = servicePathsData;
    blogPaths = blogPathsData;

  } catch (error) {
    throw new Error('Error:', error);
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
        <MobileFooter navigation={navigation} />
        <div id="modal-root"></div>
      </body>
    </html>
  )
}