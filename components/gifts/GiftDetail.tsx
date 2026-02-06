"use client";

import { Gift } from "@/types";
import { GlassCard } from "@/components/ui/glass-card";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, ArrowLeft, Check, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/components/ui/toast-provider";

interface GiftDetailProps {
  gift: Gift;
  locale: string;
}

export function GiftDetail({ gift, locale }: GiftDetailProps) {
  const t = useTranslations();
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const name = locale === "ar" ? gift.name_ar : gift.name_en;
  const inWishlist = isInWishlist(gift.id);
  const description = locale === "ar" ? gift.description_ar : gift.description_en;
  const categoryName = gift.category
    ? locale === "ar"
      ? gift.category.name_ar
      : gift.category.name_en
    : null;

  // إنشاء مصفوفة صور (يمكن توسيعها لاحقاً لدعم صور متعددة)
  const images = [gift.image_url, gift.image_url, gift.image_url, gift.image_url];

  return (
    <div className="container mx-auto px-4 pt-24 pb-6 sm:pb-8 lg:pb-12">
      <Link href={`/${locale}/gifts`}>
        <Button variant="ghost" className="mb-4 sm:mb-6 text-sm sm:text-base group">
          {locale === "ar" ? (
            <ArrowLeft className="ml-2 h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
          ) : (
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          )}
          {t("common.back")}
        </Button>
      </Link>

      <div className="grid gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-3 sm:space-y-4">
          {/* الصورة الرئيسية */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 group">
            <Image
              src={images[selectedImage]}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {gift.rating >= 4.5 && (
              <Badge variant="bestseller" className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 shadow-lg">
                {t("common.bestseller")}
              </Badge>
            )}
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
          </div>

          {/* الصور المصغرة */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border-2 transition-all ${selectedImage === index
                    ? "border-primary scale-105 shadow-lg"
                    : "border-transparent hover:border-primary/50"
                  }`}
              >
                <Image
                  src={img}
                  alt={`${name} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 12.5vw"
                />
                {selectedImage === index && (
                  <div className="absolute inset-0 bg-primary/10 border-2 border-primary rounded-xl" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4 sm:space-y-6">
          {/* العنوان والفئة */}
          <div>
            {categoryName && (
              <Badge variant="secondary" className="mb-3 text-xs sm:text-sm">
                {categoryName}
              </Badge>
            )}
            <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              {name}
            </h1>

            {/* التقييم والكمية */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Rating rating={gift.rating} size="md" showValue={true} />
              <span className="text-xs sm:text-sm text-muted-foreground">
                ({gift.available_quantity} {t("products.quantity")})
              </span>
            </div>
          </div>

          {/* السعر */}
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 shadow-sm">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">{t("products.price")}</p>
            <p className="text-3xl sm:text-4xl font-bold text-primary">
              {gift.price.toFixed(2)} {locale === "ar" ? "ر.س" : "SAR"}
            </p>
          </div>

          {/* الوصف */}
          <GlassCard className="p-4 sm:p-6">
            <h2 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold">{t("products.description")}</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{description}</p>
          </GlassCard>

          {/* المميزات */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {locale === "ar" ? "منتج أصلي 100%" : "100% Original Product"}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-secondary-foreground" />
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {locale === "ar" ? "توصيل سريع وآمن" : "Fast & Secure Delivery"}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-accent-foreground" />
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {locale === "ar" ? "ضمان الجودة" : "Quality Guarantee"}
              </span>
            </div>
          </div>

          {/* أزرار الإجراء */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
            <Button
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 glow text-sm sm:text-base"
              onClick={() => {
                addToCart(gift);
                const name = locale === "ar" ? gift.name_ar : gift.name_en;
                showToast(
                  locale === "ar"
                    ? `تم إضافة ${name} إلى السلة`
                    : `${name} added to cart`,
                  "success"
                );
              }}
            >
              <ShoppingBag className={`${locale === "ar" ? "ml-2" : "mr-2"} h-4 w-4 sm:h-5 sm:w-5`} />
              {t("products.addToCart")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`flex-1 border-2 text-sm sm:text-base transition-all ${inWishlist
                  ? "border-primary/30 bg-primary/5 text-foreground hover:bg-primary/10"
                  : "border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                }`}
              onClick={() => {
                if (inWishlist) {
                  removeFromWishlist(gift.id);
                  showToast(
                    locale === "ar"
                      ? `تم حذف ${name} من المفضلة`
                      : `${name} removed from wishlist`,
                    "error"
                  );
                } else {
                  addToWishlist(gift);
                  showToast(
                    locale === "ar"
                      ? `تم إضافة ${name} إلى المفضلة`
                      : `${name} added to wishlist`,
                    "success"
                  );
                }
              }}
            >
              <Heart
                className={`${locale === "ar" ? "ml-2" : "mr-2"} h-4 w-4 sm:h-5 sm:w-5`}
                style={inWishlist ? { color: "#ef4444", fill: "#ef4444" } : {}}
              />
              {inWishlist
                ? (locale === "ar" ? "إزالة من المفضلة" : "Remove from Wishlist")
                : (locale === "ar" ? "إضافة للمفضلة" : "Add to Wishlist")
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
