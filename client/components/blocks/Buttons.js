import styles from "@/styles/components/buttons.module.css";
import CustomLink from "@/partials/util/CustomLink";

const Buttons = ({ title, description, buttons }) => {
  return (
      <section className={`${styles.cards}`}>
        {title && (
          <header className={styles.header}>
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
          </header>
        )}
       {buttons && (
            <div className={styles.wrapper}>
                {buttons.map((button, i) => (
                    <div className={styles.column}  key={button.id || `button-${i}`}>
                        <CustomLink link={button} className={`button button--${button.selectTheme}`} />
                    </div>
                ))}
            </div>
         )}
      </section>
  );
};

export default Buttons;
