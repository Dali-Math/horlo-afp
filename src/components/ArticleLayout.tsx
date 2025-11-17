// src/components/ArticleLayout.tsx

import { Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale'; // Ajout de l'import pour la locale française

interface ArticleLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  readTime: string;
  author: string;
  authorImage?: string;
  publishedAt: string;
  tags: string[];
  slug: string;
  location?: string; // Ajout d'une propriété location optionnelle
}

export default function ArticleLayout({ 
  children, 
  title, 
  description, 
  readTime, 
  author, 
  authorImage, 
  publishedAt, 
  tags, 
  slug,
  location // Ajout de la propriété location
}: ArticleLayoutProps) {
  // Correction : new Date() retourne un objet Date, pas un objet avec une propriété date
  const date = new Date(publishedAt);

  return (
    <article className="prose mx-auto max-w-none">
      {/* En-tête de l'article */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">
                {format(date, 'dd MMMM yyyy', { locale: fr })}
              </span>
            </div>
            {location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  {location}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {authorImage && (
                <Image
                  src={authorImage}
                  alt={author}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {author}
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {readTime} de lecture
            </span>
          </div>
        </div>
      </header>

      {/* Contenu principal de l'article */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {children}
      </div>

      {/* Pied de l'article */}
      <footer className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 pb-4">
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>Publié le {format(date, 'dd MMMM yyyy', { locale: fr })}</span>
          <span>•</span>
          <span>Par {author}</span>
        </div>
      </footer>
    </article>
  );
}
