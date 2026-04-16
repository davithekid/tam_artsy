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
      { text: "Dia dos Namorados", link: "#" },
      { text: "Copa do Mundo", link: "#" },
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
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className={cn(
        "relative overflow-hidden bg-black text-white pt-24 pb-10 px-6",
        className
      )}
    >
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="mx-auto max-w-7xl relative">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="space-y-5">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
                  {section.title}
                </h2>

                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.text}>
                      <Link
                        href={item.link}
                        className="group relative text-sm text-zinc-400 transition-colors hover:text-white"
                      >
                        <span>{item.text}</span>
                        <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Social
            </h2>

            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/tam.artsy/"
                target="_blank"
                className="group flex size-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 transition-all hover:border-white hover:bg-white"
              >
                <Camera className="size-5 text-zinc-400 group-hover:text-black transition-colors" />
              </Link>

              <button
                onClick={scrollToTop}
                className="group flex size-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 transition-all hover:border-white hover:bg-white"
              >
                <ArrowUp className="size-5 text-zinc-400 group-hover:text-black transition-colors" />
              </button>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed">
              Peças artesanais feitas à mão com identidade e estilo próprio.
            </p>
          </div>
        </div>

        <div className="mt-20 space-y-8">
          <div className="flex items-center gap-8">
            <Separator className="bg-zinc-800/70" />

            <div className="opacity-60 hover:opacity-100 transition">
              <Logo />
            </div>

            <Separator className="bg-zinc-800/70" />
          </div>

          <div className="flex flex-col items-center justify-between gap-4 text-[11px] font-medium tracking-widest text-zinc-600 md:flex-row">
            <p>© 2026 Tam Artsy </p>

            <p className="text-zinc-700 hover:text-zinc-400 transition">
              Desenvolvido com atenção aos detalhes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };