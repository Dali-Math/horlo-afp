import React from 'react';
import JsonLd from '@/components/JsonLd';
import { siteConfig } from '@/lib/seo';

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  estimatedCost?: {
    currency: string;
    value: string;
  };
  supply?: string[];
  tool?: string[];
  step: HowToStep[];
}

export function HowToSchema({
  name,
  description,
  image,
  totalTime,
  estimatedCost,
  supply = [],
  tool = [],
  step,
}: HowToSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    image,
    totalTime,
    estimatedCost,
    supply,
    tool,
    step: step.map((s) => ({
      '@type': 'HowToStep',
      name: s.name,
      text: s.text,
      image: s.image,
      url: s.url,
    })),
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
