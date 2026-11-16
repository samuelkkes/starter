"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarPicker } from "glyph-avatar/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function AvatarEditor({
  userId,
  image,
  name,
}: {
  userId: string;
  image: string | null;
  name: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(image ?? userId);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(next: string) {
    setError(null);
    const { error } = await authClient.updateUser({ image: next });
    if (error) {
      setError(error.message ?? "Une erreur est survenue");
      return;
    }
    setValue(next);
    setEditing(false);
    router.refresh();
  }

  if (editing) {
    return (
      <div className="w-full space-y-3">
        <AvatarPicker
          defaultValue={value}
          onSave={save}
          onCancel={() => setEditing(false)}
          className="[--ga-panel:var(--card)]! [--ga-ink:var(--foreground)]! [--ga-muted:var(--muted-foreground)]! [--ga-accent:var(--primary)]! [--ga-accent-ink:var(--primary-foreground)]!"
        />
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Avatar value={value} size={96} alt={name} />
      <Button type="button" variant="outline" onClick={() => setEditing(true)}>
        Changer d&apos;avatar
      </Button>
    </div>
  );
}
