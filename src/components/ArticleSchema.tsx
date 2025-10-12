import React from 'react';
import JsonLd from '@/components/JsonLd';
import { siteConfig } from '@/lib/seo';

interface ArticleSchemaProps {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  };
  image?: string;
  keywords?: string[];
}

export function ArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author = { name: siteConfig.author.name },
  image,
  keywords = [],
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image || siteConfig.openGraph.images[0].url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url || siteConfig.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.openGraph.images[0].url,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': siteConfig.siteUrl,
    },
    keywords: keywords.join(', '),
  };

  return <JsonLd data={schema} />;
}
