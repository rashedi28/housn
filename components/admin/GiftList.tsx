"use client";

import { Gift, Category } from "@/types";
import { GiftCard } from "./GiftCard";
import { useTranslations } from "next-intl";

interface GiftListProps {
  gifts: Gift[];
  categories: Category[];
  locale: string;
}

export function GiftList({ gifts, categories, locale }: GiftListProps) {
  const t = useTranslations();

  if (gifts.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-muted-foreground">{t("products.noProducts")}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {gifts.map((gift) => (
        <GiftCard
          key={gift.id}
          gift={gift}
          categories={categories}
          locale={locale}
        />
      ))}
    </div>
  );
}
