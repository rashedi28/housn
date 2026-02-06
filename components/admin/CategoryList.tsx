"use client";

import { Category } from "@/types";
import { CategoryCard } from "./CategoryCard";
import { useTranslations } from "next-intl";

interface CategoryListProps {
  categories: Category[];
  locale: string;
}

export function CategoryList({ categories, locale }: CategoryListProps) {
  const t = useTranslations();

  if (categories.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-muted-foreground">
          {t("categories.noCategories")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} locale={locale} />
      ))}
    </div>
  );
}
