import { getTranslations } from "next-intl/server";
import { getGifts, getCategories } from "@/lib/supabase/queries";
import { GiftGrid } from "@/components/gifts/GiftGrid";
import { CategoryFilter } from "@/components/gifts/CategoryFilter";
import { SearchBar } from "@/components/gifts/SearchBar";
import { Suspense } from "react";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: `${t("products.title")} - ${t("common.appName")}`,
    description: t("products.allProducts"),
  };
}

export default async function GiftsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { locale } = await params;
  const { category, search } = await searchParams;
  const t = await getTranslations();

  let gifts = [];
  let categories = [];

  try {
    [gifts, categories] = await Promise.all([
      getGifts(category),
      getCategories(),
    ]);
  } catch (error) {
    console.error("Error loading gifts or categories:", error);
    // في حالة الخطأ، نستخدم مصفوفات فارغة
  }

  // Filter by search if provided
  const filteredGifts = search
    ? gifts.filter(
      (gift) =>
        gift.name_ar.toLowerCase().includes(search.toLowerCase()) ||
        gift.name_en.toLowerCase().includes(search.toLowerCase()) ||
        gift.description_ar.toLowerCase().includes(search.toLowerCase()) ||
        gift.description_en.toLowerCase().includes(search.toLowerCase())
    )
    : gifts;

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {t("products.title")}
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          {t("products.allProducts")}
        </p>
        <CategoryFilter categories={categories} selectedCategory={category} locale={locale} />
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar locale={locale} />
        </Suspense>
      </div>
      <GiftGrid gifts={filteredGifts} locale={locale} />
    </div>
  );
}
