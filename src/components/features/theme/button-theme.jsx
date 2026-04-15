"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ButtonTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex h-9 w-16 items-center rounded-full border transition-colors",
        "bg-muted hover:bg-muted/80"
      )}
    >
      <div className="absolute inset-0 flex items-center justify-between px-2 text-muted-foreground">
        <Sun className="size-4" />
        <Moon className="size-4" />
      </div>

      <div
        className={cn(
          "relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-background shadow-md transition-transform duration-300",
          isDark ? "translate-x-7" : "translate-x-1"
        )}
      >
        {isDark ? (
          <Moon className="size-4" />
        ) : (
          <Sun className="size-4" />
        )}
      </div>
    </button>
  );
}