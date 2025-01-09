'use client'
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import Sidebar from "@/components/navigation/Sidebar";
import MobileNavLinks from "@/partials/navigation/MobileNavLinks";
import MenuButton from "@/partials/navigation/MenuButton";
import styles from "@/styles/components/mobileFooter.module.css";
import ShareButtons from "@/partials/article/ShareButtons";
import config from '@/utils/config'
import useToggle from "@/hooks/useToggle"

const MobileFooter = ({ navigation, blogPaths, socialShare  }) => {
    const [show, setShowModal] = useToggle(false);

    const toggleModal = () => {
        setShowModal(!show);
    }

    const [footerOpacity, setFooterOpacity] = useState(1);
    const router = useRouter();
    const lastScrollY = useRef(0);

    const pathname = usePathname();
    const params = useParams()
  
    let title = null;
  
    if (params.slug) {
      const matchingPath = pathname.includes(`/${config.blog.BLOG_PATH}/`) 
        ? blogPaths.data.find(path => path.slug === params.slug)
        : null;
  
      title = matchingPath ? matchingPath.title : null;
    }

    const handleScroll = useCallback(() => {
        if (show) {
            setFooterOpacity(1);
            return;
        }

        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current) {
            setFooterOpacity(0.5);
        } else {
            setFooterOpacity(1);
        }
        lastScrollY.current = currentScrollY;
    }, [show]);

    useEffect(() => {
        handleScroll(); // Initial scroll position
        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll, show]); 

    const PRIMARY_PAGES = 3;

    return (
        <>
        <Sidebar
        navigation={navigation}
        show={show}
        closeModal={toggleModal}
        />
        <footer className={`mobile-only ${styles.mobile}`} style={{ opacity: footerOpacity }}>
            <div className={styles.menuWrapper}>
            {pathname.includes(`/${config.blog.BLOG_PATH}/`) && params.slug ? (
                <ShareButtons title={title} settings={socialShare} />
            ) : (
                <>
                    <MobileNavLinks blocks={navigation.blocks.slice(0, PRIMARY_PAGES)} currentPath={router.asPath} closeModal={() => setShowModal(false)} />
                    {navigation.blocks.length > PRIMARY_PAGES ? (
                        <MenuButton isMenuOpen={show} toggleMenu={toggleModal} />
                    ) : null}
                 </>
                )}
            </div>
        </footer>
        </>
    );
};

export default MobileFooter;