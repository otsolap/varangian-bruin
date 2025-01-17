import styles from "@/styles/components/header.module.css";
import Link from "next/link";

const Brand = ({ title, slogan }) => {
    return (
        <div className={styles.brand}>
          {title && <Link className={styles.title} href="/">{title}</Link>}
          {slogan && <p className={styles.slogan}>{slogan}</p>}
        </div>
    )
}

export default Brand;