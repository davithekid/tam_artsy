"use client";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

// ─── dados ────────────────────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  {
    name: "Bolsa Eclipse Lunar",
    image: { src: "/purges/bolsa-duo.jpeg", alt: "Bolsa Eclipse Lunar" },
    link: "#",
    description: "Bolsa artesanal exclusiva com alça dupla regulável.",
    price: { regular: 499, sale: 399, currency: "BRL" },
    badge: "Mais vendida",
    category: "duo",
  },
  {
    name: "Bolsa Verão Artsy",
    image: { src: "/purges/bolsa-preta.png", alt: "Bolsa Verão Artsy" },
    link: "#",
    description: "Leve e estilosa pra qualquer look.",
    price: { regular: 320, currency: "BRL" },
    badge: "Nova",
    category: "baguete",
  },
  {
    name: "Bolsa Elegance",
    image: { src: "/purges/bolsa-baguete-batom.jpeg", alt: "Bolsa Elegance" },
    link: "#",
    description: "Modelo sofisticado com fechamento magnético.",
    price: { regular: 450, currency: "BRL" },
    category: "baguete",
  },
  {
    name: "Bolsa Summer Bag",
    image: { src: "/purges/bolsa-praia.png", alt: "Bolsa Summer Bag" },
    link: "#",
    description: "Perfeita pra praia ou passeio.",
    price: { regular: 280, currency: "BRL" },
    category: "todas",
  },
  {
    name: "Bolsa Urban Style",
    image: { src: "/purges/bolsa.jpeg", alt: "Bolsa Urban Style" },
    link: "#",
    description: "Estilo urbano moderno, comporta notebook.",
    price: { regular: 350, currency: "BRL" },
    badge: "Tendência",
    category: "duo",
  },
  {
    name: "Bolsa Mini Rose",
    image: { src: "/purges/bolsa-duo.jpeg", alt: "Bolsa Mini Rose" },
    link: "#",
    description: "Mini bolsa com alça corrente dourada.",
    price: { regular: 299, sale: 249, currency: "BRL" },
    badge: "Promoção",
    category: "baguete",
  },
];

const FEATURED = ALL_PRODUCTS.slice(0, 3);
const PAGE_SIZE = 4;

const FILTERS = [
  { label: "Todas", value: "todas" },
  { label: "Baguete", value: "baguete" },
  { label: "Duo", value: "duo" },
];

// ─── componente principal ─────────────────────────────────────────────────────
const Purge = ({ className }) => {
  const [activeFilter, setActiveFilter] = useState("todas");
  const [page, setPage] = useState(1);

  const filtered =
    activeFilter === "todas"
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === activeFilter);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (value) => {
    setActiveFilter(value);
    setPage(1);
  };

  return (
    <section className={cn("py-16 bg-background", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-16">

        {/* ── DESTAQUES ─────────────────────────────────────────────────────── */}
        <div>
          <div className="mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2 block">
              Coleção
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
              Em Destaque
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Peças selecionadas com muito amor pra você arrasar.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((item, i) => (
              <FeaturedCard key={i} {...item} featured={i === 0} />
            ))}
          </div>
        </div>

        {/* ── CATÁLOGO ──────────────────────────────────────────────────────── */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2 block">
                Catálogo
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Explore mais bolsas
              </h3>
            </div>

            {/* filtro pills */}
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => handleFilter(f.value)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
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

          {/* grid produtos */}
          {paginated.length === 0 ? (
            <p className="text-muted-foreground text-sm">Nenhuma bolsa encontrada.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginated.map((item, i) => (
                <ProductCard key={`pg-${i}`} {...item} />
              ))}
            </div>
          )}

          {/* ── PAGINAÇÃO ─────────────────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center gap-2 justify-center">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className={cn(
                  "w-9 h-9 rounded-full border text-sm font-medium transition-all",
                  page === 1
                    ? "border-border text-muted-foreground/40 cursor-not-allowed"
                    : "border-border text-foreground hover:bg-accent"
                )}
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={cn(
                    "w-9 h-9 rounded-full border text-sm font-medium transition-all",
                    n === page
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground hover:bg-accent"
                  )}
                >
                  {n}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className={cn(
                  "w-9 h-9 rounded-full border text-sm font-medium transition-all",
                  page === totalPages
                    ? "border-border text-muted-foreground/40 cursor-not-allowed"
                    : "border-border text-foreground hover:bg-accent"
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

// ─── card destaque ────────────────────────────────────────────────────────────
const FeaturedCard = ({ name, description, link, image, badge, price, featured }) => {
  const { regular, sale, currency } = price;

  return (
    <Link
      href={link}
      className={cn(
        "group block overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300",
        featured && "sm:col-span-2 lg:col-span-1"
      )}
    >
      <div className="relative overflow-hidden">
        <AspectRatio ratio={featured ? 0.9 : 1}>
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </AspectRatio>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {badge && (
          <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide bg-secondary text-secondary-foreground">
            {badge}
          </span>
        )}
      </div>

      <div className="p-4 space-y-1">
        <p className="text-sm font-semibold text-card-foreground leading-tight">{name}</p>
        <p className="text-xs text-muted-foreground leading-snug">{description}</p>
        <div className="pt-1">
          <Price onSale={sale != null} className="text-sm font-semibold">
            <PriceValue price={sale} currency={currency} variant="sale" />
            <PriceValue price={regular} currency={currency} variant="regular" />
          </Price>
        </div>
      </div>
    </Link>
  );
};

// ─── card catálogo ────────────────────────────────────────────────────────────
const ProductCard = ({ name, description, link, image, badge, price }) => {
  const { regular, sale, currency } = price;

  return (
    <Link
      href={link}
      className="group block overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative overflow-hidden">
        <AspectRatio ratio={1}>
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </AspectRatio>

        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />

        {badge && (
          <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide bg-secondary text-secondary-foreground">
            {badge}
          </span>
        )}
      </div>

      <div className="p-3.5 space-y-0.5">
        <p className="text-sm font-semibold text-card-foreground leading-tight">{name}</p>
        <p className="text-xs text-muted-foreground leading-snug line-clamp-1">{description}</p>
        <div className="pt-1">
          <Price onSale={sale != null} className="text-sm font-semibold">
            <PriceValue price={sale} currency={currency} variant="sale" />
            <PriceValue price={regular} currency={currency} variant="regular" />
          </Price>
        </div>
      </div>
    </Link>
  );
};

export { Purge };