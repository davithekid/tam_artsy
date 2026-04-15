import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  MailIcon,
  Camera,
  SendHorizontal,
} from "lucide-react"
import Link from "next/link"

const Contact = () => (
  <section className="mx-auto max-w-7xl px-6 py-30 lg:py-45">
    <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
      <div className="flex flex-col justify-center space-y-8">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Contato
          </span>
          <h2 className="text-4xl font-black tracking-tighter md:text-6xl">
            Vamos criar algo <br /> único juntos?
          </h2>
          <p className="max-w-[45ch] text-lg text-muted-foreground font-light leading-relaxed">
            Fique à vontade para tirar dúvidas sobre modelos, cores ou encomendas personalizadas. Vou adorar te atender!
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <Link 
            href="mailto:tami@gmail.com"
            className="group flex items-center gap-4 rounded-2xl border p-4 transition-all hover:bg-muted hover:shadow-xl hover:shadow-zinc-200/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm border  group-hover:bg-zinc-900 group-hover:text-white transition-colors">
              <MailIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider ">E-mail</p>
              <p className="font-semibold ">contato.tamartsy@gmail.com</p>
            </div>
          </Link>

          <Link 
            href="https://instagram.com/tam.artsy" 
            target="_blank"
            className="group flex items-center gap-4 rounded-2xl border p-4 transition-all hover:bg-muted hover:shadow-xl hover:shadow-zinc-200/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm border border-zinc-100 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
              <Camera className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">Camera</p>
              <p className="font-semibold">@tam.artsy</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 rounded-[3rem] lg:-inset-6" />
        
        <Card className="relative overflow-hidden rounded-[2rem] border-zinc-200 shadow-2xl shadow-zinc-200/50">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-2xl font-bold tracking-tight">Mande uma mensagem</CardTitle>
            <CardDescription className="font-medium">
              Responderei em até 24 horas úteis.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 pt-0">
            <form className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-widest px-1">Nome</Label>
                  <Input
                    id="firstName"
                    placeholder="Seu nome"
                    className="rounded-xl border-zinc-100 bg-zinc-50 focus:bg-white transition-all h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest px-1">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="rounded-xl border-zinc-100 bg-zinc-50 focus:bg-white transition-all h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest px-1">Mensagem</Label>
                <Textarea
                  id="message"
                  placeholder="Conte um pouco sobre o que você deseja..."
                  rows={4}
                  className="rounded-xl border-zinc-100 bg-zinc-50 focus:bg-white transition-all resize-none"
                />
              </div>

              <Button className="h-14 w-full rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg shadow-zinc-200 transition-all active:scale-95 flex gap-2 font-bold">
                Enviar Mensagem
                <SendHorizontal className="size-4 opacity-70" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
)

export default Contact