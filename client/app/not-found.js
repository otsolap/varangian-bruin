import styles from '@/styles/pages/error.module.css'
import MarkdownBlock from "@/partials/util/MarkdownBlock";
import CustomLink from "partials/util/CustomLink";
import { getStrapiURL } from "@/utils/api"
import config from '@/utils/config'

export default async function NotFound () {
    const { title, description, buttons } = await getNotFoundData()

    return (
        <section>
            <header>
               {title && <h1>{title}</h1>}
            </header>
            {description && <MarkdownBlock markdown={description} />}
            {buttons && (
              <div className={styles.buttonWrapper}>
                {buttons.map((button, i) => (
                  <CustomLink link={button} key={i} className={`button button--${button.selectTheme}`} />
                ))}
              </div>
            )}
        </section>
    )
  }

  async function getNotFoundData() {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    };


    try {
      const res = await fetch(getStrapiURL(`/${config.global.API_NOT_FOUND_QUERY}`), { headers });
      const resData= await res.json();
  
      if (!resData) {
        throw new Error('Failed to fetch API data')
      }

      return {
        title: resData.data?.title ?? {},
        description: resData.data?.description ?? {},
        buttons: resData.data?.buttons ?? {},
      }
    } catch (error) {
      console.error('Error fetching not-found data:', error);
  
      return {
        title: "404 - Page Not Found",
        description:"Unfortunately, the page you were looking for cannot be found it might have been moved or deleted. If you typed the address directly into the browsers address bar, you might want to double-check to make sure that no typing errors have slipped in.\n\nLinks that could help you track down the content you're looking for",
        buttons: [{"href":"/","title":"Home","isExternal":false,"target":null,"selectTheme":"primary"}],
      }
    }
  }
