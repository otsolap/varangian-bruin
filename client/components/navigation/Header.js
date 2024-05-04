import styles from "@/styles/components/header.module.css";
import Blocks from "@/components/Blocks";
import CustomLink from "@/partials/util/CustomLink";
import Brand from "@/components/navigation/Brand";


const Header = ({ navigation }) => {
  return (
    <>
      <header className={styles.header}>
        <Brand title={navigation.title} slogan={navigation.slogan} />
        {navigation.button ? (
          <CustomLink 
            link={navigation.button} 
            className={`${styles.calendar} mobile-only button button--${navigation.button.selectTheme}`} 
          />
        ) : null }
      </header>
      <nav className={styles.navigation}>
        <div className={styles.wrapper}>
          {navigation.blocks && (
            <>
              <div className={styles.menu}>
                <Blocks blocks={navigation.blocks} />
              </div>
              {navigation.button ? (
                  <CustomLink 
                    link={navigation.button} 
                    className={`${styles.calendar} button button--${navigation.button.selectTheme}`} 
                  />
                ) : null }
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
