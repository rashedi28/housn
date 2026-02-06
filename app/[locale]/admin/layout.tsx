import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/auth";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await getCurrentUser();

  // Only check authentication if user is not logged in
  // Login page will be handled separately
  if (!user) {
    redirect(`/${locale}/admin/login`);
  }

  return <>{children}</>;
}
