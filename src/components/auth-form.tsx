"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type Mode = "login" | "signup";

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

    let retryAfter: string | null = null;
    const fetchOptions = {
      onError: ({ response }: { response: Response }) => {
        if (response.status === 429) retryAfter = response.headers.get("X-Retry-After");
      },
    };

    const { error } = isSignup
      ? await signUp.email({ name: String(form.get("name")), email, password, fetchOptions })
      : await signIn.email({ email, password, fetchOptions });

    setPending(false);
    if (error) {
      setError(
        error.status === 429
          ? `Trop de tentatives. Réessaie ${retryAfter ? `dans ${retryAfter} secondes` : "dans quelques instants"}.`
          : (error.message ?? "Une erreur est survenue"),
      );
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            {isSignup ? "Créer un compte" : "Connexion"}
          </CardTitle>
          <CardDescription>
            {isSignup
              ? "Renseigne tes informations pour commencer."
              : "Connecte-toi avec ton email et ton mot de passe."}
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent>
            <FieldGroup>
              {isSignup && (
                <Field>
                  <FieldLabel htmlFor="name">Nom</FieldLabel>
                  <Input id="name" name="name" type="text" required autoComplete="name" />
                </Field>
              )}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                />
              </Field>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Chargement…" : isSignup ? "Créer le compte" : "Se connecter"}
              </Button>
            </FieldGroup>
          </CardContent>
        </form>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          {isSignup ? (
            <>
              Déjà un compte ?&nbsp;
              <Link href="/login" className="underline">
                Se connecter
              </Link>
            </>
          ) : (
            <>
              Pas encore de compte ?&nbsp;
              <Link href="/signup" className="underline">
                Créer un compte
              </Link>
            </>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
