"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { tops } from "@/lib/tops";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";

const ALL_TOPS = tops.filter((p) => p.category === "tops");
const FEATURED_TOPS = ALL_TOPS.filter(p => p.featured).slice(0, 3);
const PAGE_SIZE = 4;

const FILTERS = [
  { label: "Todos", value: "todas" },
  { label: "Crochê", value: "crochê" },
  { label: "Lançamentos", value: "lançamento" },
];

const TopShop = ({ className }) => {
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
    ? ALL_TOPS
    : ALL_TOPS.filter((p) => p.tags?.includes(activeFilter));

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
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic">
              Destaques
            </h2>
          </div>
          <div className="hidden sm:grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_TOPS.map((item) => (
              <TopFeaturedCard key={item.id} {...item} />
            ))}
          </div>
          <div className="sm:hidden space-y-8">
            <Carousel setApi={setApiFeatured} className="w-full">
              <CarouselContent>
                {FEATURED_TOPS.map((item) => (
                  <CarouselItem key={item.id} className="basis-[90%] pl-4">
                    <TopFeaturedCard {...item} />
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
                Linha de Vestuário
              </span>
              <h3 className="text-3xl font-bold tracking-tight">Explore os Tops</h3>
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
              <p className="text-muted-foreground italic">Nenhum top encontrado.</p>
            </div>
          ) : (
            <>
              <div className="hidden sm:block space-y-12">
                <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {paginated.map((item) => (
                    <TopProductCard key={item.id} {...item} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="mt-20 flex items-center justify-center gap-4">
                    <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="p-2 disabled:opacity-20 transition-all hover:translate-x-[-4px]">←</button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <button key={n} onClick={() => setPage(n)} className={cn("w-2 h-2 rounded-full transition-all duration-500", n === page ? "w-8 bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground")} />
                      ))}
                    </div>
                    <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="p-2 disabled:opacity-20 transition-all hover:translate-x-[4px]">→</button>
                  </div>
                )}
              </div>
              <div className="sm:hidden space-y-8">
                <Carousel setApi={setApiCatalog} className="w-full">
                  <CarouselContent>
                    {filtered.map((item) => (
                      <CarouselItem key={item.id} className="basis-[85%] pl-4">
                        <TopProductCard {...item} />
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

const TopFeaturedCard = ({ title, description, slug, images, price, tags, variants }) => {
  const { regular, sale, currency } = price;
  return (
    <Link href={`/tops/${slug}`} className="group block space-y-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-secondary/10">
        <AspectRatio ratio={0.8}>
          <img src={images[0]} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        </AspectRatio>
        {tags?.[0] && <span className="absolute top-6 left-6 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-background/90 backdrop-blur shadow-sm">{tags[0]}</span>}
      </div>
      <div className="px-2 space-y-2">
        <h3 className="text-xl font-bold tracking-tight italic group-hover:underline">{title}</h3>
        <div className="flex gap-1.5">
          {variants?.sizes?.map(size => (
            <span key={size} className="text-[9px] font-bold border border-border/60 px-1.5 py-0.5 rounded text-muted-foreground">{size}</span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="pt-2 border-t border-border/40">
          <Price onSale={sale != null} className="gap-3">
            <PriceValue price={sale} currency={currency} variant="sale" className="text-lg font-bold" />
            <PriceValue price={regular} currency={currency} variant="regular" className="text-sm opacity-50" />
          </Price>
        </div>
      </div>
    </Link>
  );
};

const TopProductCard = ({ title, slug, images, price, variants }) => {
  const { regular, sale, currency } = price;
  return (
    <Link href={`/tops/${slug}`} className="group block space-y-3">
      <div className="relative overflow-hidden rounded-2xl bg-secondary/10">
        <AspectRatio ratio={0.8}>
          <img src={images[0]} alt={title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
        </AspectRatio>
      </div>
      <div className="space-y-1">
        <h4 className="font-bold text-sm tracking-tight uppercase">{title}</h4>
        <div className="flex gap-1">
          {variants?.sizes?.map(size => (
            <span key={size} className="text-[8px] font-bold text-muted-foreground/60 uppercase">{size}</span>
          ))}
        </div>
        <Price onSale={sale != null} className="gap-2 pt-1">
          <PriceValue price={sale} currency={currency} variant="sale" className="font-bold text-xs" />
          <PriceValue price={regular} currency={currency} variant="regular" className="text-[10px] opacity-40" />
        </Price>
      </div>
    </Link>
  );
};

export { TopShop };