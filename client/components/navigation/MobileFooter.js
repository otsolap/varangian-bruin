'use client'
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import Sidebar from "@/components/navigation/Sidebar";
import MobileNavLinks from "@/partials/navigation/MobileNavLinks";
import MenuButton from "@/partials/navigation/MenuButton";
import styles from "@/styles/components/mobileFooter.module.css";
import ShareButtons from "@/partials/article/ShareButtons";
import config from '@/utils/config'

const MobileFooter = ({ navigation, blogPaths, socialShare }) => {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const [show, setShowModal] = useState(false);
    const [footerOpacity, setFooterOpacity] = useState(1);
    const lastScrollY = useRef(0);
    const PRIMARY_PAGES = 3;

    function getTitle() {
        if (params.slug) {
            const matchingPath = blogPaths.data.find(path => path.slug === params.slug);
            return matchingPath ? matchingPath.title : null;
        }
        return null;
    }

    const handleScroll = useCallback(() => {
        if (show) {
            setFooterOpacity(1);
            return;
        }

        const currentScrollY = window.scrollY;
        setFooterOpacity(currentScrollY > lastScrollY.current ? 0.5 : 1);
        lastScrollY.current = currentScrollY;
    }, [show]);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape' && show) {
            setShowModal(false);
        }
    }, [show, setShowModal]);

    useEffect(() => {
        handleScroll(); 
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleScroll, handleKeyDown, show]);

    return (
        <>
            <Sidebar 
                navigation={navigation} 
                show={show} 
                closeModal={() => setShowModal(false)} 
            />
            <footer className={`mobile-only ${styles.mobile}`} style={{ opacity: footerOpacity }}>
                <div className={styles.menuWrapper}>
                    {pathname.includes(`/${config.blog.path}/`) && params.slug ? (
                        <ShareButtons title={getTitle()} settings={socialShare} />
                    ) : (
                        <>
                        <MobileNavLinks 
                            blocks={navigation.blocks?.slice(0, PRIMARY_PAGES)} 
                            currentPath={router.asPath} 
                            closeModal={() => setShowModal(false)} 
                        />
                        {navigation.blocks?.length > PRIMARY_PAGES && (
                            <MenuButton 
                                isMenuOpen={show} 
                                toggleMenu={() => setShowModal(value => !value)} 
                            />
                        )}
                        </>
                    )}
                </div>
            </footer>
        </>
    );
};

export default MobileFooter;