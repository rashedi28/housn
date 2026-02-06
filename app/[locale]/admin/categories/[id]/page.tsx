import { getCategoryById } from "@/lib/supabase/queries";
import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("admin.categories.edit"),
  };
}

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const category = id === "new" ? null : await getCategoryById(id);

  if (id !== "new" && !category) {
    notFound();
  }

  return <CategoryForm category={category || undefined} locale={locale} />;
}
