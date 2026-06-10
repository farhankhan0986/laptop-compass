import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ShieldCheck, Scale, Heart, Mail } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Laptopia" },
      { name: "description", content: "Laptopia is an independent laptop review and discovery platform." },
      { property: "og:title", content: "About — Laptopia" },
      { property: "og:description", content: "Independent. Editorial. Built for laptop enthusiasts." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const values = [
    { Icon: ShieldCheck, title: "Independent", text: "No paid placements. No sponsored rankings. Ever." },
    { Icon: Scale, title: "Objective", text: "Specs, benchmarks, and real-world testing — weighted fairly." },
    { Icon: Sparkles, title: "Editorial", text: "Clean writing, sharp opinions, zero marketing fluff." },
    { Icon: Heart, title: "Made with care", text: "Built by people who genuinely love great hardware." },
  ];
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">About Laptopia</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Built for laptop enthusiasts.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          An independent platform for discovering, comparing, and choosing the right laptop —
          whether you're a gamer, a creator, a student, or a working professional.
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ Icon, title, text }) => (
          <div
            key={title}
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background transition-colors group-hover:bg-foreground group-hover:text-background">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-3xl font-semibold tracking-tight text-foreground">100+</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Laptops reviewed</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-3xl font-semibold tracking-tight text-foreground">12</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Categories tracked</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-3xl font-semibold tracking-tight text-foreground">0</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Paid placements</p>
        </div>
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-gradient-to-br from-card to-muted/40 p-8 sm:p-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Our promise</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Every ranking on Laptopia reflects real-world performance, build quality, and value — not
            ad budgets. When a new chip ships or a category shifts, our top lists move with it.
          </p>
          <p>
            We're editorial by design. Clean type, no neon, no marketing fluff — just the
            information you need to make a confident decision.
          </p>
        </div>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          <Mail className="h-4 w-4" /> Get in touch
        </Link>
      </div>
    </div>
  );
}