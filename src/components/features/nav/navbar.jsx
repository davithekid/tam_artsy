"use client";

import { Logo } from "@/components/mini-logo";
import { NavMenu } from "@/components/features/nav/nav-menu";
import { NavigationSheet } from "@/components/features/nav/navigation-sheet";
import { ButtonTheme } from "../theme/button-theme";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 h-20 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        
        <div className="flex items-center">
          <Logo className="transition-transform hover:scale-105" />
        </div>

        <div className="hidden md:block">
          <NavMenu />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <ButtonTheme />
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;