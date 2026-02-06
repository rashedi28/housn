"use client";

import { useWishlist } from "@/contexts/WishlistContext";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Heart, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/toast-provider";
import { GiftCard } from "@/components/gifts/GiftCard";

interface WishlistPageProps {
  locale: string;
}

export function WishlistPage({ locale }: WishlistPageProps) {
  const t = useTranslations();
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="h-24 w-24 mx-auto mb-6 text-muted-foreground opacity-50" />
          <h1 className="text-3xl font-bold mb-4">
            {locale === "ar" ? "المفضلة فارغة" : "Your wishlist is empty"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {locale === "ar"
              ? "ابدأ بإضافة المنتجات التي تحبها إلى المفضلة"
              : "Start adding products you love to your wishlist"
            }
          </p>
          <Link href={`/${locale}/gifts`}>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              {t("hero.cta")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          <Link href={`/${locale}/gifts`}>
            <Button variant="ghost" className="text-sm sm:text-base">
              {locale === "ar" ? (
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              ) : (
                <ArrowLeft className="mr-2 h-4 w-4" />
              )}
              {locale === "ar" ? "متابعة التسوق" : "Continue Shopping"}
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              clearWishlist();
              showToast(
                locale === "ar"
                  ? "تم مسح المفضلة"
                  : "Wishlist cleared",
                "info"
              );
            }}
          >
            {locale === "ar" ? "مسح الكل" : "Clear All"}
          </Button>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {locale === "ar" ? "قائمة المفضلة" : "Wishlist"}
        </h1>
      </div>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => {
          const name = locale === "ar" ? item.name_ar : item.name_en;
          return (
            <GlassCard key={item.id} className="group relative p-4 sm:p-6">
              {/* Remove from wishlist button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all"
                onClick={() => {
                  removeFromWishlist(item.id);
                  showToast(
                    locale === "ar"
                      ? `تم حذف ${name} من المفضلة`
                      : `${name} removed from wishlist`,
                    "error"
                  );
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              {/* Product Image */}
              <Link href={`/${locale}/gifts/${item.id}`} className="block mb-4">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                  <Image
                    src={item.image_url}
                    alt={name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="space-y-3">
                <Link href={`/${locale}/gifts/${item.id}`}>
                  <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2">
                  <Rating rating={item.rating} size="sm" showValue={true} />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <p className="text-xl font-bold text-primary">
                    {item.price.toFixed(2)} {locale === "ar" ? "ر.س" : "SAR"}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <Button
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => {
                    addToCart(item);
                    showToast(
                      locale === "ar"
                        ? `تم إضافة ${name} إلى السلة`
                        : `${name} added to cart`,
                      "success"
                    );
                  }}
                >
                  <ShoppingBag className={`${locale === "ar" ? "ml-2" : "mr-2"} h-4 w-4`} />
                  {t("products.addToCart")}
                </Button>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
