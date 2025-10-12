import React from 'react';
import { JsonLd } from './JsonLd';
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
    image: image || siteConfig.openGraph.images[0].url,
    totalTime,
    estimatedCost,
    supply: supply.map((item) => ({
      '@type': 'HowToSupply',
      name: item,
    })),
    tool: tool.map((item) => ({
      '@type': 'HowToTool',
      name: item,
    })),
    step: step.map((s, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: s.name,
      text: s.text,
      image: s.image,
      url: s.url,
    })),
  };

  return <JsonLd data={schema} />;
}
