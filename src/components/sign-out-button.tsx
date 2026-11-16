"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={async () => {
        await signOut();
        router.refresh();
      }}
    >
      Se déconnecter
    </Button>
  );
}
