import AccordionItem from "@/partials/blocks/AccordionItem";
import styles from "@/styles/components/accordion.module.css";

const Accordion = ({ title, description, accordions }) => {
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
                      <AccordionItem  key={item.id || `accordion-${i}`} {...item} />
                  ))}
              </div>
            )}
        </div>
      </section>
  ) : null );
}

export default Accordion