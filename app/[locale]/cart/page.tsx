import { getTranslations } from "next-intl/server";
import { CartPage } from "@/components/cart/CartPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  return {
    title: `${locale === "ar" ? "السلة" : "Cart"} - ${t("common.appName")}`,
    description: locale === "ar" ? "سلة التسوق" : "Shopping Cart",
  };
}

export default async function CartRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <CartPage locale={locale} />;
}
