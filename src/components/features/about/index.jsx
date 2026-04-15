"use client";
import { Sparkles, HeartHandshake, Leaf, Rocket, Camera, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    name: "Tamires",
    title: "Fundadora & CEO",
    bio: "Minha missão é transformar o crochê em peças modernas e cheias de personalidade.",
    imageUrl: "/fundadora.jpeg",
  },
];

const Services4Content = () => {
  const services = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Estilo e Tendência",
      description: "Peças de crochê que são tendências de moda, elevando o estilo autêntico com itens exclusivos e aesthetic.",
      items: ["Lançamento de Coleções", "Crochê Instagramável", "Peças Versáteis"],
    },
    {
      icon: <HeartHandshake className="h-5 w-5" />,
      title: "Conexão e Comunidade",
      description: "Construir uma comunidade engajada, promovendo a valorização do feito à mão entre os jovens.",
      items: ["Interação nas Redes", "Experiência Personalizada"],
    },
    {
      icon: <Leaf className="h-5 w-5" />,
      title: "Valorização do Artesanal",
      description: "Destacar o processo artesanal, a sustentabilidade e a qualidade única do crochê para um consumo consciente.",
      items: ["Materiais de Qualidade", "Peças Duráveis"],
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Crescimento de Marca",
      description: "Expandir o alcance da marca no mercado, garantindo uma presença digital forte, autêntica e eficiente.",
      items: [],
    },
  ];

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold tracking-tight border-b pb-4">
        Nossos Objetivos
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="group border border-border p-6 rounded-2xl transition-all hover:bg-muted/10 space-y-4"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary rounded-xl p-2.5 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {service.icon}
              </div>
              <h4 className="text-lg font-bold leading-tight">{service.title}</h4>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {service.description}
            </p>
            {service.items.length > 0 && (
              <ul className="grid grid-cols-1 gap-2 pt-2">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground/90">
                    <div className="h-1 w-1 rounded-full bg-primary" />
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
    <div className="flex flex-col gap-8">
      <div className="relative group w-full max-w-sm mx-auto lg:mx-0">
        <div className="absolute -inset-3 border border-border rounded-[2rem] -z-10 transition-transform" />
        <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-2xl">
          <Image
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 "
            width={400}
            height={500}
          />
        </div>
      </div>

      <div className="space-y-4 text-center lg:text-left">
        <div className="space-y-1">
          <h3 className="text-4xl font-black tracking-tighter">{member.name}</h3>
          <p className="text-primary font-bold uppercase tracking-widest text-sm italic">{member.title}</p>
        </div>
        <p className="text-lg text-muted-foreground font-light leading-relaxed">
          "{member.bio}"
        </p>
        <div className="pt-4">
          <Button variant="outline" className="rounded-full gap-2 group" asChild>
            <Link href="https://instagram.com/tam.artsy" target="_blank">
              <Camera className="size-4" />
              Siga nossa jornada
              <ArrowRight className="size-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const CEOAndObjectives = () => {
  return (
    <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-20 space-y-4">
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em]">
          Sobre a Tam Artsy
        </span>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter max-w-2xl">
          Conheça Sobre
        </h2>
        <p className="max-w-xl text-lg text-muted-foreground font-light leading-relaxed">
          Nascido de um simples hobby, hoje eu amo fazer outras pessoas estilosas e autenticas.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
        <div className="lg:col-span-5 lg:sticky lg:top-12 h-fit">
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