"use client";

import { Gift, Category } from "@/types";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface GiftCardProps {
  gift: Gift;
  categories: Category[];
  locale: string;
}

export function GiftCard({ gift, categories, locale }: GiftCardProps) {
  const t = useTranslations();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const name = locale === "ar" ? gift.name_ar : gift.name_en;
  const category = categories.find((c) => c.id === gift.category_id);
  const categoryName = category
    ? locale === "ar"
      ? category.name_ar
      : category.name_en
    : null;

  const handleDelete = async () => {
    if (!confirm(t("admin.gifts.deleteConfirm"))) return;

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("gifts").delete().eq("id", gift.id);
      if (error) throw error;
      router.refresh();
    } catch (error) {
      alert(t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard>
      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={gift.image_url}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{name}</h3>
      {categoryName && (
        <p className="mb-2 text-sm text-muted-foreground">{categoryName}</p>
      )}
      <p className="mb-4 text-lg font-bold">
        {gift.price.toFixed(2)} {locale === "ar" ? "ر.س" : "SAR"}
      </p>
      <div className="flex gap-2">
        <Link href={`/${locale}/admin/gifts/${gift.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            <Edit className="mr-2 h-4 w-4" />
            {t("common.edit")}
          </Button>
        </Link>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={loading}
          className="flex-1"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {t("common.delete")}
        </Button>
      </div>
    </GlassCard>
  );
}
