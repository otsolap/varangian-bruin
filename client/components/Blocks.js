import Accordion from '@/components/blocks/Accordion';
import Banner from '@/components/blocks/Banner';
import Blogs from '@/components/blocks/Blogs';
import Buttons from '@/components/blocks/Buttons';
import Cards from '@/components/blocks/Cards';
import FormEmbed from '@/components/blocks/FormEmbed';
import FooterColumn from '@/partials/navigation/FooterColumn';
import FooterArticles from '@/partials/navigation/FooterArticles';
import FooterSocialMedia from '@/partials/navigation/FooterSocialMedia';
import Hero from '@/components/blocks/Hero';
import ImageBlock from '@/components/blocks/ImageBlock';
import ImageGallery from '@/components/blocks/ImageGallery';
import MediaMix from '@/components/blocks/MediaMix';
import MenuItem from '@/partials/navigation/MenuItem';
import Notes from '@/components/blocks/Notes';
import Table from '@/components/blocks/Table';
import TextAndImage from '@/components/blocks/TextAndImage'
import Textarea from '@/components/blocks/Textarea'
import ServicesSection from '@/components/blocks/ServicesSection';
import VideoEmbed from '@/components/blocks/VideoEmbed';
import Quote from '@/components/blocks/Quote';

const getBlockComponent = ({ __component, ...rest }, index) => {
  let Block;

  switch (__component) {
    case 'blocks.accordion':
      Block = Accordion;
      break;
    case 'blocks.article-text-block':
      Block = Textarea;
      break;
    case 'blocks.banner':
      Block = Banner;
      break;
    case 'blocks.blogs':
      Block = Blogs;
      break;
    case 'blocks.buttons':
      Block = Buttons;
      break;
    case 'blocks.cards':
      Block = Cards;
      break;
    case 'blocks.embed':
      Block = Embed;
      break;
    case 'blocks.form-embed':
      Block = FormEmbed;
      break;
    case 'blocks.hero':
      Block = Hero;
      break;
    case 'blocks.image-block':
      Block = ImageBlock;
      break;
    case 'blocks.image-gallery':
      Block = ImageGallery;
      break;
    case 'blocks.media-mix':
      Block = MediaMix;
      break;
    case 'blocks.notes':
      Block = Notes;
      break;
    case 'blocks.services':
      Block = ServicesSection;
      break;
    case 'blocks.table':
      Block = Table;
      break;
    case 'blocks.text-area':
      Block = Textarea;
      break;
    case 'blocks.text-and-image':
      Block = TextAndImage;
      break;
    case 'blocks.video-embed':
      Block = VideoEmbed;
      break;
    case 'blocks.quote':
      Block = Quote;
      break;
    case 'util.footer-column':
      Block = FooterColumn;
      break;
    case 'util.footer-social-media':
      Block = FooterSocialMedia;
      break;
    case 'util.footer-articles':
      Block = FooterArticles;
      break;
    case 'util.menu-item':
      Block = MenuItem;
      break;
    default:
      console.error(`No component found for: ${__component}`)
      break;
  }

  return Block ? (
      <Block key={`index-${index}`} {...rest} />
   ) : null
}

const Blocks = ({ blocks }) => {
  if (!Array.isArray(blocks)) {
    return null;
  }

  return blocks.map(getBlockComponent);
}

export default Blocks