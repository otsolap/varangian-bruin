import styles from "@/styles/components/mediaMix.module.css";
import NextImage from "@/partials/util/NextImage";
import MarkdownBlock from "@/partials/util/MarkdownBlock";
import YoutubeEmbed from "@/partials/util/YoutubeEmbed";

const MediaMix = ({ mediaMixItems }) => {
  return (
      <section className={styles.mediaMix}>
        <div className={styles.wrapper}>
          {mediaMixItems ? mediaMixItems.map((item, i) => (
            <div key={i} className={styles.mediaMixColumn}>
                {item.type == "video" && item.video ? (
                  <div className={styles.videoContainer}>
                    <YoutubeEmbed url={item.video} />
                  </div>
                ) : null}
                {item.type == "image" && item.image.data ? (
                  <figure className={styles.imageContainer}>
                    <NextImage
                      image={item.image}
                      className={styles.image}
                      height={500}
                      width={668}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </figure>
                ) : null}
                {item.type == "markdown" && item.markdown && (
                  <MarkdownBlock markdown={item.markdown} />
                )}
            </div>
          )) : null}
        </div>
      </section>
  );
};

export default MediaMix;
