"use client";

import { Gift } from "@/types";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/components/ui/toast-provider";

interface GiftCardProps {
  gift: Gift;
  locale: string;
}

export function GiftCard({ gift, locale }: GiftCardProps) {
  const t = useTranslations();
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const name = locale === "ar" ? gift.name_ar : gift.name_en;
  const inWishlist = isInWishlist(gift.id);
  const categoryName = gift.category
    ? locale === "ar"
      ? gift.category.name_ar
      : gift.category.name_en
    : null;

  // Determine badge based on rating or other criteria
  const getBadge = () => {
    if (gift.rating >= 4.5) {
      return <Badge variant="bestseller" className="absolute top-2 left-2 z-10">{t("common.bestseller")}</Badge>;
    }
    if (gift.available_quantity > 100) {
      return <Badge variant="new" className="absolute top-2 left-2 z-10">{t("common.new")}</Badge>;
    }
    return null;
  };

  return (
    <Link href={`/${locale}/gifts/${gift.id}`} className="block">
      <GlassCard 
        className="group h-full cursor-pointer transition-all hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badge */}
        {getBadge()}
        
        {/* Image Container */}
        <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
          <Image
            src={gift.image_url}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            loading="lazy"
          />
          
          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Wishlist Button - Always visible if in wishlist, or on hover */}
          <div className={`absolute top-2 right-2 transition-all duration-300 ${
            inWishlist ? 'opacity-100 translate-y-0' : (isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2')
          }`}>
            <Button
              size="icon"
              variant="secondary"
              className={`h-9 w-9 rounded-full backdrop-blur-sm transition-all ${
                inWishlist 
                  ? "bg-background/80 hover:bg-background/90" 
                  : "bg-background/80 hover:bg-primary hover:text-primary-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
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
                className={`h-4 w-4 ${inWishlist ? "fill-red-500" : ""}`}
                style={inWishlist ? { color: "#ef4444", fill: "#ef4444" } : {}}
              />
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-2">
          {categoryName && (
            <p className="text-xs font-medium text-primary/70 uppercase tracking-wide">
              {categoryName}
            </p>
          )}
          
          <h3 className="text-lg sm:text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors min-h-[3rem]">
            {name}
          </h3>
          
          <div className="flex items-center gap-2">
            <Rating rating={gift.rating} size="sm" showValue={true} />
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <p className="text-xl font-bold text-primary">
              {gift.price.toFixed(2)} {locale === "ar" ? "ر.س" : "SAR"}
            </p>
            
            <Button
              size="sm"
              className="rounded-full px-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
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
              <ShoppingBag className={`h-4 w-4 ${locale === "ar" ? "ml-1" : "mr-1"}`} />
              {t("products.addToCart")}
            </Button>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
