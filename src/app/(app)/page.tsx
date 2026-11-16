import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PageHeader } from "@/components/page-header";

async function Welcome() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <PageHeader
      title={`Bonjour, ${session.user.name}`}
      description="Voici un aperçu de ton espace."
    />
  );
}

export default function Home() {
  return (
    <Suspense fallback={<PageHeader title="Bonjour" />}>
      <Welcome />
    </Suspense>
  );
}
