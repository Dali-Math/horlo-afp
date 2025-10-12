import "../globals.css";
import { ReactNode } from "react";
import { NextIntlClientProvider, getMessages } from "next-intl";

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
  const messages = await getMessages({ locale: params.locale });

  return (
    <html lang={params.locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={params.locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
