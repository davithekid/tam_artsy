import { Asterisk, ArrowRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const Operation = () => {
  const process = [
    {
      title: "Navegue pela coleção",
      description:
        "Explore nossas peças de crochê feitas à mão. Cada item é único, acompanhado de detalhes que revelam o carinho de cada ponto produzido.",
    },
    {
      title: "Peça via Instagram",
      description:
        "Gostou de algo? Clique no link de contato para falar diretamente comigo. Tire dúvidas sobre cores, tamanhos e personalize sua encomenda.",
    },
    {
      title: "Receba com carinho",
      description:
        "Preparamos sua embalagem com todo o cuidado para que a experiência de receber uma peça Tam Artsy seja tão especial quanto a própria peça.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-6 lg:gap-24">
        <div className="lg:col-span-2 lg:sticky lg:top-24 h-fit space-y-6">
          <div className="relative w-fit">
            <h2 className="text-5xl font-black tracking-tighter md:text-6xl lg:text-7xl">
              Como <br /> funciona
            </h2>
            <Asterisk
              className="absolute -right-6 -top-2 size-8 text-primary animate-spin-slow" 
            />
          </div>
          <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-[20ch]">
            Três passos simples para ter sua peça exclusiva em mãos.
          </p>
        </div>

        <ul className="col-span-1 lg:col-span-4 flex flex-col">
          {process.map((step, index) => (
            <li
              key={index}
              className="group relative flex flex-col gap-8 border-t border-border py-12 md:flex-row md:items-start transition-all hover:bg-muted/5 px-4 rounded-b-xl"
            >
              <div
                className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-xl font-black tracking-tighter group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm"
              >
                0{index + 1}
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight lg:text-3xl flex items-center gap-3">
                  {step.title}
                  <ArrowRight className="size-5 opacity-0 -translate-x-4 transition-all group-hover:opacity-30 group-hover:translate-x-0" />
                </h3>
                <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-2xl">
                  {step.description}
                </p>
              </div>

              <CustomIllustration className="absolute right-6 top-10 opacity-10 group-hover:opacity-100 transition-opacity" />
            </li>
          ))}
          <div className="border-t border-border" />
        </ul>
      </div>
    </section>
  );
};

const CustomIllustration = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("text-primary", className)}
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export { Operation };