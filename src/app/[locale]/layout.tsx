import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Geist, Noto_Kufi_Arabic } from 'next/font/google';
import { locales } from '../../i18n/config';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Providers from '../../components/Providers';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: '--font-arabic',
  subsets: ['arabic'],
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  
  return {
    title: isArabic ? 'د. عبد القادر ڨحة - عالم إسلامي' : 'Dr. Abd El Kader Gaha - Savant islamique',
    description: isArabic 
      ? 'الموقع الرسمي للدكتور عبد القادر ڨحة، عالم إسلامي متخرج من جامعة الزيتونة'
      : 'Site officiel du Dr. Abd El Kader Gaha, savant islamique diplômé de l\'Université Zitouna',
    openGraph: {
      title: isArabic ? 'د. عبد القادر ڨحة' : 'Dr. Abd El Kader Gaha',
      description: isArabic 
        ? 'عالم إسلامي متخرج من جامعة الزيتونة'
        : 'Savant islamique diplômé de l\'Université Zitouna',
      locale: locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as 'fr' | 'ar')) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${notoKufiArabic.variable} antialiased min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}