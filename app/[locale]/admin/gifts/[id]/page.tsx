import { getGiftById, getCategories } from "@/lib/supabase/queries";
import { notFound } from "next/navigation";
import { GiftForm } from "@/components/admin/GiftForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("admin.gifts.edit"),
  };
}

export default async function EditGiftPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const gift = id === "new" ? null : await getGiftById(id);
  const categories = await getCategories();

  if (id !== "new" && !gift) {
    notFound();
  }

  return <GiftForm gift={gift || undefined} categories={categories} locale={locale} />;
}
