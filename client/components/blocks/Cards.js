import styles from "@/styles/components/cards.module.css";
import NextImage from "@/partials/util/NextImage";
import MarkdownBlock from "@/partials/util/MarkdownBlock";

const Cards = ({ title, description, cards }) => {
  return (
      <section className={styles.cards}>
        {title && (
          <header className={styles.header}>
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
          </header>
        )}
        {cards && (
          <div className={styles.wrapper}>
            {cards.map((item, i) => (
              <article key={i} className={`${styles.card}`}>
                {item.image ? (
                  <figure className={styles.imageContainer}>
                    <NextImage
                      width={150}
                      height={150}
                      sizes="150px"
                      image={item.image}
                      className={styles.image}
                      />
                  </figure>
                ) : null}
                {(item.title || item.description) ? (
                  <div className={styles.body}>
                    {item.title && <h3 className={styles.title}>{item.title}</h3>}
                    {item.description && <MarkdownBlock markdown={item.description} />}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
  );
};

export default Cards;
