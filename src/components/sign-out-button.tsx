"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await signOut();
        router.refresh();
      }}
      className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700"
    >
      Se déconnecter
    </button>
  );
}
