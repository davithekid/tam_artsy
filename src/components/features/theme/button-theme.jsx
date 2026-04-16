"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
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
      aria-label="Toggle theme"
      className={cn(
        "relative flex h-9 w-16 items-center rounded-full border transition-colors duration-500",
        isDark ? "bg-zinc-800 border-zinc-700" : "bg-zinc-100 border-zinc-300"
      )}
    >
      <div className="absolute inset-0 flex items-center justify-between px-2.5 text-muted-foreground/40">
        <Sun className="size-3.5" />
        <Moon className="size-3.5" />
      </div>

      <motion.div
        className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-background shadow-lg"
        animate={{
          x: isDark ? 32 : 4,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? "dark" : "light"}
            initial={{ y: -10, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 10, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? (
              <Moon className="size-4 text-blue-400 fill-blue-400/10" />
            ) : (
              <Sun className="size-4 text-orange-500 fill-orange-500/10" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </button>
  );
}