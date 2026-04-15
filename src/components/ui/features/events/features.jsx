"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const features = [
  {
    category: "Eventos",
    title: "Carnaval",
    details:
      "Peças vibrantes e cheias de personalidade para você brilhar nos blocos e festas.",
    tutorialLink: "#",
   image: "/features/copa-do-mundo.jpeg",
  },
  {
    category: "Eventos",
    title: "Dia dos Namorados",
    details:
      "Looks delicados e românticos perfeitos para momentos especiais a dois.",
    tutorialLink: "#",
    image: "/features/copa-do-mundo.jpeg",
  },
  {
    category: "Eventos",
    title: "Copa do Mundo",
    details:
      "Estilo e conforto para torcer com autenticidade em todos os jogos.",
    tutorialLink: "#",
    image: "/features/copa-do-mundo.jpeg",
  },
];

const Features = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[1100px] px-6 py-10">

        {/* Título */}
        <h2 className="text-pretty text-center font-semibold text-4xl tracking-tight md:text-[2.75rem]">
          Events by Tam Artsy
        </h2>

        <p className="mt-3 text-center text-lg text-muted-foreground md:text-xl">
          Coleções pensadas para cada momento especial.
        </p>

        {/* Lista */}
        <div className="mx-auto mt-12 w-full space-y-20">

          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex flex-col items-center gap-x-12 gap-y-6 md:flex-row md:even:flex-row-reverse"
            >
              
              {/* IMAGEM */}
              <div className="relative aspect-[14/9] w-full flex-1 basis-1/2 overflow-hidden rounded-xl border border-border/50">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* TEXTO */}
              <div className="flex flex-1 basis-1/2 flex-col items-start">
                
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {feature.category}
                </span>

                <h4 className="mt-3 mb-2 font-semibold text-2xl tracking-tight md:text-[1.75rem]">
                  {feature.title}
                </h4>

                <p className="mb-6 text-lg text-muted-foreground">
                  {feature.details}
                </p>

                <Button asChild>
                  <Link href={feature.tutorialLink}>
                    Ver coleção <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Features;