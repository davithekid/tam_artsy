'use client'

import { Plus, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

const ProductTypes = ({ industry, industryLabel }) => (
  <div className="group relative h-[450px] overflow-hidden rounded-[2rem] border border-border/50">
    
    <Link 
      href={industry.url} 
      className="absolute inset-0 z-50"
    >
      <span className="sr-only">Ver {industry.name}</span>
    </Link>

    <img
      src={industry.image}
      alt={industry.imageAlt || industry.name}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-all duration-500 group-hover:via-black/50" />

    {/* Título */}
    <h3 className="absolute bottom-10 left-8 z-10 text-3xl font-black tracking-tighter text-white transition-all duration-500 group-hover:-translate-y-28">
      {industry.name}
    </h3>

    {/* Conteúdo hover */}
    <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-white opacity-0 translate-y-5 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
      <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
        {industryLabel}
      </span>

      <p className="mb-6 text-sm leading-relaxed text-white/80 max-w-[25ch] font-light">
        {industry.description}
      </p>

      <div className="flex items-center gap-2 font-bold text-sm">
        Explorar Categoria <ArrowUpRight className="size-4" />
      </div>
    </div>

    {/* Botão + */}
    <div className="absolute right-6 top-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all duration-500 group-hover:rotate-90 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
      <Plus size={20} />
    </div>
  </div>
)

const IndustriesResponsive = ({ industries, industryLabel }) => (
  <>
    {/* Mobile */}
    <div className="lg:hidden -mx-4 px-4">
      <Carousel opts={{ align: 'start', dragFree: true }}>
        <CarouselContent className="-ml-4">
          {industries.map((industry, index) => (
            <CarouselItem
              key={index}
              className="basis-[85%] sm:basis-[50%] pl-4"
            >
              <ProductTypes
                industry={industry}
                industryLabel={industryLabel}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>

    {/* Desktop */}
    <div className="hidden grid-cols-2 gap-4 lg:grid xl:grid-cols-5">
      {industries.map((industry, index) => (
        <ProductTypes
          key={index}
          industry={industry}
          industryLabel={industryLabel}
        />
      ))}
    </div>
  </>
)

const Industries1 = ({
  title = 'Categorias',
  industries = [
    {
      name: 'Bolsas',
      description: 'Design exclusivo que une a tradição do crochê com o lifestyle moderno.',
      image: '/product-type/bolsa.jpeg',
      url: '/bolsas',
    },
    {
      name: 'Tops',
      description: 'Peças premium que elevam qualquer look com conforto e estilo autêntico.',
      image: '/product-type/top.jpeg',
      url: '/tops',
    },
    {
      name: 'Headpieces',
      description: 'Detalhes que transformam o visual. Headpieces e itens variados.',
      image: '/product-type/headpiece.png',
      url: '/headpieces',
    },
    {
      name: 'Variados',
      description: 'Saquinhos e utilitários artesanais para o seu dia a dia.',
      image: '/product-type/saquinho.png',
      url: '/variados',
    }, 
    {
      name: 'Unissex',
      description: 'Bolsas saco versáteis feitas com a resistência do fio barbante.',
      image: '/product-type/bag.png',
      url: '/unissex',
    },
  ],
}) => {
  return (
    <section className="py-24 bg-muted">
      <div className="mx-auto max-w-7xl space-y-16 px-6">

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              O que fazemos
            </span>

            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
              {title}
            </h2>
          </div>

          <p className="max-w-xs text-muted-foreground text-lg font-light leading-relaxed">
            Escolha a categoria que mais combina com você.
          </p>
        </header>

        <IndustriesResponsive
          industries={industries}
        />

        <div className="flex justify-center pt-8">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-12 border-2 font-bold hover:bg-primary hover:text-primary-foreground transition-all"
            asChild
          >
            <Link href="/produtos">Ver Catálogo Completo</Link>
          </Button>
        </div>

      </div>
    </section>
  )
}
export { Industries1 }