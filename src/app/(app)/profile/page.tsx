import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AvatarEditor } from "@/components/avatar-editor";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function Row({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b px-6 py-5 last:border-b-0">
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}

async function ProfileRows() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { user } = session;

  return (
    <>
      <Row title="Photo de profil" description="Choisis un avatar.">
        <AvatarEditor userId={user.id} image={user.image ?? null} name={user.name} />
      </Row>
      <Row title="Nom complet">
        <Input readOnly defaultValue={user.name} className="w-56 text-right" />
      </Row>
      <Row title="Email">
        <Input readOnly defaultValue={user.email} className="w-72 text-right" />
      </Row>
    </>
  );
}

export default function ProfilePage() {
  return (
    <Card className="w-full gap-0 py-0">
      <div className="flex items-center gap-2 border-b px-6 py-4 text-sm">
        <span className="text-muted-foreground">Paramètres</span>
        <span className="text-muted-foreground">/</span>
        <h1 className="font-medium">Profil</h1>
      </div>
      <Suspense fallback={<p className="px-6 py-5 text-sm text-muted-foreground">Chargement…</p>}>
        <ProfileRows />
      </Suspense>
    </Card>
  );
}
