import { getTranslations } from "next-intl/server";
import { WishlistPage } from "@/components/wishlist/WishlistPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  return {
    title: `${locale === "ar" ? "المفضلة" : "Wishlist"} - ${t("common.appName")}`,
    description: locale === "ar" ? "قائمة المفضلة" : "Wishlist",
  };
}

export default async function WishlistRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <WishlistPage locale={locale} />;
}
