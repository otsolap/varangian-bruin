'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '@/styles/components/taxonomyLinks.module.css';
import config from '@/utils/config';

function TaxonomyLinks({ categories, service_types }) {
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1440);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isDesktop]);
  
  const data = categories || service_types;
  if(!data.length) return null;
  const isCategory = categories != null;

  const getPath = (item) => {
    const baseSlug = item.slug;
    return isCategory
      ? `/${config.categories.path}/${baseSlug}`
      : `/${config.serviceTypes.path}/${baseSlug}`;
  };

  const renderItem = (item, id) => (
    <li className={styles.item} key={id}>
      <Link className={`button ${styles.button}`} href={getPath(item)}>
        {item.title}
      </Link>
    </li>
  );

  const renderSelectOption = (item, id) => (
    <option value={getPath(item)} key={id}>
      {item.title}
    </option>
  );

  const renderLinks = () => {
    if (isDesktop) {
      return (
        <ul className={styles.wrapper}>
          {data.map((item, id) => renderItem(item, id))}
        </ul>
      );
    } else {
      return (
        <select
          className={`button ${styles.select}`}
          onChange={(e) => {
            window.location.href = e.target.value;
          }}
        >
          {data.map((item, id) => renderSelectOption(item, id))}
        </select>
      );
    }
  };

  return renderLinks();
}

export default TaxonomyLinks;