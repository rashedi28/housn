import { getTranslations } from "next-intl/server";
import { getCategories } from "@/lib/supabase/queries";
import { CategoryList } from "@/components/admin/CategoryList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("admin.categories.title"),
  };
}

export default async function AdminCategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">{t("admin.categories.title")}</h1>
        <div className="flex gap-2">
          <LogoutButton />
          <Link href={`/${locale}/admin/categories/new`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("admin.categories.add")}
            </Button>
          </Link>
        </div>
      </div>

      <CategoryList categories={categories} locale={locale} />
    </div>
  );
}
