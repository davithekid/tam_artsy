"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/mini-logo";
import { products } from "@/config/navbar";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Menu de Navegação</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="px-6 py-6">
        <Logo />

        <div className="mt-12 space-y-6 text-base">

          <Link className="inline-block font-medium" href="/">
            Inicio
          </Link>

          <div>
            <div className="font-bold">Produtos</div>

            <ul className="mt-3 ml-1 space-y-4 border-l pl-4">
              {products.map((item) => (
                <li key={item.title}>
                  <Link
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    href={item.link}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>

            <Link className="inline-block font-medium" href="/">
              Sobre
            </Link>
          </div>

          <div>
            <Link className="inline-block font-medium" href="/">
              Contato
            </Link>
          </div>


        </div>
      </SheetContent>
    </Sheet>
  );
};