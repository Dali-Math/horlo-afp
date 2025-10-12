import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import path from 'path';
import fs from 'fs/promises';
import React from 'react';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const messagesPath = path.join(process.cwd(), 'public/locales', `${locale}.json`);

  try {
    const fileContents = await fs.readFile(messagesPath, 'utf8');
    const messages = JSON.parse(fileContents);

    return (
      <html lang={locale}>
        <body>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    );
  } catch (error) {
    console.error('❌ Locale JSON not found or invalid:', error);
    notFound();
  }
}
