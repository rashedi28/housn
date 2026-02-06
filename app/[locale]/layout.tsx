import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Providers } from "@/components/Providers";
import { locales } from "@/lib/i18n/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // تعيين locale للطلب الحالي
  setRequestLocale(locale);

  // الحصول على الرسائل
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <title>{locale === "ar" ? "حُسن - متجر التجميل" : "Husn - Cosmetics Store"}</title>
        <meta name="description" content={locale === "ar" ? "متجر حُسن - مستحضرات تجميل وعناية عالية الجودة" : "Husn Store - High quality cosmetics and care products"} />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Providers>
          <ThemeProvider>
            <NextIntlClientProvider messages={messages} locale={locale}>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </NextIntlClientProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}