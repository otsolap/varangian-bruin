import CustomLink from "@/partials/util/CustomLink";
import ShareButtons from "@/partials/article/ShareButtons";
import styles from '@/styles/components/articleNavigation.module.css'

function ArticleNavigation ({  title, navigation }) {
    return (
      <>
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{title}</h4>
        <ShareButtons title={title} settings={navigation.social} />
        {navigation.button &&  <CustomLink link={navigation.button}  className={`${styles.calendar} button button--${navigation.button.selectTheme}`} />}
      </div>
      </>

    );
  }
  
  export default ArticleNavigation ;