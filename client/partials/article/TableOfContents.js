import Link from "next/link";
import styles from '@/styles/components/tableOfContents.module.css'

function TableOfContents ({ blocks }) {
  const headings = blocks
  .filter((block) => block.__component === "blocks.article-text-block")
  .flatMap((block) => {
    const blockHeadings = block.text?.match(/^#+\s*(.*)/gm);
    if (blockHeadings) {
      return blockHeadings.map((heading) => {
        const id = heading
          .toLowerCase() // convert to lowercase
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
        return {
          title: heading.replace(/^#+\s*/, ""),
          id: id,
        };
      });
    } else {
      return [];
    }
  });

  return (
    <nav className={styles.nav}>
      {headings && headings.length > 0 && (
          <ul className={styles.wrapper}>
          <h4 className={styles.title}>Table of Contents</h4>
            {headings.map((heading, index) => (
              <li className={styles.list} key={index}>
                <Link className={styles.link}  href={`#${heading.id}`}>
                  {heading.title}
                </Link>
              </li>
            ))}
          </ul>
        )
      }
    </nav>
  );
}

export default TableOfContents;