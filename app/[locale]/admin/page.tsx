import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Sparkles, FolderOpen } from "lucide-react";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("admin.title"),
  };
}

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <h1 className="mb-8 text-4xl font-bold">{t("admin.title")}</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href={`/${locale}/admin/gifts`}>
          <GlassCard className="cursor-pointer transition-all hover:scale-105 group">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-pink text-primary-foreground group-hover:scale-110 transition-transform">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="mb-2 text-2xl font-semibold group-hover:text-primary transition-colors">
              {t("admin.products.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("admin.products.title")}
            </p>
          </GlassCard>
        </Link>

        <Link href={`/${locale}/admin/categories`}>
          <GlassCard className="cursor-pointer transition-all hover:scale-105 group">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-peach text-primary-foreground group-hover:scale-110 transition-transform">
              <FolderOpen className="h-8 w-8" />
            </div>
            <h2 className="mb-2 text-2xl font-semibold group-hover:text-primary transition-colors">
              {t("admin.categories.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("admin.categories.title")}
            </p>
          </GlassCard>
        </Link>
      </div>
    </div>
  );
}
