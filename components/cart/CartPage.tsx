"use client";

import { useCart } from "@/contexts/CartContext";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Rating } from "@/components/ui/rating";
import { useToast } from "@/components/ui/toast-provider";

interface CartPageProps {
  locale: string;
}

export function CartPage({ locale }: CartPageProps) {
  const t = useTranslations();
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground opacity-50" />
          <h1 className="text-3xl font-bold mb-4">{locale === "ar" ? "السلة فارغة" : "Your cart is empty"}</h1>
          <p className="text-muted-foreground mb-8">
            {locale === "ar"
              ? "ابدأ التسوق لإضافة منتجات إلى سلتك"
              : "Start shopping to add products to your cart"
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
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {locale === "ar" ? "سلة التسوق" : "Shopping Cart"}
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const name = locale === "ar" ? item.name_ar : item.name_en;
            return (
              <GlassCard key={item.id} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <Link href={`/${locale}/gifts/${item.id}`} className="flex-shrink-0">
                    <div className="relative w-full sm:w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                      <Image
                        src={item.image_url}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 96px"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <Link href={`/${locale}/gifts/${item.id}`}>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 hover:text-primary transition-colors">
                          {name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mb-2">
                        <Rating rating={item.rating} size="sm" showValue={false} />
                      </div>
                      <p className="text-lg font-bold text-primary">
                        {item.price.toFixed(2)} {locale === "ar" ? "ر.س" : "SAR"}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 border rounded-lg p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            updateQuantity(item.id, item.quantity - 1);
                            if (item.quantity > 1) {
                              showToast(
                                locale === "ar"
                                  ? "تم تقليل الكمية"
                                  : "Quantity decreased",
                                "info"
                              );
                            }
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            updateQuantity(item.id, item.quantity + 1);
                            showToast(
                              locale === "ar"
                                ? "تم زيادة الكمية"
                                : "Quantity increased",
                              "info"
                            );
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          removeFromCart(item.id);
                          const name = locale === "ar" ? item.name_ar : item.name_en;
                          showToast(
                            locale === "ar"
                              ? `تم حذف ${name} من السلة`
                              : `${name} removed from cart`,
                            "error"
                          );
                        }}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="mt-4 pt-4 border-t border-border flex justify-end">
                  <p className="text-sm text-muted-foreground">
                    {locale === "ar" ? "المجموع الفرعي" : "Subtotal"}:{" "}
                    <span className="font-bold text-foreground">
                      {(item.price * item.quantity).toFixed(2)} {locale === "ar" ? "ر.س" : "SAR"}
                    </span>
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <GlassCard className="p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">
              {locale === "ar" ? "ملخص الطلب" : "Order Summary"}
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {locale === "ar" ? "عدد العناصر" : "Items"}
                </span>
                <span className="font-semibold">{items.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {locale === "ar" ? "الكمية الإجمالية" : "Total Quantity"}
                </span>
                <span className="font-semibold">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    {locale === "ar" ? "الإجمالي" : "Total"}
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {totalPrice.toFixed(2)} {locale === "ar" ? "ر.س" : "SAR"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {locale === "ar" ? "إتمام الطلب" : "Checkout"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => {
                  clearCart();
                  showToast(
                    locale === "ar"
                      ? "تم مسح السلة"
                      : "Cart cleared",
                    "info"
                  );
                }}
              >
                {locale === "ar" ? "مسح السلة" : "Clear Cart"}
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
