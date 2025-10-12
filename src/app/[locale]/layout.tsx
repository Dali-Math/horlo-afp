import "../globals.css";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

export const metadata = {
  title: "HorloLearn",
  description: "Swiss watchmaking learning platform",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = (await import(`../../messages/${params.locale}.json`)).default;

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
