import YoutubeEmbed from "@/partials/util/YoutubeEmbed";
import styles from '@/styles/components/videoEmbed.module.css'

// TODO: STYLLE THIS IN A WAY THAT SECTION IS 1440PX WIDTH, BUT YOUTUBE VID HAS DIV WRAPPER CENTERED
const VideoEmbed = ({ url }) => {
  return (url ? (
        <section className={styles.videoEmbed}>
            <div className={styles.videoContainer}>
              <YoutubeEmbed url={url} />
            </div>
        </section>
      ): null
  );
};

export default VideoEmbed;
