import styles from "@/styles/components/services.module.css";
import ServicesItem from "@/partials/blocks/ServicesItem";
import Link from "next/link";
import config from '@/utils/config'

export default function ServicesSection({ title, description, selectTheme, services }) {
  return (
    <section className={selectTheme == 'primary' ? styles.bgPrimary : styles.bgSecondary}>
      {title || description ? (
        <header className={styles.header}>
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </header>
      ) : null}
      {services.length ? (
        <div className={styles.wrapper}>
          {services.map((item, i) => {
            return (
              <ServicesItem
                key={item.id || `services-item-${i}`}
                image={item.image}
                title={item.title}
                description={item.description}
                price={item.price}
                currency={item.currency}
                serviceType={item.service_type[0]}
                slug={item.slug}
              />
            );
          })}
        </div>
      ) : null}
      <footer className={styles.linkWrapper}>
        <Link className={styles.archiveLink} href={`/${config.services.path}`}>
            {config.blocks.servicesArchivePageCTA}
        </Link>
      </footer>
    </section>
  );
};
