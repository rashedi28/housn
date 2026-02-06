"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Sparkles, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="relative border-t border-primary/20 bg-gradient-to-b from-background to-muted/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("common.appName")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {locale === "ar" 
                ? "متجر حُسن - وجهتك المثالية لمستحضرات التجميل والعناية عالية الجودة"
                : "Husn Store - Your perfect destination for high-quality cosmetics and care products"
              }
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">
              {locale === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/gifts`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.products")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/categories`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.categories")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">
              {locale === "ar" ? "خدمة العملاء" : "Customer Service"}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {locale === "ar" ? "سياسة الإرجاع" : "Return Policy"}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {locale === "ar" ? "الشحن والتوصيل" : "Shipping & Delivery"}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {locale === "ar" ? "الأسئلة الشائعة" : "FAQ"}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {locale === "ar" ? "اتصل بنا" : "Contact Us"}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">
              {locale === "ar" ? "تواصل معنا" : "Get in Touch"}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@husn.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+966 50 123 4567</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span>
                  {locale === "ar" 
                    ? "المملكة العربية السعودية"
                    : "Saudi Arabia"
                  }
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} {t("common.appName")}. {locale === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              {locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              {locale === "ar" ? "شروط الاستخدام" : "Terms of Service"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
