"use client";

import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" aria-label="테마 전환">
        <SunMedium className="size-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="테마 전환"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <SunMedium className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
