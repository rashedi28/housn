"use client";

import { Gift, Category } from "@/types";
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

const giftSchema = z.object({
  name_ar: z.string().min(1),
  name_en: z.string().min(1),
  description_ar: z.string().min(1),
  description_en: z.string().min(1),
  price: z.number().min(0),
  image_url: z.string().url(),
  category_id: z.string().nullable(),
  available_quantity: z.number().min(0),
  rating: z.number().min(0).max(5),
});

type GiftFormData = z.infer<typeof giftSchema>;

interface GiftFormProps {
  gift?: Gift;
  categories: Category[];
  locale: string;
}

export function GiftForm({ gift, categories, locale }: GiftFormProps) {
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
    setValue,
    watch,
  } = useForm<GiftFormData>({
    resolver: zodResolver(giftSchema),
    defaultValues: gift
      ? {
          name_ar: gift.name_ar,
          name_en: gift.name_en,
          description_ar: gift.description_ar,
          description_en: gift.description_en,
          price: gift.price,
          image_url: gift.image_url,
          category_id: gift.category_id || null,
          available_quantity: gift.available_quantity,
          rating: gift.rating,
        }
      : {
          name_ar: "",
          name_en: "",
          description_ar: "",
          description_en: "",
          price: 0,
          image_url: "",
          category_id: null,
          available_quantity: 0,
          rating: 0,
        },
  });

  const categoryId = watch("category_id");

  const onSubmit = async (data: GiftFormData) => {
    setLoading(true);
    setError(null);

    try {
      if (gift) {
        const { error } = await supabase
          .from("gifts")
          .update(data)
          .eq("id", gift.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("gifts").insert(data);
        if (error) throw error;
      }

      router.push(`/${currentLocale}/admin/gifts`);
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
          {gift ? t("admin.gifts.edit") : t("admin.gifts.add")}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("admin.gifts.nameAr")}
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
                {t("admin.gifts.nameEn")}
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
                {t("admin.gifts.descriptionAr")}
              </label>
              <textarea
                {...register("description_ar")}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {errors.description_ar && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.description_ar.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("admin.gifts.descriptionEn")}
              </label>
              <textarea
                {...register("description_en")}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {errors.description_en && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.description_en.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("admin.gifts.imageUrl")}
            </label>
            <Input type="url" {...register("image_url")} />
            {errors.image_url && (
              <p className="mt-1 text-sm text-destructive">
                {errors.image_url.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("admin.gifts.category")}
            </label>
            <select
              value={categoryId || ""}
              onChange={(e) =>
                setValue("category_id", e.target.value || null)
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">{t("common.all")}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {locale === "ar" ? category.name_ar : category.name_en}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("admin.gifts.price")}
              </label>
              <Input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("admin.gifts.quantity")}
              </label>
              <Input
                type="number"
                {...register("available_quantity", { valueAsNumber: true })}
              />
              {errors.available_quantity && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.available_quantity.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("admin.gifts.rating")}
              </label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="5"
                {...register("rating", { valueAsNumber: true })}
              />
              {errors.rating && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.rating.message}
                </p>
              )}
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
