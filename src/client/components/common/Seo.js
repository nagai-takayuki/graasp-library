import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { APP_KEYWORDS, DEFAULT_LANG } from '../../config/constants';
import ITEM_DEFAULT_IMAGE from '../../resources/icon.png';

const Seo = ({
  lang,
  title,
  description,
  author,
  image = ITEM_DEFAULT_IMAGE,
}) => {
  const keywords = APP_KEYWORDS;

  // todo: default to env variable
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <Helmet>
      <meta property="fb:app_id" content="" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="" />
      <meta name="twitter:site" content="" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:domain" content="" />
      <meta name="twitter:image:src" content={image} />

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <title>{title}</title>
      <html lang={lang} />
    </Helmet>
  );
};

Seo.defaultProps = {
  lang: DEFAULT_LANG,
};

Seo.propTypes = {
  lang: PropTypes.string,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Seo;
