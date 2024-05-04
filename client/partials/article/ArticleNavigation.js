import CustomLink from "@/partials/util/CustomLink";
import ShareButtons from "@/partials/article/ShareButtons";
import styles from '@/styles/components/articleNavigation.module.css'

function ArticleNavigation ({  title, social, button }) {
    return (
      <>
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{title}</h4>
        <ShareButtons title={title} settings={social} />
        {button &&  <CustomLink link={button}  className={`${styles.calendar} button button--${button.selectTheme}`} />}
      </div>
      </>

    );
  }
  
  export default ArticleNavigation ;