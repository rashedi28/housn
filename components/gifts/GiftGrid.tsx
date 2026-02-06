"use client";

import { Gift } from "@/types";
import { GiftCard } from "./GiftCard";
import { useTranslations } from "next-intl";

interface GiftGridProps {
  gifts: Gift[];
  locale: string;
}

export function GiftGrid({ gifts, locale }: GiftGridProps) {
  const t = useTranslations();

  if (gifts.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-muted-foreground">{t("products.noProducts")}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {gifts.map((gift) => (
        <GiftCard key={gift.id} gift={gift} locale={locale} />
      ))}
    </div>
  );
}
