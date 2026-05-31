import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, getByCategory } from "@/lib/data";
import {
  ArrowRight,
  Gamepad2,
  Film,
  Code2,
  GraduationCap,
  Wallet,
  Sparkles,
  Crown,
  Feather,
  Palette,
  Briefcase,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  gaming: Gamepad2,
  editing: Film,
  programming: Code2,
  students: GraduationCap,
  budget: Wallet,
  premium: Sparkles,
  expensive: Crown,
  lightweight: Feather,
  creator: Palette,
  business: Briefcase,
  aiml: BrainCircuit,
};

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Browse by Category — Laptopia" },
      { name: "description", content: "Browse laptops by category: gaming, creator, business, students, budget, and more." },
      { property: "og:title", content: "Browse by Category — Laptopia" },
      { property: "og:description", content: "Find the right laptop by use case." },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: CategoriesIndex,
});

function CategoriesIndex() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Browse</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Categories
          </h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Every laptop, sorted by what you actually do with it. Pick a use case and we'll show you the best picks.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const Icon = icons[c.slug] ?? Sparkles;
            const count = getByCategory(c.slug).length;
            return (
              <Link
                key={c.slug}
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-md"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-foreground/[0.04] transition-transform duration-500 group-hover:scale-125"
                  aria-hidden
                />
                <div className="relative flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] tabular-nums text-muted-foreground">
                    {count} {count === 1 ? "laptop" : "laptops"}
                  </span>
                </div>
                <h2 className="relative mt-5 text-lg font-semibold tracking-tight text-foreground">{c.name}</h2>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                <span className="relative mt-5 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">
                  Explore category <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}