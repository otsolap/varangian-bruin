import AccordionItem from "@/partials/blocks/AccordionItem";
import NextImage from "@/partials/util/NextImage";
import styles from "@/styles/components/accordion.module.css";

const Accordion = ({ title, description, image, accordions }) => {
  return ( 
    accordions ? (
      <section className={styles.accordion}>
          {title && (
            <header className={styles.header}>
              {title && <h2>{title}</h2>}
              {description && <p>{description}</p>}
            </header>
          )}
        <div className={styles.wrapper}>
            {accordions && (
                <div className={styles.content}>
                  {accordions.map((item, i) => (
                      <AccordionItem key={i} {...item} />
                  ))}
              </div>
            )}
            {image && (
              <figure className={styles.imageContainer}>
                <NextImage 
                className={styles.image} 
                image={image} 
                height={500}
                width={668}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </figure>
            )}
        </div>
      </section>
  ) : null );
}

export default Accordion