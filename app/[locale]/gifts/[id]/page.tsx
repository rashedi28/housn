import { getTranslations } from "next-intl/server";
import { getGiftById } from "@/lib/supabase/queries";
import { notFound } from "next/navigation";
import { GiftDetail } from "@/components/gifts/GiftDetail";
import { Star } from "lucide-react";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  try {
    const { id, locale } = await params;
    const gift = await getGiftById(id);
    if (!gift) {
      return { 
        title: locale === "ar" ? "منتج غير موجود" : "Product not found",
        description: locale === "ar" ? "المنتج المطلوب غير موجود" : "The requested product was not found"
      };
    }

    const name = locale === "ar" ? gift.name_ar : gift.name_en;
    const description = locale === "ar" ? gift.description_ar : gift.description_en;

    return {
      title: `${name} - ${locale === "ar" ? "حُسن" : "Husn"}`,
      description: description || (locale === "ar" ? "منتج من متجر حُسن" : "Product from Husn store"),
    };
  } catch (error) {
    const resolvedParams = await params;
    return {
      title: resolvedParams.locale === "ar" ? "خطأ" : "Error",
      description: resolvedParams.locale === "ar" ? "حدث خطأ أثناء تحميل المنتج" : "An error occurred while loading the product",
    };
  }
}

export default async function GiftDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const gift = await getGiftById(id);

  if (!gift) {
    notFound();
  }

  return <GiftDetail gift={gift} locale={locale} />;
}
