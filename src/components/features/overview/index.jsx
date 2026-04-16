"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Camera,
  ChevronRight,
  Info,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";

const ProductOverview = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [carouselApi, setCarouselApi] = useState();

  if (!product) {
    return (
      <div className="flex h-96 items-center justify-center italic text-muted-foreground">
        Carregando detalhes do produto...
      </div>
    );
  }

  useEffect(() => {
    if (!carouselApi || !product?.images) return;
    carouselApi.scrollTo(selectedImage);
    const onSelect = () => setSelectedImage(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    return () => carouselApi.off("select", onSelect);
  }, [carouselApi, selectedImage, product]);

  const priceValue = product.price?.sale ?? product.price?.regular ?? 0;
  const colors = product.variants?.color ?? [];
  const sizes = product.variants?.sizes ?? [];
  const images = product.images ?? [];

  function formatLabel(key) {
    const map = {
      material: "Material",
      tamanho: "Dimensões",
      alca: "Altura da Alça",
      tecnica: "Técnica",
      estilo: "Estilo",
    };
    return map[key] ?? key;
  }

  const details = product.specs
    ? Object.entries(product.specs).map(([key, value]) => ({
        label: formatLabel(key),
        value,
      }))
    : [];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-3xl border bg-muted/30">
            {images.length > 1 ? (
              <Carousel setApi={setCarouselApi}>
                <CarouselContent>
                  {images.map((img, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={img}
                        alt={product.title}
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <img
                src={images[0]}
                alt={product.title}
                className="aspect-[4/5] w-full object-cover"
              />
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border transition-all",
                    selectedImage === index
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8">
          
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              {product.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-baseline gap-4 rounded-2xl p-5 border bg-muted/40">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Valor
            </span>
            <div className="text-3xl sm:text-4xl font-black">
              R$ {priceValue.toFixed(2).replace(".", ",")}
            </div>
          </div>

          <div className="space-y-6">
            {sizes.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Tamanhos Disponíveis
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <div
                      key={size}
                      className="flex h-10 w-12 items-center justify-center rounded-lg border border-border bg-background text-sm font-semibold"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {colors.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Cores Disponíveis
                </h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <span
                      key={color}
                      className="rounded-full border border-border px-3 py-1 text-xs font-semibold bg-muted"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {details.length > 0 && (
            <div className="rounded-2xl border bg-muted/30 p-6 space-y-4">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <Info className="size-4" />
                Ficha Técnica
              </h3>

              <div className="space-y-3">
                {details.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b border-border pb-2 text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="font-semibold">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            asChild
            size="lg"
            className="h-14 w-full rounded-xl text-base font-semibold"
          >
            <Link
              href="https://www.instagram.com/tam.artsy/"
              target="_blank"
              className="flex items-center justify-center gap-2"
            >
              <Camera className="size-5" />
              Encomendar via Direct
              <ChevronRight className="size-4 opacity-70" />
            </Link>
          </Button>

        </div>
      </div>
    </section>
  );
};

export default ProductOverview;