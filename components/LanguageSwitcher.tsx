"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={switchLocale}
      className="w-10 h-10"
      aria-label="Switch language"
    >
      <Languages className="w-5 h-5" />
      <span className="sr-only">{locale === "ar" ? "English" : "العربية"}</span>
    </Button>
  );
}
