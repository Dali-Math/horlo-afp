import React from 'react';
import { JsonLd } from './JsonLd';
import { siteConfig } from '@/lib/seo';

interface VideoSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
  embedUrl?: string;
  duration?: string;
  width?: number;
  height?: number;
}

export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
  duration,
  width = 1920,
  height = 1080,
}: VideoSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    contentUrl,
    embedUrl,
    duration,
    width,
    height,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.openGraph.images[0].url,
      },
    },
  };

  return <JsonLd data={schema} />;
}
