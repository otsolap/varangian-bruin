const Table = ({ tableHeader, tableRow, caption }) => {
  if (!tableHeader?.length || !tableRow?.length ) return null;

  return (
    <section>
      <table role="table" aria-label={caption || "Table"}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {tableHeader.map((header, index) => (
              <th key={index} scope="col">
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRow.map((row) => (
            <tr key={row.id}>
                {row.tableCell.map((cell) => (
                  <td key={cell.id}>{cell.cell || ''}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;