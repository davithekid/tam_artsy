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

  // 2. EXTRAÇÃO SEGURA DOS DADOS
  const priceValue = product.price?.sale ?? product.price?.regular ?? 0;
  const colors = product.variants?.color ?? [];
  const sizes = product.variants?.sizes ?? [];
  const images = product.images ?? []; // Garante que images seja ao menos um array vazio

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
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
        
        {/* COLUNA ESQUERDA: IMAGENS */}
        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-50 border shadow-sm">
            {/* Agora usamos a variável 'images' que garantimos ser um array */}
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
                src={images[0]} // Se não houver imagem, images[0] será undefined mas não quebrará o length
                alt={product.title}
                className="aspect-[4/5] w-full object-cover"
              />
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all",
                    selectedImage === index
                      ? "border-zinc-900 scale-95"
                      : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* COLUNA DIREITA: INFO */}
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tighter lg:text-6xl italic">
              {product.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-baseline gap-4 rounded-[2rem] p-6 border bg-secondary/20">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Valor</span>
            <div className="text-4xl font-black tracking-tighter">
              R$ {priceValue.toFixed(2).replace(".", ",")}
            </div>
          </div>

          {/* VARIANTES */}
          <div className="space-y-6">
            {sizes.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Tamanhos Disponíveis
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <div
                      key={size}
                      className="flex h-10 w-12 items-center justify-center rounded-xl border-2 border-zinc-200 font-bold text-sm"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {colors.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Cores Disponíveis
                </h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <span
                      key={color}
                      className="rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-zinc-100"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* FICHA TÉCNICA */}
          {details.length > 0 && (
            <div className="rounded-[2rem] border p-8 space-y-6 bg-white/50 backdrop-blur-sm">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">
                <Info className="size-4" />
                Ficha Técnica
              </h3>
              <div className="grid grid-cols-1 gap-y-4">
                {details.map((item, i) => (
                  <div key={i} className="flex justify-between border-b border-zinc-100 pb-2 text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOTÃO */}
          <Button
            asChild
            size="lg"
            className="h-16 w-full rounded-2xl text-lg font-bold shadow-xl"
          >
            <Link
              href="https://www.instagram.com/tam.artsy/"
              target="_blank"
              className="flex items-center justify-center gap-3"
            >
              <Camera className="size-6" />
              Encomendar via Direct
              <ChevronRight className="size-5 opacity-50" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;