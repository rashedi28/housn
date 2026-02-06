import { getTranslations } from "next-intl/server";
import { getCategories } from "@/lib/supabase/queries";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Sparkles, Palette, Heart, Scissors, Droplets, Flower2 } from "lucide-react";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: `${t("categories.title")} - ${t("common.appName")}`,
    description: t("categories.allCategories"),
  };
}

const categoryIcons: Record<string, any> = {
  "العناية بالبشرة": Palette,
  "Skincare": Palette,
  "المكياج": Heart,
  "Makeup": Heart,
  "العناية بالشعر": Scissors,
  "Hair Care": Scissors,
  "العطور": Droplets,
  "Fragrance": Droplets,
  "العناية بالجسم": Flower2,
  "Body Care": Flower2,
};

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {t("categories.title")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("categories.allCategories")}
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const name = locale === "ar" ? category.name_ar : category.name_en;
          const description =
            locale === "ar" ? category.description_ar : category.description_en;

          const IconComponent = categoryIcons[name] || Sparkles;
          const categoryColor = category.color || "#F8BBD0";

          return (
            <Link
              key={category.id}
              href={`/${locale}/gifts?category=${category.id}`}
            >
              <GlassCard className="group cursor-pointer transition-all hover:scale-105 hover:shadow-2xl h-full flex flex-col">
                <div
                  className="h-40 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${categoryColor}40, ${categoryColor}20)`,
                    border: `2px solid ${categoryColor}30`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <IconComponent
                      className="h-16 w-16"
                      style={{ color: categoryColor }}
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="mb-3 text-2xl font-semibold group-hover:text-primary transition-colors">
                    {name}
                  </h3>
                  {description && (
                    <p className="text-muted-foreground mb-4 flex-1 line-clamp-2">
                      {description}
                    </p>
                  )}
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <span className="text-sm text-primary font-medium group-hover:gap-2 transition-all inline-flex items-center gap-1">
                      {locale === "ar" ? "استكشفي القسم" : "Explore Category"}
                      {locale === "ar" ? (
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                      ) : (
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      )}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-20">
          <Sparkles className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground text-lg">
            {t("categories.noCategories")}
          </p>
        </div>
      )}
    </div>
  );
}
