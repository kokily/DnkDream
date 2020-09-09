import React from 'react';
import { Helmet } from 'react-helmet';

export interface MetaProps {
  titleData?: string;
  descriptionData?: string;
  imageData?: string;
  canonicalData?: string;
  typeData?: string;
}

const Meta = ({
  titleData,
  descriptionData,
  imageData,
  canonicalData,
  typeData,
}: MetaProps) => {
  const title = titleData;
  const description = descriptionData;
  const image = imageData !== undefined && `${imageData}`;
  const canonical = `https://dnkdream.com/${canonicalData}`;
  const type = typeData === undefined ? 'website' : typeData;

  return (
    <Helmet titleTemplate="%s">
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {image ? <link rel="image_src" href={image} /> : null}
      {image ? <meta itemProp="image" content={image} /> : null}

      <meta property="og:site_name" content="D&K Dreams Blog" />
      <meta property="og:title" content={title} />
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}

      <meta property="og:type" content={type} />

      <meta property="fb:pages" content="D&K Dreams Blog" />
    </Helmet>
  );
};

export default Meta;
