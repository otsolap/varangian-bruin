import Blocks from "@/components/Blocks";
import styles from '@/styles/components/footer.module.css'
import CustomLink from '@/partials/util/CustomLink'

const Footer = ({ footer }) => {
  return (
    <>
      <footer className={styles.footer}>
        {footer.blocks ? (
          <div className={`${styles.columnContainer} ${styles['footerColumns-' + footer.blocks.length]}`}>
            <Blocks blocks={footer.blocks} />
          </div>
        ) : null}
        {footer.subFooter ? (
          <div className={styles.subFooter}>
            <div className={styles.subFooterContent}>
              <span className={styles.brand}>{footer.subFooter.title} &#169; {new Date().getFullYear()} </span> 
              <span className="desktop-only"> &#124;</span> 
                {footer.subFooter.link ?  (
                  <CustomLink className={styles.legal} link={footer.subFooter.link} />
                ): null}
              </div>
          </div>
        ): null}
      </footer>
    </>
  );
};

export default Footer;
