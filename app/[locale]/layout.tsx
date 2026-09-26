import type { Metadata } from "next";
import localFont from "next/font/local";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { routing } from "@/i18n/routing";
import { createLocalizedMetadata, type Locale } from "@/lib/metadata";
import "../globals.css";

const noto = localFont({
  src: "../fonts/noto-sans-gujarati-variable.ttf",
  weight: "100 900",
  variable: "--font-noto-family",
  display: "swap",
});

const display = localFont({
  src: [
    { path: "../fonts/cormorant-garamond-500.ttf", weight: "500" },
    { path: "../fonts/cormorant-garamond-600.ttf", weight: "600" },
  ],
  variable: "--font-display-family",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const metadata = createLocalizedMetadata({
    locale: locale as Locale,
    title: t("homeTitle"),
    description: t("homeDescription"),
  });
  return {
    ...metadata,
    title: {
      default: t("homeTitle"),
      template: `%s · ${t("siteName")}`,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${noto.variable} ${display.variable}`}>
      <body className="frame min-h-screen antialiased">
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">
            {messages.nav.skipToContent as string}
          </a>
          <Header />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
