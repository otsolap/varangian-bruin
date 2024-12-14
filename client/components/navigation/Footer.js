import Blocks from "@/components/Blocks";
import styles from '@/styles/components/footer.module.css'
import CustomLink from '@/partials/util/CustomLink'

const Footer = ({ footer }) => {
  const { blocks, subFooter} = footer
  return (
    <>
      <footer className={styles.footer}>
        {blocks ? (
          <div className={`${styles.columnContainer} ${styles['footerColumns-' + blocks.length]}`}>
            <Blocks blocks={blocks} />
          </div>
        ) : null}
        {subFooter ? (
          <div className={styles.subFooter}>
            <div className={styles.subFooterContent}>
              <span className={styles.brand}>{subFooter.title} &#169; {new Date().getFullYear()} </span> 
              <span className="desktop-only"> &#124;</span> 
                {subFooter.link ?  (
                  <CustomLink className={styles.legal} link={subFooter.link} />
                ): null}
              </div>
          </div>
        ): null}
      </footer>
    </>
  );
};

export default Footer;
