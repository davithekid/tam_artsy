"use client";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/purges";

const ALL_PRODUCTS = products.filter((p) => p.category === "bolsas");
const FEATURED = ALL_PRODUCTS.slice(0, 3);
const PAGE_SIZE = 4;

const FILTERS = [
  { label: "Todas", value: "todas" },
  { label: "Baguete", value: "baguete" },
  { label: "Duo", value: "duo" },
];

const Purge = ({ className }) => {
  const [activeFilter, setActiveFilter] = useState("todas");
  const [page, setPage] = useState(1);

  const filtered =
    activeFilter === "todas"
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.tags?.includes(activeFilter));

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

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((item, i) => (
              <FeaturedCard key={item.id} {...item} />
            ))}
          </div>
        </div>

        <div className="pt-16 border-t border-border/40">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/60">
                Catálogo Completo
              </span>
              <h3 className="text-3xl font-bold tracking-tight">Explore a Coleção</h3>
            </div>

            <div className="flex gap-1 bg-secondary/30 p-1 rounded-full w-fit">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => handleFilter(f.value)}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300",
                    activeFilter === f.value
                      ? "bg-background text-foreground shadow-sm scale-100"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50 scale-95"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {paginated.length === 0 ? (
            <div className="py-20 text-center border rounded-3xl border-dashed">
              <p className="text-muted-foreground italic">Nenhuma peça encontrada nesta categoria.</p>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginated.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-20 flex items-center justify-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 disabled:opacity-20 transition-all hover:translate-x-[-4px]"
              >
                ←
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-500",
                      n === page ? "w-8 bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 disabled:opacity-20 transition-all hover:translate-x-[4px]"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const FeaturedCard = ({ title, description, slug, images, price, tags }) => {
  const { regular, sale, currency } = price;

  return (
    <Link href={`/bolsas/${slug}`} className="group block space-y-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-secondary/10">
        <AspectRatio ratio={0.85}>
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </AspectRatio>
        
        {tags?.[0] && (
          <span className="absolute top-6 left-6 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-background/90 backdrop-blur shadow-sm">
            {tags[0]}
          </span>
        )}
      </div>

      <div className="px-2">
        <h3 className="text-xl font-bold tracking-tight group-hover:underline decoration-1 underline-offset-4">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{description}</p>
        <div className="pt-2">
          <Price onSale={sale != null} className="gap-3">
            <PriceValue price={sale} currency={currency} variant="sale" className="text-lg font-bold" />
            <PriceValue price={regular} currency={currency} variant="regular" className="text-sm opacity-50" />
          </Price>
        </div>
      </div>
    </Link>
  );
};

const ProductCard = ({ title, slug, images, price }) => {
  const { regular, sale, currency } = price;

  return (
    <Link href={`/bolsas/${slug}`} className="group block space-y-3">
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
        <h4 className="font-bold text-sm tracking-tight uppercase">{title}</h4>
        <Price onSale={sale != null} className="gap-2">
          <PriceValue price={sale} currency={currency} variant="sale" className="font-bold text-xs" />
          <PriceValue price={regular} currency={currency} variant="regular" className="text-[10px] opacity-40" />
        </Price>
      </div>
    </Link>
  );
};

export { Purge };