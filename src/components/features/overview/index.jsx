"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Truck,
  ShieldCheck,
  Camera,
  ChevronRight,
  Ruler,
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

  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.scrollTo(selectedImage);

    const onSelect = () => {
      setSelectedImage(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);

    return () => carouselApi.off("select", onSelect);
  }, [carouselApi, selectedImage]);
  const priceValue = product.price?.sale ?? product.price?.regular ?? 0;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
            {product.images?.length > 1 ? (
              <Carousel setApi={setCarouselApi}>
                <CarouselContent>
                  {product.images.map((img, index) => (
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
                src={product.images?.[0]}
                alt={product.title}
                className="aspect-[4/5] w-full object-cover"
              />
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2",
                    selectedImage === index
                      ? "border-zinc-900"
                      : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tighter lg:text-5xl">
              {product.title}
            </h1>

            <p className="text-lg text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="flex items-baseline gap-4 rounded-3xl p-6 border bg-muted">
            <span className="text-sm text-muted-foreground">Valor</span>

            <div className="text-4xl font-black">
              R$ {priceValue.toFixed(2).replace(".", ",")}
            </div>
          </div>

          {product.colors && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest">
                Cores Disponíveis
              </h3>

              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className="rounded-full border px-4 py-1 text-sm hover:bg-black hover:text-white transition"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.details && (
            <div className="rounded-3xl border p-6 space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                <Ruler className="size-4" /> Detalhes
              </h3>

              <div className="grid grid-cols-2 gap-y-4 text-sm">
                {product.details.map((item, i) => (
                  <div key={i} className="contents">
                    <div className="text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="text-right font-bold">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.features && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {product.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-2xl p-4 border"
                >
                  <div className="rounded-full bg-white p-2 shadow-sm">
                    {i === 0 ? (
                      <Truck className="h-5 w-5" />
                    ) : (
                      <ShieldCheck className="h-5 w-5" />
                    )}
                  </div>

                  <span className="text-xs font-bold uppercase">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          )}

          <Button
            asChild
            size="lg"
            className="h-16 w-full rounded-2xl text-lg font-bold"
          >
            <Link
              href="https://www.instagram.com/tam.artsy/"
              target="_blank"
              className="flex items-center justify-center gap-3"
            >
              <Camera className="size-6" />
              Pedir pelo Instagram
              <ChevronRight className="size-5 opacity-50" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;