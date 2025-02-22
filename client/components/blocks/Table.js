import styles from '@/styles/components/table.module.css'

const Table = ({ tableHeader, tableRow, caption }) => {
  if (!tableHeader?.length || !tableRow?.length ) return null;

  return (
    <section>
      <table className={styles.table} role="table" aria-label={caption || "Table"}>
        <thead>
          <tr>
            {tableHeader.map((header, index) => (
              <th key={index} scope="col" className={styles.tableHeader}>
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRow.map((row) => (
            <tr className={styles.tableRow} key={row.id}>
                {row.tableCell.map((cell) => (
                  <td key={cell.id} className={styles.tableCell}>
                    {cell.cell || ''}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
        {caption && <caption className={styles.caption}>{caption}</caption>}
      </table>
    </section>
  );
};

export default Table;