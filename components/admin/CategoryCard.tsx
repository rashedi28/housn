"use client";

import { Category } from "@/types";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface CategoryCardProps {
  category: Category;
  locale: string;
}

export function CategoryCard({ category, locale }: CategoryCardProps) {
  const t = useTranslations();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const name = locale === "ar" ? category.name_ar : category.name_en;

  const handleDelete = async () => {
    if (!confirm(t("admin.categories.deleteConfirm"))) return;

    setLoading(true);
    try {
      const supabase = createClient();
      
      // Check if category has gifts
      const { data: gifts } = await supabase
        .from("gifts")
        .select("id")
        .eq("category_id", category.id)
        .limit(1);

      if (gifts && gifts.length > 0) {
        alert(t("admin.categories.cannotDelete"));
        setLoading(false);
        return;
      }

      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", category.id);

      if (error) throw error;
      router.refresh();
    } catch (error: any) {
      alert(t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard>
      <div
        className="mb-4 h-24 w-full rounded-lg"
        style={{
          backgroundColor: category.color || "#6366f1",
          opacity: 0.8,
        }}
      />
      <h3 className="mb-2 text-xl font-semibold">{name}</h3>
      {category.description_ar && (
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {locale === "ar" ? category.description_ar : category.description_en}
        </p>
      )}
      <div className="flex gap-2">
        <Link
          href={`/${locale}/admin/categories/${category.id}`}
          className="flex-1"
        >
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
