"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarPicker } from "glyph-avatar/react";
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
        />
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Avatar value={value} size={96} alt={name} />
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700"
      >
        Changer d&apos;avatar
      </button>
    </div>
  );
}
