import { NextIntlClientProvider } from 'next-intl';
import path from 'path';
import { promises as fs } from 'fs';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const filePath = path.join(process.cwd(), 'src/messages', `${params.locale}.json`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const messages = JSON.parse(fileContents);

  return (
    <html lang={params.locale}>
      <body>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
