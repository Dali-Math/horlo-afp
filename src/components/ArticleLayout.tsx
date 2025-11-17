// src/components/ArticleLayout.tsx

import { Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { eventsData } from '@/lib/eventsData'; // <-- MODIFIÉ : Importer les données

interface ArticleLayoutProps {
  children: React.ReactNode;
  frontMatter: React.ReactNode;
  title: string;
  description: string;
  readTime: string;
  author: string;
  authorImage?: string;
  author: string;
  publishedAt: string;
  tags: string[];
  slug: string;
}

export default function ArticleLayout({ children, frontMatter, title, description, readTime, author, authorImage, publishedAt, tags, slug }: ArticleLayoutProps) {
  const { date } = new Date(publishedAt);

  return (
    <article className="prose mx-auto">
      {/* En-tête de l'article */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">
                {format(date, 'dd MMMM yyyy', { locale: 'fr-FR' })}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">
                {format(date, 'dd MMMM yyyy', { locale: 'fr-FR' })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {authorImage && (
              <Image
                src={authorImage}
                alt={author}
                className="w-10 h-10 rounded-full mr-3"
              />
            )}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {author}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {readTime} de lecture
            </span>
          </div>
        </header>

      {/* Contenu principal de l'article */}
      <div className="prose prose prose-lg dark:prose-invert">
        {children}
      </div>

      {/* Pied de l'article */}
      <footer className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 pb-4">
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>Publié le {format(date, 'dd MMMM yyyy', { locale: 'fr-FR' })</span>
          <span>•</span>
          <span>Par {author}</span>
        </div>
      </footer>
    </article>
  );
}
