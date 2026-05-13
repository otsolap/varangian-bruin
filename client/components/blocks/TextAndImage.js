import styles from "@/styles/components/textAndImage.module.css";
import NextImage from "@/partials/util/NextImage";
import MarkdownBlock from "@/partials/util/MarkdownBlock";

const TextAndImage = ({ content, alignImage, image }) => {
  return (
      <section className={styles.textAndImage}>
        <div className={`${styles.wrapper} ${alignImage == 'left' ? '' : styles.reverseWrapper} `}>
            <div className={styles.column}>
                {image ? (
                    <figure className={styles.imageContainer}>
                        <NextImage
                            image={image}
                            className={styles.image}
                            height={500}
                            width={668}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </figure>
                ) : null}
            </div>
            {content && (
            <div className={styles.column}>
                <MarkdownBlock markdown={content} />
            </div>
            )}
        </div>
      </section>
  );
};

export default TextAndImage;
