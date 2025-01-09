'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from '@/styles/components/sidebar.module.css'

const Sidebar = ({ navigation, show, closeModal }) => {
    const router = useRouter();
    const AFTER_PRIMARY_PAGES = 3;
    let links = null;

    const handleClick = async (e, href) => {
        e.preventDefault();
        closeModal();
        await router.push(href);
    };

    if (navigation && Array.isArray(navigation.blocks)) {
      links = navigation.blocks
        .slice(AFTER_PRIMARY_PAGES)
        .map((block, i) => {
          const { href, title } = block;
    
          return (
            <li
              className={`${styles.linkWrapper} ${
                router.asPath === href ? styles.active : ''
              }`}
              key={i}
            >
              <Link href={href} onClick={(e) => handleClick(e, href)} className={styles.link}>
                  <span className={styles.text}>{title}</span>
              </Link>
            </li>
          );
        });
    }

    return (
            <dialog 
              tabIndex="-1" 
              aria-hidden="true" 
              aria-labelledby="Modal" 
              id={styles.modal}
              className={` 
                mobile-only
                ${show ? styles.show : null}
                `
              }
              >
                <div className={styles.content}>
                    {links}
                </div>
            </dialog>
      )
}

export default Sidebar;
