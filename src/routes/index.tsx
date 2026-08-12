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
import emailjs from "@emailjs/browser";

// ✅ SUAS CREDENCIAIS DO EMAILJS (JÁ PREENCHIDAS)
const SERVICE_ID = "service_50lblki";
const TEMPLATE_ID = "template_bbu5olm";
const PUBLIC_KEY = "cDI0NZZcxad4fE0Rl";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Chá de Bebê da Giovanna" },
      {
        name: "description",
        content:
          "Você está convidado para o chá de bebê da Giovanna. Confirme sua presença e venha celebrar esse momento especial conosco.",
      },
      { property: "og:title", content: "Chá de Bebê da Giovanna" },
      {
        property: "og:description",
        content:
          "Você está convidado para o chá de bebê da Giovanna. Confirme sua presença e venha celebrar esse momento especial conosco.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    comparecer: "",
    acompanhantes: "1",
    mensagem: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      comparecer: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateParams = {
        nome: formData.nome,
        comparecer: formData.comparecer,
        acompanhantes: formData.acompanhantes,
        mensagem: formData.mensagem || "Nenhuma mensagem",
        data_hora: new Date().toLocaleString("pt-BR"),
      };

      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      if (response.status === 200) {
        setSubmitted(true);
        setFormData({ nome: "", comparecer: "", acompanhantes: "1", mensagem: "" });
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Houve um erro ao enviar sua confirmação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat py-8 px-4"
      style={{ backgroundImage: "url('/borbo.png')" }}
    >
      {/* Container centralizado com fundo semitransparente para manter o texto legível */}
      <div className="mx-auto max-w-xl rounded-3xl bg-background/80 p-6 shadow-lg backdrop-blur-sm">
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
        <p className="mx-auto mb-8 max-w-[320px] text-center font-serif text-base leading-relaxed text-muted-foreground">
          Assim como a borboleta, a Giovanna está transformando nossas vidas com
          muito amor, antes mesmo de chegar. Venha celebrar esse momento especial
          conosco.
        </p>

        {/* Event details card */}
        <div className="mx-auto mb-8 w-full max-w-[360px] rounded-2xl border border-soft-gold/30 bg-cream p-6 text-center shadow-sm">
          <p className="mb-1 font-body text-sm font-semibold uppercase tracking-wider text-primary">
            25 de agosto de 2026
            <span className="mx-2 text-accent">•</span>às 10H
          </p>

          <p className="font-serif text-base font-medium text-foreground">
            Rua Jandiatuba,630 - Cj.318/316 - BL A
          </p>

          <p className="font-body text-sm text-muted-foreground">
            CEP - 05716 - 150
          </p>

          {/* Botão Como chegar */}
          <Button
            asChild
            className="mt-5 h-11 rounded-2xl bg-primary px-6 font-body text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
          >
            <a
              href="https://www.google.com/maps/search/?api=1&query=Rua+Jandiatuba%2C+630%2C+S%C3%A3o+Paulo%2C+SP"
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
            <div className="mx-auto w-full max-w-[360px] rounded-2xl border border-border bg-card p-8 text-center">
              <Heart className="mx-auto mb-4 h-8 w-8 text-primary" />
              <p className="font-serif text-lg font-semibold text-foreground">
                Presença confirmada!
              </p>
              <p className="mt-2 font-body text-sm text-muted-foreground">
                Agradecemos de coração. Esperamos você!
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="mt-4 h-10 rounded-xl"
              >
                Nova Confirmação
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto w-full max-w-[360px] space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
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
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
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
                <Select onValueChange={handleSelectChange} required>
                  <SelectTrigger className="h-11 rounded-xl border-input bg-background font-body text-sm focus:ring-primary">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Sim, com certeza!">Sim, com certeza!</SelectItem>
                    <SelectItem value="Não poderei ir">Não poderei ir</SelectItem>
                    <SelectItem value="Talvez">Talvez</SelectItem>
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
                  name="acompanhantes"
                  type="number"
                  min={1}
                  value={formData.acompanhantes}
                  onChange={handleChange}
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
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Escreva uma mensagem carinhosa..."
                  rows={3}
                  className="resize-none rounded-xl border-input bg-background font-body text-sm placeholder:text-muted-foreground/70 focus-visible:ring-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="mt-2 h-12 w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 font-body text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-md transition-all hover:opacity-95 hover:shadow-lg disabled:opacity-70"
              >
                {loading ? "Enviando..." : "Confirmar presença"}
              </Button>
            </form>
          )}
        </section>

        {/* Special reminder card */}
        <div className="mx-auto w-full max-w-[360px] rounded-2xl border border-soft-gold/30 bg-cream-dark p-6 text-center shadow-sm">
          <p className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-accent">
            Lembrete especial
          </p>
          <p className="font-serif text-base leading-relaxed text-foreground">
            Com carinho, pedimos que cada convidado traga{" "}
            <span className="font-semibold text-primary">
              um pacote de fraldas + 1 mimo
            </span>{" "}
            para a Giovanna. ✦
          </p>
        </div>

        {/* Lista de presentes - com emoji 🎁 */}
        <div className="mt-5 text-center">
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-2xl border-2 border-soft-gold/40 bg-cream/80 px-6 font-body text-sm font-semibold uppercase tracking-wide text-primary transition-all hover:border-soft-gold hover:bg-cream hover:shadow-md"
          >
            <a
              href="https://collshp.com/lojadabruhh"
              target="_blank"
              rel="noopener noreferrer"
            >
              🎁 Lista de presentes
            </a>
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center">
          <p className="font-script text-2xl text-primary">Giovanna</p>
          <p className="mt-1 font-body text-xs text-muted-foreground">
            Com muito amor e alegria
          </p>
        </footer>
      </div>
    </div>
  );
}