"use client";

import { Category } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

const categorySchema = z.object({
  name_ar: z.string().min(1),
  name_en: z.string().min(1),
  description_ar: z.string().optional(),
  description_en: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  category?: Category;
  locale: string;
}

export function CategoryForm({ category, locale }: CategoryFormProps) {
  const t = useTranslations();
  const router = useRouter();
  const currentLocale = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient() as any;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: category
      ? {
          name_ar: category.name_ar,
          name_en: category.name_en,
          description_ar: category.description_ar || "",
          description_en: category.description_en || "",
          icon: category.icon || "",
          color: category.color || "",
        }
      : {
          name_ar: "",
          name_en: "",
          description_ar: "",
          description_en: "",
          icon: "",
          color: "#6366f1",
        },
  });

  const onSubmit = async (data: CategoryFormData) => {
    setLoading(true);
    setError(null);

    try {
      const submitData = {
        name_ar: data.name_ar,
        name_en: data.name_en,
        description_ar: data.description_ar || null,
        description_en: data.description_en || null,
        icon: data.icon || null,
        color: data.color || null,
      };

      if (category) {
        const { error } = await supabase
          .from("categories")
          .update(submitData)
          .eq("id", category.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("categories").insert(submitData);
        if (error) throw error;
      }

      router.push(`/${currentLocale}/admin/categories`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <GlassCard className="max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold">
          {category ? t("admin.categories.edit") : t("admin.categories.add")}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("admin.categories.nameAr")}
              </label>
              <Input {...register("name_ar")} />
              {errors.name_ar && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.name_ar.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("admin.categories.nameEn")}
              </label>
              <Input {...register("name_en")} />
              {errors.name_en && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.name_en.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("admin.categories.descriptionAr")}
              </label>
              <textarea
                {...register("description_ar")}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("admin.categories.descriptionEn")}
              </label>
              <textarea
                {...register("description_en")}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("admin.categories.icon")}
              </label>
              <Input {...register("icon")} placeholder="Icon name or URL" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("admin.categories.color")}
              </label>
              <Input
                type="color"
                {...register("color")}
                className="h-10 w-full"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? t("common.loading") : t("common.save")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              {t("common.cancel")}
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
