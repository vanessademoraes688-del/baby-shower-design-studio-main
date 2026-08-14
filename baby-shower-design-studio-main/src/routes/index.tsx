import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Sparkles, Heart } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Chá de Bebê da Giovanna" },
      { name: "description", content: "Você está convidado para o chá de bebê da Giovanna. Confirme sua presença e venha celebrar esse momento especial conosco." },
      { property: "og:title", content: "Chá de Bebê da Giovanna" },
      { property: "og:description", content: "Você está convidado para o chá de bebê da Giovanna. Confirme sua presença e venha celebrar esse momento especial conosco." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8 font-body text-foreground sm:py-12">
      <div className="mx-auto max-w-md">
        {/* Decorative top */}
        <div className="mb-6 flex justify-center">
          <Sparkles className="h-5 w-5 text-accent" />
        </div>

        {/* Hero title */}
        <section className="mb-8 text-center">
          <p className="font-serif text-2xl font-medium tracking-wide text-primary sm:text-3xl">
            Chá de Bebê
          </p>
          <p className="font-script text-2xl text-accent sm:text-3xl">da</p>
          <h1 className="font-script text-6xl leading-none text-primary sm:text-7xl">
            Giovanna
          </h1>
        </section>

        {/* Description */}
        <p className="mb-8 text-center font-serif text-base leading-relaxed text-muted-foreground">
          Assim como a borboleta, a Giovanna está transformando nossas vidas com
          muito amor, antes mesmo de chegar. Venha celebrar esse momento especial
          conosco.
        </p>

        {/* Event details card */}
        <div className="mb-8 rounded-2xl border border-soft-gold/30 bg-cream p-6 text-center shadow-sm">
          <p className="mb-1 font-body text-sm font-semibold uppercase tracking-wider text-primary">
            26 DE AGOSTO DE 2026
            <span className="mx-2 text-accent">•</span>ÀS 15H
          </p>
          <p className="font-serif text-base font-medium text-foreground">
            Rua Jandiatuba,630 - Cj.318/316 - BL A
          </p>
          <p className="font-body text-sm text-muted-foreground">
            CEP - 05716 - 150
          </p>

          <Button
            asChild
            className="mt-5 h-11 rounded-2xl bg-primary px-6 font-body text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
          >
            <a
              href="https://maps.google.com/?q=Rua+Monsenhor+Castro+Nery,625+Sao+Paulo+SP"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Como chegar
            </a>
          </Button>
        </div>

        {/* RSVP section */}
        <section className="mb-8">
          <h2 className="mb-6 text-center font-serif text-2xl font-semibold text-primary">
            Confirme sua presença
          </h2>

          {submitted ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <Heart className="mx-auto mb-4 h-8 w-8 text-primary" />
              <p className="font-serif text-lg font-semibold text-foreground">
                Presença confirmada!
              </p>
              <p className="mt-2 font-body text-sm text-muted-foreground">
                Agradecemos de coração. Esperamos você!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="font-body text-xs font-semibold uppercase tracking-wider text-primary"
                >
                  Seu nome
                </Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome"
                  required
                  className="h-11 rounded-xl border-input bg-background font-body text-sm placeholder:text-muted-foreground/70 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="attendance"
                  className="font-body text-xs font-semibold uppercase tracking-wider text-primary"
                >
                  Você poderá comparecer?
                </Label>
                <Select required>
                  <SelectTrigger className="h-11 rounded-xl border-input bg-background font-body text-sm focus:ring-primary">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="yes">Sim, com certeza!</SelectItem>
                    <SelectItem value="no">Não poderei ir</SelectItem>
                    <SelectItem value="maybe">Talvez</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="guests"
                  className="font-body text-xs font-semibold uppercase tracking-wider text-primary"
                >
                  Quantas pessoas irão com você?
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min={1}
                  defaultValue={1}
                  required
                  className="h-11 rounded-xl border-input bg-background font-body text-sm focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="message"
                  className="font-body text-xs font-semibold uppercase tracking-wider text-primary"
                >
                  Deixe uma mensagem{" "}
                  <span className="font-normal normal-case text-muted-foreground">
                    (opcional)
                  </span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Escreva uma mensagem carinhosa..."
                  rows={3}
                  className="resize-none rounded-xl border-input bg-background font-body text-sm placeholder:text-muted-foreground/70 focus-visible:ring-primary"
                />
              </div>

              <Button
                type="submit"
                className="mt-2 h-12 w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 font-body text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-md transition-all hover:opacity-95 hover:shadow-lg"
              >
                Confirmar presença
              </Button>
            </form>
          )}
        </section>

        {/* Special reminder card */}
        <div className="rounded-2xl border border-soft-gold/30 bg-cream-dark p-6 text-center shadow-sm">
          <p className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-accent">
            Lembretes especiais
          </p>
          <p className="font-serif text-base leading-relaxed text-foreground">
            Com carinho, pedimos que cada convidado traga{" "}
            <span className="font-semibold text-primary">
              um pacote de fraldas + 1 mimo
            </span>{" "}
            para a Giovanna. ✦
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center">
          <p className="font-script text-2xl text-primary">Giovanna</p>
          <p className="mt-1 font-body text-xs text-muted-foreground">
            Com muito amor e alegria
          </p>
        </footer>
      </div>
    </main>
  );
}