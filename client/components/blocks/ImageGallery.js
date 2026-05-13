import NextImage from 'partials/util/NextImage'
import styles from '@/styles/components/imageGallery.module.css'

const ImageGallery = ({ images, title }) => {
  return (
    <section className={styles.imageGallery}>
        <div className={styles.wrapper}>
            {images && images.map((image, i) => (
            <figure 
              className={styles.imageContainer} 
              id={image.id} 
              key={image.id || `imagegallery-image-${i}`}
            >
                <NextImage className={styles.image} image={image} />
            </figure>
            ))}
        </div>
      <figcaption className={styles.title}>{title}</figcaption>
    </section>
  );
};

export default ImageGallery;
