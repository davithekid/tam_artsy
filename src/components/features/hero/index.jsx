import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MiniLogo } from "@/components/logo";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-[radial-gradient(circle_at_70%_50%,rgba(0,0,0,0.04)_0%,transparent_50%)]">

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] items-center">

        <div className="relative z-10">
          <Badge
            asChild
            className="rounded-full border-border py-1.5 px-4 text-xs font-medium tracking-widest uppercase mb-8"
            variant="secondary"
          >
            <Link href="#" className="flex items-center gap-2">
              Desde 2025
              <ArrowUpRight className="size-3 opacity-70" />
            </Link>
          </Badge>

          <h1 className="font-satoshi font-black text-5xl leading-[1.05] tracking-tighter md:text-7xl lg:text-7xl text-pretty">
            Quem tem estilo, <br />
            <span className="text-muted-foreground/40 italic">usa</span> Tam Artsy.
          </h1>

          <p className="hidden md:block mt-8 max-w-[45ch] text-foreground/70 text-lg md:text-xl leading-relaxed">
            Peças artesanais feitas à mão que unem estilo e autenticidade.
            Descubra roupas e acessórios que não apenas compõem, mas <b>definem</b> seu look.
          </p>

          <div className="mt-12 hidden lg:flex flex-wrap items-center gap-5">
            <Button className="rounded-full text-lg h-14 px-8 gap-3 group transition-all hover:scale-105" size="lg">
              Explorar Catálogo
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>

            <Button
              className="rounded-full text-lg h-14 px-8 shadow-none gap-3 hover:bg-secondary/50"
              size="lg"
              variant="ghost"
            >
              <CirclePlay className="size-6" />
              Conhecer a Marca
            </Button>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center group">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full scale-150" />

          <div className="relative animate-in fade-in zoom-in duration-1000">
            <div className="scale-100 md:scale-150 md:scale-[2] transition-transform duration-500 ease-out">
              <MiniLogo />
            </div>
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-center gap-4 lg:hidden w-full">
            <Button className="rounded-full w-full sm:w-auto h-12 px-6 gap-2" size="lg">
              Explorar Catálogo
            </Button>
            <Button className="rounded-full w-full sm:w-auto h-12 px-6 gap-2" size="lg" variant="outline">
              A Marca
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}