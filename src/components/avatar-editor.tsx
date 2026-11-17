"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PencilEdit01Icon } from "@hugeicons/core-free-icons";
import { Avatar, AvatarPicker } from "glyph-avatar/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(next: string) {
    setError(null);
    const { error } = await authClient.updateUser({ image: next });
    if (error) {
      setError(error.message ?? "Une erreur est survenue");
      return;
    }
    setValue(next);
    setOpen(false);
    router.refresh();
  }

  function onOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setError(null);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        aria-label="Modifier l'avatar"
        className="group/avatar relative flex size-16 shrink-0 cursor-pointer overflow-hidden rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Avatar value={value} size={64} alt={name} className="[&_svg]:size-full!" />
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover/avatar:opacity-100 group-focus-visible/avatar:opacity-100">
          <HugeiconsIcon icon={PencilEdit01Icon} className="size-5" />
        </span>
      </DialogTrigger>
        <DialogContent showCloseButton={false} className="gap-0 overflow-hidden p-0 sm:max-w-lg">
          <DialogTitle className="sr-only">Choisir un avatar</DialogTitle>
          <DialogDescription className="sr-only">
            Fais glisser pour explorer, puis choisis l&apos;avatar qui te plaît.
          </DialogDescription>
          {/* The picker remounts on every open, so defaultValue is re-read each time */}
          <AvatarPicker
            title="Choisir un avatar"
            description="Fais glisser pour explorer, puis choisis celui qui te plaît."
            saveLabel="Enregistrer"
            defaultValue={value}
            onSave={save}
            onCancel={() => onOpenChange(false)}
            className="[--ga-panel:var(--popover)]! [--ga-ink:var(--foreground)]! [--ga-muted:var(--muted-foreground)]! [--ga-accent:var(--primary)]! [--ga-accent-ink:var(--primary-foreground)]! [--ga-radius:0px]!"
          />
          {error && (
            <Alert variant="destructive" className="m-4 mt-0 w-auto">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </DialogContent>
    </Dialog>
  );
}
