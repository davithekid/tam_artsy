"use client";

import { ArrowUp, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Logo } from "@/components/mini-logo";

const FOOTER_LINKS = [
  {
    title: "Produtos",
    items: [
      { text: "Bolsas", link: "/bolsas" },
      { text: "Tops", link: "/tops" },
      { text: "Headpieces", link: "/headpiece" },
      { text: "Variados", link: "/variados" },
      { text: "Unissex", link: "/unissex" },
      { text: "Ver Todos", link: "/produtos" },
    ],
  },
  {
    title: "Coleções",
    items: [
      { text: "Carnaval 2026", link: "#" },
      { text: "Verão Artsy", link: "#" },
    ],
  },
  {
    title: "Tam Artsy",
    items: [
      { text: "Sobre a Marca", link: "/sobre" },
      { text: "Fale Conosco", link: "/contato" },
      { text: "Instagram", link: "https://www.instagram.com/tam.artsy/" },
    ],
  },
];

const Footer = ({ className }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className={cn("bg-black text-white pt-20 pb-10 px-6", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="space-y-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  {section.title}
                </h2>

                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item.text}>
                      <Link 
                        href={item.link} 
                        className="text-sm text-zinc-400 hover:text-white transition-colors"
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Social
            </h2>

            <div className="flex gap-4">
              <Link 
                href="https://www.instagram.com/tam.artsy/" 
                target="_blank"
                className="flex size-10 items-center justify-center rounded-full border border-zinc-800 hover:bg-white hover:text-black transition-all"
              >
                <Camera className="size-5" />
              </Link>

              <button 
                onClick={scrollToTop}
                className="flex size-10 items-center justify-center rounded-full border border-zinc-800 hover:border-zinc-500 transition-all"
              >
                <ArrowUp className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* LOGO + DIVISOR */}
        <div className="mt-20 space-y-8">
          <div className="flex items-center gap-8">
            <Separator className="bg-zinc-800 flex-1" />

            <div className="opacity-50 grayscale hover:grayscale-0 transition-all">
              <Logo />
            </div>

            <Separator className="bg-zinc-800 flex-1" />
          </div>

          {/* COPYRIGHT */}
          <div className="flex flex-col items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600 md:flex-row">
            <p>© 2026 Tam Artsy</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export { Footer };