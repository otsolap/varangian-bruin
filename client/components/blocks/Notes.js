import styles from "@/styles/components/notes.module.css";

const Notes = ({ title, listItem }) => {
  return (
      <section className={styles.notes}>
        <div className={styles.wrapper}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <ul className={styles.list}>
            {listItem ? listItem.map((item, i) => (
              <li className={styles.item} key={item.id || `note-${i}`}>
                  {item.content}
              </li>
            )) : null}
          </ul>
        </div>
      </section>
  );
};

export default Notes;
