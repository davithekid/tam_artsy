"use client";

import { Logo } from "@/components/mini-logo";
import { NavMenu } from "@/components/features/nav/nav-menu";
import { NavigationSheet } from "@/components/features/nav/navigation-sheet";
import { ButtonTheme } from "../theme/button-theme";

const Navbar = () => {
  return (
    <nav className="h-16 border-b bg-background">
      <div className="relative mx-auto flex h-full max-w-(--breakpoint-lg) items-center px-4 sm:px-6 lg:px-8">

        <div className="flex items-center">
          <Logo />
        </div>

        <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <NavMenu />
        </div>
        <div className="ml-auto flex items-center gap-3">
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