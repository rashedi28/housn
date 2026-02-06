// Auth pages must not be statically generated at build time
// (e.g. Supabase client / env may not be available during export)
export const dynamic = "force-dynamic";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
