import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AvatarEditor } from "@/components/avatar-editor";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

async function ProfileContent() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { user } = session;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <AvatarEditor userId={user.id} image={user.image ?? null} name={user.name} />
      </CardContent>
    </Card>
  );
}

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="Profil" description="Gère ton avatar et tes informations." />
      <Suspense fallback={<p className="text-sm text-muted-foreground">Chargement…</p>}>
        <ProfileContent />
      </Suspense>
    </>
  );
}
