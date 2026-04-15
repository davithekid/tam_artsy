import { Button } from "@/components/ui/button";
import { Camera, ArrowRight } from "lucide-react";
import Link from "next/link";

const CTA = ({
  heading = "Gostou de alguma peça?",
  description = "Nossas peças são artesanais e exclusivas. Entre em contato via Camera para consultar cores disponíveis ou fazer sua encomenda personalizada!",
  buttons = {
    primary: {
      text: "Chamar no Direct",
      url: "https://www.instagram.com/tam.artsy/", 
    },
  },
}) => {
  return (
    <section className="px-6 py-4">
      <div className="relative overflow-hidden rounded-[2.5rem] border bg-accent/50 px-8 py-12 md:px-16 md:py-20">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative flex flex-col items-center justify-between gap-10 lg:flex-row lg:text-left text-center">
          <div className="flex-1 space-y-4">
            <h3 className="text-3xl font-black tracking-tighter md:text-5xl">
              {heading}
            </h3>
            <p className="mx-auto max-w-xl text-muted-foreground md:text-lg font-light leading-relaxed lg:mx-0">
              {description}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            {buttons.primary && (
              <Button 
                asChild 
                size="lg" 
                className="h-16 rounded-2xl px-8 text-lg font-bold shadow-xl shadow-primary/10 transition-all hover:scale-105 active:scale-95"
              >
                <Link href={buttons.primary.url} target="_blank" className="flex items-center gap-3">
                  <Camera className="size-5" />
                  {buttons.primary.text}
                  <ArrowRight className="size-4 opacity-50" />
                </Link>
              </Button>
            )}
            
            {buttons.secondary && (
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="h-16 rounded-2xl border-2 px-8 font-bold"
              >
                <Link href={buttons.secondary.url}>
                  {buttons.secondary.text}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { CTA };