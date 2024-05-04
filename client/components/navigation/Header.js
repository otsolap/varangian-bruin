import styles from "@/styles/components/header.module.css";
import Brand from "@/partials/navigation/Brand";
import NavLinks from "@/partials/navigation/NavLinks";
import MobileHeaderCallToAction from "@/partials/navigation/MobileHeaderCallToAction";

const Header = ({ navigation, blogNavigation }) => {
  return (
    <>
      <header className={styles.header}>
        <Brand title={navigation.title} slogan={navigation.slogan} />
        <MobileHeaderCallToAction primary={navigation} blog={blogNavigation} />
      </header>
      <NavLinks mainNavigation={navigation} blogNavigation={blogNavigation} />
    </>
  );
};

export default Header;
