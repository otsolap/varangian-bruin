'use client'
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import Offcanvas from "@/components/navigation/Offcanvas";
import MobileNavLinks from "@/partials/navigation/MobileNavLinks";
import MenuButton from "@/partials/navigation/MenuButton";
import styles from "@/styles/components/mobileFooter.module.css";
import ShareButtons from "@/partials/article/ShareButtons";
import config from '@/utils/config'

const MobileFooter = ({ navigation, blogPaths, socialShare  }) => {
    const [showModal, setShowModal] = useState(false);
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
        if (showModal) {
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
    }, [showModal]);

    useEffect(() => {
        handleScroll(); // Initial scroll position
        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll, showModal]); 

    const PRIMARY_PAGES = 3;

    return (
        <footer className={`mobile-only ${styles.mobile}`} style={{ opacity: footerOpacity }}>
            <div className={styles.menuWrapper}>
            {pathname.includes(`/${config.blog.BLOG_PATH}/`) && params.slug ? (
                     <ShareButtons title={title} settings={socialShare} />
            ) : (
                <>
                <MobileNavLinks blocks={navigation.blocks.slice(0, PRIMARY_PAGES)} currentPath={router.asPath} closeModal={() => setShowModal(false)} />
                {navigation.blocks.length > PRIMARY_PAGES ? (
                    <>
                    <MenuButton isMenuOpen={showModal} toggleMenu={() => setShowModal(value => !value)} />
                    <Offcanvas
                    navigation={navigation}
                    show={showModal}
                    closeModal={() => setShowModal(false)}
                    />
                    </>
                    ) : null}
                 </>
                )}
            </div>
        </footer>
    );
};

export default MobileFooter;