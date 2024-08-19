import { useContext } from 'react';
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import MobileFooter from "@/components/navigation/MobileFooter";
import { GlobalContext } from '@/pages/_app.js'; 

export default function Layout({ children }) {
  const { globalData } = useContext(GlobalContext);
  const { navigation, footer } = globalData;

  return (
    <>
      <Header navigation={navigation} />
        <main className={`container`}>
          {children}
        </main>
      <Footer footer={footer} />
      <MobileFooter navigation={navigation} />
    </>
  );
}1