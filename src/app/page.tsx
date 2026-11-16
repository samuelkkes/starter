import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { Avatar } from "glyph-avatar/react";
import { auth } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";
import { SignOutButton } from "@/components/sign-out-button";

async function HomeContent() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    return (
      <>
        <Avatar
          value={session.user.image ?? session.user.id}
          size={96}
          alt={session.user.name}
        />
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Bonjour, {session.user.name}
          </h1>
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/profile" className={buttonVariants({ variant: "outline" })}>
            Mon profil
          </Link>
          <SignOutButton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Starter</h1>
        <p className="text-sm text-muted-foreground">
          Connecte-toi ou crée un compte pour continuer.
        </p>
      </div>
      <div className="flex gap-3">
        <Link href="/login" className={buttonVariants()}>
          Connexion
        </Link>
        <Link href="/signup" className={buttonVariants({ variant: "outline" })}>
          Créer un compte
        </Link>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
      <Suspense fallback={<p className="text-sm text-muted-foreground">Chargement…</p>}>
        <HomeContent />
      </Suspense>
    </main>
  );
}
