import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Sparkles, Star, Truck, ArrowLeft } from "lucide-react";
import { getCategories, getGifts } from "@/lib/supabase/queries";
import { GiftGrid } from "@/components/gifts/GiftGrid";
import { Gift } from "@/types";
import { Hero3DBackground } from "@/components/Hero3DBackground";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("common.appName"),
    description: t("hero.subtitle"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  // جلب جميع الفئات
  let categories = [];
  let categoriesWithProducts = [];

  try {
    categories = await getCategories();

    // جلب بعض المنتجات لكل فئة (4 منتجات لكل فئة)
    categoriesWithProducts = await Promise.all(
      categories.map(async (category) => {
        try {
          const products = await getGifts(category.id);
          return {
            category,
            products: products.slice(0, 4), // أول 4 منتجات فقط
          };
        } catch (error) {
          // إذا فشل جلب المنتجات لفئة معينة، نرجع الفئة بدون منتجات
          return {
            category,
            products: [] as Gift[],
          };
        }
      })
    );
  } catch (error) {
    // في حالة الخطأ، نستخدم مصفوفات فارغة
    console.error("Error loading categories:", error);
  }

  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section - يغطي كامل الشاشة من أعلى الصفحة */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pointer-events-none">
        <Hero3DBackground />
        {/* تدرجات خفيفة فوق الخلفية ثلاثية الأبعاد */}
        <div className="absolute inset-0 gradient-beauty opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(248,187,208,0.25),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(230,213,243,0.25),transparent_50%)] pointer-events-none" />

        <div className="relative z-10 container mx-auto text-center px-4 pointer-events-auto">
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">
              {t("common.tagline")}
            </span>
          </div>

          <h1 className="mb-3 sm:mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-foreground">
              {t("common.appName")}
            </span>
          </h1>
          <p className="mb-3 sm:mb-4 text-xl sm:text-2xl md:text-3xl text-muted-foreground">
            {t("hero.title")}
          </p>

          <p className="mb-6 sm:mb-8 md:mb-10 mx-auto max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed px-4">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link href={`/${locale}/gifts`}>
              <Button
                size="lg"
                className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 glow"
              >
                {t("hero.cta")}
                <Sparkles className={`${locale === "ar" ? "mr-2" : "ml-2"} h-4 w-4 sm:h-5 sm:w-5`} />
              </Button>
            </Link>
            <Link href={`/${locale}/categories`}>
              <Button
                size="lg"
                variant="outline"
                className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                {t("nav.categories")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-8 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("hero.features.title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {locale === "ar" ? "لماذا تختارين حُسن؟" : "Why choose Husn?"}
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            <GlassCard className="text-center group hover:scale-105 transition-transform">
              <div className="mb-3 sm:mb-4 inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-pink text-primary-foreground">
                <Star className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="mb-2 text-lg sm:text-xl font-semibold">{t("hero.features.quality")}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{t("hero.features.qualityDesc")}</p>
            </GlassCard>

            <GlassCard className="text-center group hover:scale-105 transition-transform">
              <div className="mb-3 sm:mb-4 inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-peach text-primary-foreground">
                <Truck className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="mb-2 text-lg sm:text-xl font-semibold">{t("hero.features.delivery")}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{t("hero.features.deliveryDesc")}</p>
            </GlassCard>

            <GlassCard className="text-center group hover:scale-105 transition-transform">
              <div className="mb-3 sm:mb-4 inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-lavender text-primary-foreground">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="mb-2 text-lg sm:text-xl font-semibold">
                {locale === "ar" ? "منتجات أصلية" : "Authentic Products"}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {locale === "ar" ? "ضمان 100% على أصالة جميع المنتجات" : "100% guarantee on authenticity of all products"}
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Categories with Products Sections */}
      {categoriesWithProducts.map(({ category, products }) => {
        const categoryName = locale === "ar" ? category.name_ar : category.name_en;
        const categoryDescription = locale === "ar" ? category.description_ar : category.description_en;

        if (products.length === 0) return null;

        return (
          <section key={category.id} className="relative py-8 sm:py-10 md:py-12 px-4">
            <div className="container mx-auto">
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-foreground">
                    {category.name_ar && category.name_en
                      ? (locale === "ar" ? category.name_ar : category.name_en)
                      : category.name_ar || category.name_en || "Category"
                    }
                  </h2>
                  {categoryDescription && (
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {categoryDescription}
                    </p>
                  )}
                </div>
                <Link href={`/${locale}/gifts?category=${category.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all whitespace-nowrap"
                  >
                    {locale === "ar" ? "عرض المزيد" : "View More"}
                    <ArrowLeft className={`${locale === "ar" ? "mr-2" : "ml-2"} h-4 w-4`} />
                  </Button>
                </Link>
              </div>

              {/* Products Grid */}
              <GiftGrid gifts={products as Gift[]} locale={locale} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
