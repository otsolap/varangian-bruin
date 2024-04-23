import styles from "@/styles/components/header.module.css";
import Blocks from "@/components/Blocks";
import CustomLink from "@/partials/util/CustomLink";


const Header = ({ navigation }) => {

  const global = navigation && navigation.data ? navigation.data.attributes : {};
  const brand = { href: '/', title: global ? global.title : {} };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.brand}>
          {global.title ? (
            <CustomLink className={styles.title} link={brand} />
          ) : null}
          {global.slogan ? (
            <p className={styles.slogan}>{global.slogan}</p>
          ) : null}
        </div>
      </header>
      <nav className={styles.navigation}>
        <div className={styles.wrapper}>
          {global.blocks && (
            <>
              <div className={styles.menu}>
                <Blocks blocks={global.blocks} />
              </div>
              {global.button ? (
                  <CustomLink 
                    link={global.button} 
                    className={`${styles.calendar} button button--${global.button.selectTheme}`} 
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
