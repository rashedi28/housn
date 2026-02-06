"use client";

import { Category } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
  locale: string;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  locale,
}: CategoryFilterProps) {
  const t = useTranslations();

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <Link href={`/${locale}/gifts`}>
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          size="sm"
          className="text-xs sm:text-sm"
        >
          {t("common.all")}
        </Button>
      </Link>
      {categories.map((category) => {
        const name = locale === "ar" ? category.name_ar : category.name_en;
        return (
          <Link key={category.id} href={`/${locale}/gifts?category=${category.id}`}>
            <Button
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className="text-xs sm:text-sm"
            >
              {name}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
