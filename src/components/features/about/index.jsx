"use client";

import {
  Sparkles,
  HeartHandshake,
  Leaf,
  Rocket,
  Camera,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Tamires",
    title: "Fundadora & CEO",
    bio: "Minha missão é transformar o crochê em peças modernas e cheias de personalidade.",
    imageUrl: "/about/ceo.jpeg",
  },
];

const Services4Content = () => {
  const services = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Estilo e Tendência",
      description:
        "Peças de crochê que unem moda contemporânea e autenticidade artesanal.",
      items: [
        "Lançamento de Coleções",
        "Crochê Instagramável",
        "Peças Versáteis",
      ],
    },
    {
      icon: <HeartHandshake className="h-5 w-5" />,
      title: "Comunidade",
      description:
        "Construção de uma comunidade forte, criativa e conectada ao feito à mão.",
      items: ["Interação nas Redes", "Experiência Personalizada"],
    },
    {
      icon: <Leaf className="h-5 w-5" />,
      title: "Sustentabilidade",
      description:
        "Valorização do artesanal com foco em consumo consciente e durabilidade.",
      items: ["Materiais de Qualidade", "Peças Duráveis"],
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Crescimento",
      description:
        "Expansão da marca com presença digital forte e identidade autêntica.",
      items: [],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h3 className="text-2xl md:text-3xl font-black tracking-tight">
         Objetivos
        </h3>
        <div className="h-px w-16 bg-primary/40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services.map((service, index) => (
          <div
            key={index}
            className="group relative rounded-2xl border bg-background/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-primary/10 p-3 text-primary transition-all group-hover:bg-primary group-hover:text-white">
                {service.icon}
              </div>

              <h4 className="text-lg font-bold">{service.title}</h4>
            </div>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {service.description}
            </p>

            {service.items.length > 0 && (
              <ul className="mt-5 space-y-2">
                {service.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TeamContent = () => {
  const member = teamMembers[0];

  return (
    <div className="flex flex-col gap-10">
      <div className="relative group mx-auto lg:mx-0 w-full max-w-sm">
        <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-transparent to-pink-300/20 blur-2xl opacity-60" />

        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border shadow-2xl">
          <Image
            src={member.imageUrl}
            alt={member.name}
            width={500}
            height={650}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="space-y-4 text-center lg:text-left">
        <h3 className="text-4xl md:text-5xl font-black tracking-tight">
          {member.name}
        </h3>

        <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">
          {member.title}
        </p>
        <Button
          variant="outline"
          className="mt-6 rounded-full gap-2 group"
          asChild
        >
        </Button>
      </div>
    </div>
  );
};

const CEOAndObjectives = () => {
  return (
    <section className="relative py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/30" />

      <div className="mb-20 text-center space-y-4">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          Sobre a Tam Artsy
        </span>

        <h2 className="text-4xl md:text-6xl font-black tracking-tight">
          Conheça a marca
        </h2>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-light leading-relaxed">
          Nascida de um hobby artesanal, hoje a Tam Artsy representa estilo, identidade e autenticidade.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
        <div className="lg:col-span-5 lg:sticky lg:top-16 h-fit">
          <TeamContent />
        </div>

        <div className="lg:col-span-7">
          <Services4Content />
        </div>
      </div>
    </section>
  );
};

export default CEOAndObjectives;