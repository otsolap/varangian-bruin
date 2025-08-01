import styles from "@/styles/components/banner.module.css";
import MarkdownBlock from "@/partials/util/MarkdownBlock";
import NextImage from "@/partials/util/NextImage";
import CustomLink from "@/partials/util/CustomLink";

const Banner = ({ title, description, image, button, selectTheme }) => {
  return (
    <section className={styles.banner}>
      <div className={`${styles.wrapper}  bg-${selectTheme} ${selectTheme === 'primary' ? 'color-black' : ''}` }>
          {image && (
            <figure className={styles.imageContainer}>
              <NextImage
                className={styles.image}
                image={image}
                width={150}
                height={150}
                sizes="150px"
                />
            </figure>
          )}
          {title || description || button ? (
            <div className={styles.content}>
            {title && <h2>{title}</h2>}
            {description && <MarkdownBlock markdown={description} />}
            {button && (
              <footer className={styles.buttonWrapper}>
                  <CustomLink link={button} className={`button button--${button.selectTheme}`}  />
              </footer>
            )}
          </div>
          ): null}
        </div>
      </section>
  );
};

export default Banner;
