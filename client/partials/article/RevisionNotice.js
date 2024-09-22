import styles from '@/styles/pages/blog.module.css'

const RevisionNotice = ({ date }) => {

  const formatDate = (date) => {
    if (!date) return null;
    const options = { year: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <aside className={styles.revision}>
        <p>This article was last updated in {formatDate(date)}.</p>
    </aside>
    )
}


export default RevisionNotice;