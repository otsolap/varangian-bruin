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
            {buttons && buttons.length ? (
              <div className={styles.buttonWrapper}>
                {buttons.map((button, i) => (
                  <CustomLink link={button} key={i} className={`button button--${button.selectTheme}`} />
                ))}
              </div>
            ): null}
        </section>
    )
  }

  async function getNotFoundData() {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
      };

      const res = await fetch(getStrapiURL(`/${config.global.notFound}`), { headers });
      const resData= await res.json();
  
      if (!resData) {
        throw new Error('Failed to fetch API data')
      }

      return {
        title: resData.data?.title ?? `${config.notFound.title}`,
        description: resData.data?.description ?? `${config.notFound.description}`,
        buttons: resData.data?.buttons ?? `${config.notFound.buttons}`,
      }
    } catch (error) {
      console.error('Error fetching not-found data:', error);
    }
  }
