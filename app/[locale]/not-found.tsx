import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Sparkles, Home } from "lucide-react";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: `${t("common.error")} - ${t("common.appName")}`,
  };
}

export default async function NotFound({
  params,
}: {
  params?: Promise<{ locale: string }>;
}) {
  const resolvedParams = params ? await params : { locale: "ar" };
  const { locale } = resolvedParams;
  const t = await getTranslations();

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <GlassCard className="p-12">
          <div className="mb-8">
            <Sparkles className="h-24 w-24 mx-auto mb-6 text-primary opacity-50" />
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-3xl font-semibold mb-4">
              {locale === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {locale === "ar"
                ? "عذراً، الصفحة التي تبحثين عنها غير موجودة."
                : "Sorry, the page you are looking for does not exist."}
            </p>
          </div>
          <Link href={`/${locale}`}>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Home className={`${locale === "ar" ? "ml-2" : "mr-2"} h-5 w-5`} />
              {locale === "ar" ? "العودة للرئيسية" : "Back to Home"}
            </Button>
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}
