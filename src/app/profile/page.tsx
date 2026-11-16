import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";
import { AvatarEditor } from "@/components/avatar-editor";

async function ProfileContent() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { user } = session;

  return (
    <>
      <AvatarEditor userId={user.id} image={user.image ?? null} name={user.name} />
      <div className="space-y-1">
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
    </>
  );
}

export default function ProfilePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <h1 className="text-2xl font-semibold tracking-tight">Mon profil</h1>
        <Suspense fallback={<p className="text-sm text-muted-foreground">Chargement…</p>}>
          <ProfileContent />
        </Suspense>
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
