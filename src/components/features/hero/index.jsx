import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MiniLogo } from "@/components/logo";

export default function Hero() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto grid w-full max-w-(--breakpoint-xl) gap-12 px-6 py-12 lg:grid-cols-2">
        <div>
          <Badge
            asChild
            className="rounded-full border-border py-1 px-3 text-xs font-semibold tracking-wide"
            variant="secondary"
          >
            <Link href="#" className="flex items-center gap-1">
              Desde 2025
              <ArrowUpRight className="size-3.5 opacity-70" />
            </Link>
          </Badge>

          <h1 className="mt-6 max-w-[17ch] font-satoshi font-bold text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Quem tem estilo, usa Tam Artsy.
          </h1>

          <p className="mt-6 max-w-[55ch] text-foreground/80 sm:text-lg leading-relaxed">
            Peças artesanais feitas à mão que unem estilo, autenticidade e personalidade.
            Descubra bolsas e acessórios únicos que elevam qualquer look.
          </p>

          <div className="mt-10 hidden lg:flex flex-wrap items-center gap-4">
            <Button className="rounded-full text-base px-6 gap-2 group" size="lg">
              Explorar Catálogo
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>

            <Button
              className="rounded-full text-base shadow-none gap-2"
              size="lg"
              variant="outline"
            >
              <CirclePlay className="size-5" />
              Conhecer a Marca
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
          <MiniLogo />

          <div className="flex flex-wrap items-center justify-center gap-4 lg:hidden">
            <Button className="rounded-full text-base px-6 gap-2 group" size="lg">
              Explorar Catálogo
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>

            <Button
              className="rounded-full text-base shadow-none gap-2"
              size="lg"
              variant="outline"
            >
              <CirclePlay className="size-5" />
              Conhecer a Marca
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}