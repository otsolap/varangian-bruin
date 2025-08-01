import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAccordion extends Struct.ComponentSchema {
  collectionName: 'components_blocks_accordions';
  info: {
    description: '';
    displayName: 'Accordion';
  };
  attributes: {
    accordions: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksArticleTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_partials_article_text_blocks';
  info: {
    description: '';
    displayName: 'articleText';
  };
  attributes: {
    text: Schema.Attribute.RichText;
  };
}

export interface BlocksBanner extends Struct.ComponentSchema {
  collectionName: 'components_blocks_banner';
  info: {
    description: '';
    displayName: 'Banner';
  };
  attributes: {
    button: Schema.Attribute.Component<'partials.button', false>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    selectTheme: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'tertiary']
    >;
    title: Schema.Attribute.String;
  };
}

export interface BlocksBlogs extends Struct.ComponentSchema {
  collectionName: 'components_blocks_blogs';
  info: {
    description: '';
    displayName: 'blogs';
  };
  attributes: {
    blogs: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    description: Schema.Attribute.Text;
    filter: Schema.Attribute.Enumeration<['latest', 'custom']> &
      Schema.Attribute.DefaultTo<'latest'>;
    selectTheme: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.DefaultTo<'primary'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksButtons extends Struct.ComponentSchema {
  collectionName: 'components_blocks_buttons';
  info: {
    description: '';
    displayName: 'Buttons';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'partials.button', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlocksCards extends Struct.ComponentSchema {
  collectionName: 'components_blocks_cards';
  info: {
    description: '';
    displayName: 'Cards';
  };
  attributes: {
    cards: Schema.Attribute.Component<'partials.card', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlocksFormEmbed extends Struct.ComponentSchema {
  collectionName: 'components_util_form_embeds';
  info: {
    description: '';
    displayName: 'FormEmbed';
  };
  attributes: {
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    description: '';
    displayName: 'Hero';
  };
  attributes: {
    alignContent: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    autoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    buttons: Schema.Attribute.Component<'partials.button', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    media: Schema.Attribute.Enumeration<['image', 'video']> &
      Schema.Attribute.DefaultTo<'image'>;
    mediaWidth: Schema.Attribute.Boolean;
    title: Schema.Attribute.String;
    video: Schema.Attribute.String;
  };
}

export interface BlocksImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_image_blocks';
  info: {
    description: '';
    displayName: 'ImageBlock';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    openLarge: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface BlocksImageGallery extends Struct.ComponentSchema {
  collectionName: 'components_blocks_image_galleries';
  info: {
    description: '';
    displayName: 'ImageGallery';
  };
  attributes: {
    images: Schema.Attribute.Media<'images', true>;
    title: Schema.Attribute.Text;
  };
}

export interface BlocksMediaMix extends Struct.ComponentSchema {
  collectionName: 'components_blocks_media_mixes';
  info: {
    description: '';
    displayName: 'mediaMix';
  };
  attributes: {
    mediaMixItems: Schema.Attribute.Component<'partials.media-mix-item', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
          min: 2;
        },
        number
      >;
  };
}

export interface BlocksQuote extends Struct.ComponentSchema {
  collectionName: 'components_blocks_quotes';
  info: {
    description: '';
    displayName: 'Quote';
  };
  attributes: {
    author: Schema.Attribute.String;
    source: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksServices extends Struct.ComponentSchema {
  collectionName: 'components_blocks_services';
  info: {
    displayName: 'Services';
  };
  attributes: {
    description: Schema.Attribute.Text;
    selectTheme: Schema.Attribute.Enumeration<['primary', 'secondary']>;
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksTable extends Struct.ComponentSchema {
  collectionName: 'components_blocks_tables';
  info: {
    description: '';
    displayName: 'Table';
    icon: 'dashboard';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    tableHeader: Schema.Attribute.Component<'partials.table-header', true>;
    tableRow: Schema.Attribute.Component<'partials.table-row', true>;
  };
}

export interface BlocksTextArea extends Struct.ComponentSchema {
  collectionName: 'components_blocks_text_areas';
  info: {
    description: '';
    displayName: 'textArea';
  };
  attributes: {
    selectTheme: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'tertiary']
    >;
    text: Schema.Attribute.RichText;
  };
}

export interface BlocksVideoEmbed extends Struct.ComponentSchema {
  collectionName: 'components_block_video-embeds';
  info: {
    description: '';
    displayName: 'VideoEmbed';
  };
  attributes: {
    url: Schema.Attribute.Text;
  };
}

export interface FormInputsCheckboxField extends Struct.ComponentSchema {
  collectionName: 'components_form_inputs_checkbox_fields';
  info: {
    description: '';
    displayName: 'checkbox-field';
  };
  attributes: {
    name: Schema.Attribute.String;
    options: Schema.Attribute.Component<'util.option', true>;
    width: Schema.Attribute.Enumeration<
      ['third', 'half', 'twoThirds', 'full']
    > &
      Schema.Attribute.DefaultTo<'full'>;
  };
}

export interface FormInputsDateField extends Struct.ComponentSchema {
  collectionName: 'components_form_inputs_date_fields';
  info: {
    description: '';
    displayName: 'date-field';
  };
  attributes: {
    name: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    width: Schema.Attribute.Enumeration<
      ['third', 'half', 'twoThirds', 'full']
    > &
      Schema.Attribute.DefaultTo<'full'>;
  };
}

export interface FormInputsEmailField extends Struct.ComponentSchema {
  collectionName: 'components_form_inputs_email_fields';
  info: {
    description: '';
    displayName: 'email-field';
  };
  attributes: {
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    width: Schema.Attribute.Enumeration<
      ['third', 'half', 'twoThirds', 'full']
    > &
      Schema.Attribute.DefaultTo<'full'>;
  };
}

export interface FormInputsFileField extends Struct.ComponentSchema {
  collectionName: 'components_form_inputs_file_fields';
  info: {
    description: '';
    displayName: 'file-field';
  };
  attributes: {
    description: Schema.Attribute.String;
    multiple: Schema.Attribute.Boolean;
    name: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    width: Schema.Attribute.Enumeration<
      ['third', 'half', 'twoThirds', 'full']
    > &
      Schema.Attribute.DefaultTo<'full'>;
  };
}

export interface FormInputsRadioField extends Struct.ComponentSchema {
  collectionName: 'components_form_inputs_radio_fields';
  info: {
    description: '';
    displayName: 'radio-field';
  };
  attributes: {
    name: Schema.Attribute.String;
    options: Schema.Attribute.Component<'util.option', true>;
    width: Schema.Attribute.Enumeration<
      ['third', 'half', 'twoThirds', 'full']
    > &
      Schema.Attribute.DefaultTo<'full'>;
  };
}

export interface FormInputsSelectField extends Struct.ComponentSchema {
  collectionName: 'components_form_inputs_select_fields';
  info: {
    description: '';
    displayName: 'select-field';
  };
  attributes: {
    name: Schema.Attribute.String;
    options: Schema.Attribute.Component<'util.option', true>;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    width: Schema.Attribute.Enumeration<
      ['third', 'half', 'twoThirds', 'full']
    > &
      Schema.Attribute.DefaultTo<'full'>;
  };
}

export interface FormInputsTextField extends Struct.ComponentSchema {
  collectionName: 'components_form_inputs_text_fields';
  info: {
    description: '';
    displayName: 'text-field';
  };
  attributes: {
    name: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    width: Schema.Attribute.Enumeration<
      ['third', 'half', 'twoThirds', 'full']
    > &
      Schema.Attribute.DefaultTo<'full'>;
  };
}

export interface FormInputsTextareaField extends Struct.ComponentSchema {
  collectionName: 'components_form_inputs_textarea_fields';
  info: {
    description: '';
    displayName: 'textarea-field';
  };
  attributes: {
    name: Schema.Attribute.Text;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean;
    width: Schema.Attribute.Enumeration<
      ['third', 'half', 'twoThirds', 'full']
    > &
      Schema.Attribute.DefaultTo<'full'>;
  };
}

export interface PartialsButton extends Struct.ComponentSchema {
  collectionName: 'components_partials_buttons';
  info: {
    description: '';
    displayName: 'button';
  };
  attributes: {
    href: Schema.Attribute.Text;
    isExternal: Schema.Attribute.Boolean;
    selectTheme: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'tertiary', 'link']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
    target: Schema.Attribute.Enumeration<['_blank']>;
    title: Schema.Attribute.String;
  };
}

export interface PartialsCard extends Struct.ComponentSchema {
  collectionName: 'components_partials_cards';
  info: {
    description: '';
    displayName: 'Card';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface PartialsLink extends Struct.ComponentSchema {
  collectionName: 'components_partials_links';
  info: {
    description: '';
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.Text;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    selectTheme: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'tertiary', 'link']
    >;
    target: Schema.Attribute.Enumeration<['_self', '_blank']> &
      Schema.Attribute.DefaultTo<'_self'>;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['Page', 'Link']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Page'>;
  };
}

export interface PartialsMediaMixItem extends Struct.ComponentSchema {
  collectionName: 'components_partials_media_mix_items';
  info: {
    description: '';
    displayName: 'mediaMixItem';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    markdown: Schema.Attribute.RichText;
    type: Schema.Attribute.Enumeration<['markdown', 'image', 'video']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'markdown'>;
    video: Schema.Attribute.String;
  };
}

export interface PartialsTableCell extends Struct.ComponentSchema {
  collectionName: 'components_partials_table_cells';
  info: {
    displayName: 'tableCell';
    icon: 'apps';
  };
  attributes: {
    cell: Schema.Attribute.Text;
  };
}

export interface PartialsTableHeader extends Struct.ComponentSchema {
  collectionName: 'components_partials_table_headers';
  info: {
    displayName: 'tableHeader';
    icon: 'apps';
  };
  attributes: {
    title: Schema.Attribute.Text;
  };
}

export interface PartialsTableRow extends Struct.ComponentSchema {
  collectionName: 'components_partials_table_rows';
  info: {
    displayName: 'tableRow';
    icon: 'apps';
  };
  attributes: {
    tableCell: Schema.Attribute.Component<'partials.table-cell', true>;
  };
}

export interface UtilBlogAnchors extends Struct.ComponentSchema {
  collectionName: 'components_util_blog_anchors';
  info: {
    description: '';
    displayName: 'blogAnchors';
  };
  attributes: {
    blogs: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    filter: Schema.Attribute.Enumeration<['latest', 'custom']>;
  };
}

export interface UtilBlogSocialShare extends Struct.ComponentSchema {
  collectionName: 'components_util_blog_social_shares';
  info: {
    displayName: 'BlogSocialShare';
  };
  attributes: {
    Email: Schema.Attribute.Boolean;
    Facebook: Schema.Attribute.Boolean;
    Link: Schema.Attribute.Boolean;
    LinkedIn: Schema.Attribute.Boolean;
    WhatsApp: Schema.Attribute.Boolean;
    X: Schema.Attribute.Boolean;
  };
}

export interface UtilFooterArticles extends Struct.ComponentSchema {
  collectionName: 'components_util_footer_articles';
  info: {
    description: '';
    displayName: 'footerArticles';
  };
  attributes: {
    blogAnchors: Schema.Attribute.Component<'util.blog-anchors', false>;
    description: Schema.Attribute.Text;
    open: Schema.Attribute.Boolean;
    title: Schema.Attribute.String;
  };
}

export interface UtilFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_partials_footer_columns';
  info: {
    description: '';
    displayName: 'footerColumn';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    links: Schema.Attribute.Component<'partials.link', true>;
    open: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface UtilFooterSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_util_footer_social_medias';
  info: {
    description: '';
    displayName: 'footerSocialMedia';
  };
  attributes: {
    open: Schema.Attribute.Boolean;
    socialMedia: Schema.Attribute.Component<'util.social-media-type', true>;
    title: Schema.Attribute.String;
  };
}

export interface UtilMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_util_menu_items';
  info: {
    description: '';
    displayName: 'menuItem';
  };
  attributes: {
    href: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<['bullseye', 'node', 'cube', 'pen']>;
    title: Schema.Attribute.String;
  };
}

export interface UtilOption extends Struct.ComponentSchema {
  collectionName: 'components_util_options';
  info: {
    description: '';
    displayName: 'option';
  };
  attributes: {
    value: Schema.Attribute.String;
  };
}

export interface UtilSeo extends Struct.ComponentSchema {
  collectionName: 'components_blocks_seos';
  info: {
    description: '';
    displayName: 'SEO';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 150;
      }>;
    imageBlock: Schema.Attribute.Component<'blocks.image-block', false>;
    keywords: Schema.Attribute.Text;
    preventIndexing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface UtilSocialMediaType extends Struct.ComponentSchema {
  collectionName: 'components_util_social_media_types';
  info: {
    description: '';
    displayName: 'contactDetails';
  };
  attributes: {
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      [
        'Facebook',
        'Instagram',
        'X',
        'LinkedIn',
        'Whatsapp',
        'TikTok',
        'Telegram',
        'Pinterest',
        'Email',
        'Link',
      ]
    >;
    url: Schema.Attribute.Text;
  };
}

export interface UtilSubFooter extends Struct.ComponentSchema {
  collectionName: 'components_util_sub_footers';
  info: {
    description: '';
    displayName: 'subFooter';
  };
  attributes: {
    link: Schema.Attribute.Component<'partials.link', false>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.accordion': BlocksAccordion;
      'blocks.article-text-block': BlocksArticleTextBlock;
      'blocks.banner': BlocksBanner;
      'blocks.blogs': BlocksBlogs;
      'blocks.buttons': BlocksButtons;
      'blocks.cards': BlocksCards;
      'blocks.form-embed': BlocksFormEmbed;
      'blocks.hero': BlocksHero;
      'blocks.image-block': BlocksImageBlock;
      'blocks.image-gallery': BlocksImageGallery;
      'blocks.media-mix': BlocksMediaMix;
      'blocks.quote': BlocksQuote;
      'blocks.services': BlocksServices;
      'blocks.table': BlocksTable;
      'blocks.text-area': BlocksTextArea;
      'blocks.video-embed': BlocksVideoEmbed;
      'form-inputs.checkbox-field': FormInputsCheckboxField;
      'form-inputs.date-field': FormInputsDateField;
      'form-inputs.email-field': FormInputsEmailField;
      'form-inputs.file-field': FormInputsFileField;
      'form-inputs.radio-field': FormInputsRadioField;
      'form-inputs.select-field': FormInputsSelectField;
      'form-inputs.text-field': FormInputsTextField;
      'form-inputs.textarea-field': FormInputsTextareaField;
      'partials.button': PartialsButton;
      'partials.card': PartialsCard;
      'partials.link': PartialsLink;
      'partials.media-mix-item': PartialsMediaMixItem;
      'partials.table-cell': PartialsTableCell;
      'partials.table-header': PartialsTableHeader;
      'partials.table-row': PartialsTableRow;
      'util.blog-anchors': UtilBlogAnchors;
      'util.blog-social-share': UtilBlogSocialShare;
      'util.footer-articles': UtilFooterArticles;
      'util.footer-column': UtilFooterColumn;
      'util.footer-social-media': UtilFooterSocialMedia;
      'util.menu-item': UtilMenuItem;
      'util.option': UtilOption;
      'util.seo': UtilSeo;
      'util.social-media-type': UtilSocialMediaType;
      'util.sub-footer': UtilSubFooter;
    }
  }
}
