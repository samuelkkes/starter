"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Changer de thème"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* Both icons are rendered and CSS picks one, which avoids a hydration mismatch */}
      <HugeiconsIcon icon={Sun03Icon} className="dark:hidden" />
      <HugeiconsIcon icon={Moon02Icon} className="hidden dark:block" />
    </Button>
  );
}
