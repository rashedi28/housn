"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Sparkles, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const { getTotalProducts } = useCart();
  const { getTotalItems: getWishlistItems } = useWishlist();
  const totalProducts = getTotalProducts();
  const wishlistCount = getWishlistItems();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/25 dark:border-white/10 bg-white/30 dark:bg-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-white/20 supports-[backdrop-filter]:dark:bg-black/15 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 group flex-shrink-0">
          <div className="relative">
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-primary transition-transform group-hover:scale-110 group-hover:rotate-12" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-foreground whitespace-nowrap">
            {t("common.appName")}
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-1 justify-end">
          <Link href={`/${locale}`}>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex hover:text-primary transition-colors">
              {t("nav.home")}
            </Button>
          </Link>
          <Link href={`/${locale}/gifts`}>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex hover:text-primary transition-colors">
              {t("nav.products")}
            </Button>
          </Link>
          <Link href={`/${locale}/categories`}>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex hover:text-primary transition-colors">
              {t("nav.categories")}
            </Button>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2 ml-2 sm:ml-3 pl-2 sm:pl-3 border-l border-border">
            <Link href={`/${locale}/wishlist`}>
              <Button variant="ghost" size="icon" className="relative hover:text-primary transition-colors">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center animate-pulse">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href={`/${locale}/cart`}>
              <Button variant="ghost" size="icon" className="relative hover:text-primary transition-colors">
                <ShoppingBag className="h-5 w-5" />
                {totalProducts > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center animate-pulse">
                    {totalProducts > 99 ? "99+" : totalProducts}
                  </span>
                )}
              </Button>
            </Link>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
