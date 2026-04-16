"use client";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { unissexs } from "@/lib/unissex"; // Importando dados unissex

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
        
        {/* ── DESTAQUES ── */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-3">
              Genderless Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic leading-none">
              Unissex
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            {FEATURED_UNISSEX.map((item) => (
              <UnissexCard key={item.id} item={item} isFeatured />
            ))}
          </div>
        </div>

        {/* ── CATÁLOGO ── */}
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

          {paginated.length === 0 ? (
            <div className="py-20 text-center border rounded-3xl border-dashed">
              <p className="text-muted-foreground italic">Nenhuma peça encontrada.</p>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginated.map((item) => (
                <UnissexCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ── CARD UNIFICADO (Se adapta se for destaque ou não) ──
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