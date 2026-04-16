"use client";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/products";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const ALL_PRODUCTS = products.filter((p) => p.category === "bolsas");

const FEATURED = ALL_PRODUCTS.slice(0, 3);
const PAGE_SIZE = 4;

const FILTERS = [
  { label: "Todas", value: "todas" },
  { label: "Baguete", value: "baguete" },
  { label: "Duo", value: "duo" },
];

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────
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
    <section className={cn("py-16 bg-background", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-16">

        {/* ── DESTAQUES ── */}
        <div>
          <div className="mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground block mb-2">
              Coleção
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Em Destaque
            </h2>

            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Peças selecionadas com muito amor pra você arrasar.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((item, i) => (
              <FeaturedCard key={item.id} {...item} featured={i === 0} />
            ))}
          </div>
        </div>

        {/* ── CATÁLOGO ── */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground block mb-2">
                Catálogo
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Explore mais bolsas
              </h3>
            </div>

            {/* filtros */}
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => handleFilter(f.value)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
                    activeFilter === f.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* grid */}
          {paginated.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Nenhuma bolsa encontrada.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginated.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          )}

          {/* paginação */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center gap-2 justify-center">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className={cn(
                  "w-9 h-9 rounded-full border",
                  page === 1
                    ? "text-muted-foreground/40"
                    : "hover:bg-accent"
                )}
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={cn(
                    "w-9 h-9 rounded-full border",
                    n === page
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-accent"
                  )}
                >
                  {n}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className={cn(
                  "w-9 h-9 rounded-full border",
                  page === totalPages
                    ? "text-muted-foreground/40"
                    : "hover:bg-accent"
                )}
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

//
// ─── FEATURED CARD ─────────────────────────────────────────────────────────
//
const FeaturedCard = ({ title, description, slug, images, price, tags, featured }) => {
  const { regular, sale, currency } = price;

  return (
    <Link
      href={`/bolsas/${slug}`}
      className={cn(
        "group block overflow-hidden rounded-xl bg-card border shadow-sm hover:shadow-md",
        featured && "sm:col-span-2 lg:col-span-1"
      )}
    >
      <div className="relative overflow-hidden">
        <AspectRatio ratio={featured ? 0.9 : 1}>
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        </AspectRatio>

        {tags?.[0] && (
          <span className="absolute top-3 left-3 text-[11px] px-2 py-1 rounded-full bg-secondary">
            {tags[0]}
          </span>
        )}
      </div>

      <div className="p-4 space-y-1">
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>

        <Price onSale={sale != null}>
          <PriceValue price={sale} currency={currency} variant="sale" />
          <PriceValue price={regular} currency={currency} variant="regular" />
        </Price>
      </div>
    </Link>
  );
};

//
// ─── PRODUCT CARD ─────────────────────────────────────────────────────────
//
const ProductCard = ({ title, description, slug, images, price, tags }) => {
  const { regular, sale, currency } = price;

  return (
    <Link
      href={`/bolsas/${slug}`}
      className="group block overflow-hidden rounded-xl bg-card border shadow-sm hover:shadow-md"
    >
      <AspectRatio ratio={1}>
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      </AspectRatio>

      <div className="p-3 space-y-1">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {description}
        </p>

        <Price onSale={sale != null}>
          <PriceValue price={sale} currency={currency} variant="sale" />
          <PriceValue price={regular} currency={currency} variant="regular" />
        </Price>
      </div>
    </Link>
  );
};

export { Purge };