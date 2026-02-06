import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n/config";

export default getRequestConfig(async ({ requestLocale }) => {
  // Get locale from request
  let locale = await requestLocale;

  // If no locale in request, use default
  if (!locale) {
    locale = "ar";
  }

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});