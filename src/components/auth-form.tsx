"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";

type Mode = "login" | "signup";

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-100";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const isSignup = mode === "signup";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    const { error } = isSignup
      ? await signUp.email({ name: String(form.get("name")), email, password })
      : await signIn.email({ email, password });

    setPending(false);
    if (error) {
      setError(error.message ?? "Une erreur est survenue");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isSignup ? "Créer un compte" : "Connexion"}
        </h1>

        {isSignup && (
          <label className="block space-y-1 text-sm">
            <span>Nom</span>
            <input name="name" type="text" required autoComplete="name" className={inputClass} />
          </label>
        )}
        <label className="block space-y-1 text-sm">
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" className={inputClass} />
        </label>
        <label className="block space-y-1 text-sm">
          <span>Mot de passe</span>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete={isSignup ? "new-password" : "current-password"}
            className={inputClass}
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {pending ? "Chargement…" : isSignup ? "Créer le compte" : "Se connecter"}
        </button>

        <p className="text-center text-sm text-zinc-500">
          {isSignup ? (
            <>
              Déjà un compte ?{" "}
              <Link href="/login" className="underline">
                Se connecter
              </Link>
            </>
          ) : (
            <>
              Pas encore de compte ?{" "}
              <Link href="/signup" className="underline">
                Créer un compte
              </Link>
            </>
          )}
        </p>
      </form>
    </main>
  );
}
