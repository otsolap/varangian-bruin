import Image from 'next/image';
import { getStrapiMedia } from '@/utils/index';

const NextImage = ({ 
  image, 
  width=668, 
  height=500, 
  priority = false, 
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"', 
  alt="", 
  quality=75, 
  className 
}) => {
  if (!image) {
    return null;
  }
  const imageData = Array.isArray(image) ? image[0] : image;
  const { url, alternativeText } = imageData || {};

  if (!url) {
    return null;
  }

  return (
    <Image 
      src={getStrapiMedia(url)}
      alt={alternativeText || alt}
      width={width}
      height={height}
      quality={quality}
      sizes={sizes}
      className={className || ''}
      placeholder="blur"
      blurDataURL={getStrapiMedia(url)}
      priority={priority}
    />
  );
};

export default NextImage;
