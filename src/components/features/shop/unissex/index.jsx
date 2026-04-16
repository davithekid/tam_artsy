"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { unissexs } from "@/lib/unissex";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";

const ALL_UNISSEX = unissexs;
const FEATURED_UNISSEX = ALL_UNISSEX.filter(p => p.featured).slice(0, 3);
const PAGE_SIZE = 4;

const FILTERS = [
  { label: "Todos", value: "todas" },
  { label: "Mais Vendidos", value: "mais vendidos" },
  { label: "Bags", value: "shoulder-bag" },
];

const UnissexShop = ({ className }) => {
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
    ? ALL_UNISSEX
    : ALL_UNISSEX.filter((p) => p.tags?.includes(activeFilter));

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
            {FEATURED_UNISSEX.map((item) => (
              <UnissexCard key={item.id} item={item} isFeatured />
            ))}
          </div>

          <div className="sm:hidden space-y-8">
            <Carousel setApi={setApiFeatured} className="w-full">
              <CarouselContent>
                {FEATURED_UNISSEX.map((item) => (
                  <CarouselItem key={item.id} className="basis-[90%] pl-4">
                    <UnissexCard item={item} isFeatured />
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
                Peças Versáteis
              </span>
              <h3 className="text-3xl font-bold tracking-tight">Linha Street</h3>
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
                    <UnissexCard key={item.id} item={item} />
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
                        <UnissexCard item={item} />
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

const UnissexCard = ({ item, isFeatured = false }) => {
  const { title, slug, images, price, tags, description } = item;
  const regular = price?.regular ?? 0;
  const sale = price?.sale ?? null;

  return (
    <Link href={`/unissex/${slug}`} className="group block space-y-4">
      <div className={cn(
        "relative overflow-hidden bg-secondary/10 transition-all duration-500",
        isFeatured ? "rounded-[2.5rem]" : "rounded-2xl"
      )}>
        <AspectRatio ratio={isFeatured ? 0.85 : 1}>
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </AspectRatio>
        {isFeatured && tags?.[0] && (
          <span className="absolute top-6 left-6 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-background/90 backdrop-blur shadow-sm">
            {tags[0]}
          </span>
        )}
      </div>

      <div className={cn("space-y-1", isFeatured ? "px-2" : "")}>
        <h3 className={cn(
          "font-bold tracking-tight group-hover:underline decoration-1 underline-offset-4",
          isFeatured ? "text-xl italic" : "text-sm uppercase"
        )}>
          {title}
        </h3>
        
        {isFeatured && description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mt-1">
            {description}
          </p>
        )}

        <Price onSale={sale != null} className="gap-2 pt-1">
          <PriceValue 
            price={sale} 
            currency={price?.currency} 
            variant="sale" 
            className={isFeatured ? "text-lg font-bold" : "font-bold text-xs"} 
          />
          <PriceValue 
            price={regular} 
            currency={price?.currency} 
            variant="regular" 
            className={isFeatured ? "text-sm opacity-50" : "text-[10px] opacity-40"} 
          />
        </Price>
      </div>
    </Link>
  );
};

export { UnissexShop };