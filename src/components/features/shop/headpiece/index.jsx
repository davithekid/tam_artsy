"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { headpieces } from "@/lib/headpieces";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";

const ALL_HEAD = headpieces.filter((p) => p.category === "headpieces" || p.category === "mais vendidos");
const FEATURED_HEAD = ALL_HEAD.filter(p => p.featured).slice(0, 3);
const PAGE_SIZE = 4;

const FILTERS = [
  { label: "Todos", value: "todas" },
  { label: "Mais Vendidos", value: "mais vendidos" },
  { label: "Festival", value: "festival" },
];

const HeadpieceShop = ({ className }) => {
  const [activeFilter, setActiveFilter] = useState("todas");
  const [page, setPage] = useState(1);
  const [apiFeatured, setApiFeatured] = useState();
  const [progressFeatured, setProgressFeatured] = useState(0);
  const [apiCatalog, setApiCatalog] = useState();
  const [progressCatalog, setProgressCatalog] = useState(0);

  useEffect(() => {
    if (!apiFeatured) return;
    const update = () => {
      const current = apiFeatured.selectedScrollSnap() + 1;
      const total = apiFeatured.scrollSnapList().length;
      setProgressFeatured((current / total) * 100);
    };
    update();
    apiFeatured.on("select", update);
    return () => apiFeatured.off("select", update);
  }, [apiFeatured]);

  useEffect(() => {
    if (!apiCatalog) return;
    const update = () => {
      const current = apiCatalog.selectedScrollSnap() + 1;
      const total = apiCatalog.scrollSnapList().length;
      setProgressCatalog((current / total) * 100);
    };
    update();
    apiCatalog.on("select", update);
    return () => apiCatalog.off("select", update);
  }, [apiCatalog, activeFilter]);

  const filtered = activeFilter === "todas"
    ? ALL_HEAD
    : ALL_HEAD.filter((p) => p.category === activeFilter || p.tags?.includes(activeFilter));

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (value) => {
    setActiveFilter(value);
    setPage(1);
  };

  return (
    <section className={cn("py-24 bg-background", className)}>
      <div className="mx-auto max-w-7xl px-6 space-y-24">
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic leading-none">
              Destaques
            </h2>
          </div>

          <div className="hidden sm:grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            {FEATURED_HEAD.map((item) => (
              <HeadFeaturedCard key={item.id} {...item} />
            ))}
          </div>

          <div className="sm:hidden space-y-8">
            <Carousel setApi={setApiFeatured} className="w-full">
              <CarouselContent>
                {FEATURED_HEAD.map((item) => (
                  <CarouselItem key={item.id} className="basis-[90%] pl-4">
                    <HeadFeaturedCard {...item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="flex justify-center px-12">
              <Progress value={progressFeatured} className="h-1 w-full bg-secondary" />
            </div>
          </div>
        </div>
        <div className="pt-16 border-t border-border/40">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/60">
                Coleção de Cabeça
              </span>
              <h3 className="text-3xl font-bold tracking-tight">Explore o Acervo</h3>
            </div>

            <div className="flex gap-1 bg-secondary/30 p-1 rounded-full w-fit">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => handleFilter(f.value)}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300",
                    activeFilter === f.value
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center border rounded-3xl border-dashed">
              <p className="text-muted-foreground italic">Nenhuma peça encontrada.</p>
            </div>
          ) : (
            <>
              <div className="hidden sm:block space-y-12">
                <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {paginated.map((item) => (
                    <HeadProductCard key={item.id} {...item} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="mt-20 flex items-center justify-center gap-4">
                    <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="p-2 disabled:opacity-20">←</button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <button
                          key={n}
                          onClick={() => setPage(n)}
                          className={cn(
                            "w-2 h-2 rounded-full transition-all duration-500",
                            n === page ? "w-8 bg-primary" : "bg-muted-foreground/30"
                          )}
                        />
                      ))}
                    </div>
                    <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="p-2 disabled:opacity-20">→</button>
                  </div>
                )}
              </div>

              <div className="sm:hidden space-y-8">
                <Carousel setApi={setApiCatalog} className="w-full">
                  <CarouselContent>
                    {filtered.map((item) => (
                      <CarouselItem key={item.id} className="basis-[85%] pl-4">
                        <HeadProductCard {...item} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="flex justify-center px-12">
                  <Progress value={progressCatalog} className="h-1 w-full bg-secondary" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
const HeadFeaturedCard = ({ title, description, slug, images, price, tags }) => {
  const regular = price?.regular ?? 0;
  const sale = price?.sale ?? null;

  return (
    <Link href={`/headpieces/${slug}`} className="group block space-y-4">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-secondary/10">
        <AspectRatio ratio={0.85}>
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </AspectRatio>
        {tags?.[0] && (
          <span className="absolute top-6 left-6 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-background/90 backdrop-blur">
            {tags[0]}
          </span>
        )}
      </div>

      <div className="px-2">
        <h3 className="text-xl font-bold tracking-tight group-hover:underline decoration-1 underline-offset-4 italic">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mt-1">
          {description}
        </p>
        <div className="pt-3">
          <Price onSale={sale != null} className="gap-3">
            <PriceValue price={sale} currency={price.currency} variant="sale" className="text-lg font-bold" />
            <PriceValue price={regular} currency={price.currency} variant="regular" className="text-sm opacity-50" />
          </Price>
        </div>
      </div>
    </Link>
  );
};

const HeadProductCard = ({ title, slug, images, price }) => {
  return (
    <Link href={`/headpieces/${slug}`} className="group block space-y-3">
      <div className="relative overflow-hidden rounded-2xl bg-secondary/10">
        <AspectRatio ratio={1}>
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
        </AspectRatio>
      </div>
      <div className="space-y-1">
        <h4 className="font-bold text-sm tracking-tight uppercase leading-none">{title}</h4>
        <Price onSale={price?.sale != null} className="gap-2 pt-1">
          <PriceValue price={price?.sale} currency={price?.currency} variant="sale" className="font-bold text-xs" />
          <PriceValue price={price?.regular} currency={price?.currency} variant="regular" className="text-[10px] opacity-40" />
        </Price>
      </div>
    </Link>
  );
};

export { HeadpieceShop };