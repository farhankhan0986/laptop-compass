import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Search,
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
  Shield,
  LineChart,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { categories, getByCategory, getLaptops, filterLaptops } from "@/lib/data";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { LaptopRail } from "@/components/shared/LaptopRail";

const categoryIcons: Record<string, LucideIcon> = {
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Laptopia — Discover your next laptop" },
      { name: "description", content: "Find the perfect laptop for gaming, coding, editing, students, and professionals. Editorial reviews, rankings, and side-by-side comparisons." },
      { property: "og:title", content: "Laptopia — Discover your next laptop" },
      { property: "og:description", content: "Editorial reviews and rankings of the best laptops for every kind of user." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const all = getLaptops();
  const popular = filterLaptops({}, "popular").slice(0, 4);
  const gaming = getByCategory("gaming").slice(0, 4);
  const students = getByCategory("students").slice(0, 4);
  const budget = getByCategory("budget").slice(0, 4);
  const powerful = filterLaptops({}, "powerful").slice(0, 4);
  const newly = all.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none" aria-hidden />
        <div className="absolute inset-0 spotlight pointer-events-none" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-in-up">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
              Independent laptop reviews · Updated weekly
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Discover the perfect <span className="italic text-muted-foreground">laptop</span>.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              For gaming, coding, editing, students, and professionals — handpicked picks, deep specs,
              and honest comparisons. No fluff.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (query) window.location.href = `/laptops?q=${encodeURIComponent(query)}`;
              }}
              className="mt-8 flex h-12 max-w-md items-center gap-2 rounded-md border border-border bg-card px-3"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search MacBook, ROG, ThinkPad…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:bg-foreground/90">
                Search
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/laptops" className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent">
                Browse laptops <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/top-lists" className="inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                See top lists
              </Link>
            </div>

            {/* Stats strip */}
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                { k: all.length + "+", v: "Laptops" },
                { k: categories.length + "", v: "Categories" },
                { k: "6", v: "Top lists" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{s.k}</dt>
                  <dd className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero mockup grid */}
          <div className="grid grid-cols-2 gap-3">
  {popular.slice(0, 4).map((l, i) => (
    <div
      key={l.id}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      style={{
        animation: `fade-in-up 0.6s ease-out ${i * 80}ms both`,
      }}
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={l.images[0]}
          alt={l.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-1 p-3">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground truncate">
          {l.brand}
        </p>

        <h3 className="line-clamp-2 min-h-[40px] text-sm font-medium text-foreground">
          {l.name}
        </h3>
      </div>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* Featured rails */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeader eyebrow="Editor's pick" title="Most popular laptops" href="/laptops" />
        <LaptopRail laptops={popular} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeader eyebrow="For gamers" title="Best gaming laptops" href="/top-lists/gaming" />
        <LaptopRail laptops={gaming} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeader eyebrow="For students" title="Best student laptops" href="/top-lists/students" />
        <LaptopRail laptops={students} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeader eyebrow="Value picks" title="Best budget laptops" href="/top-lists/budget-friendly" />
        <LaptopRail laptops={budget} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeader eyebrow="Peak performance" title="Most powerful" href="/top-lists/most-powerful" />
        <LaptopRail laptops={powerful} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeader eyebrow="Just added" title="Newly added" href="/laptops" />
        <LaptopRail laptops={newly} />
      </section>

      {/* Why trust us */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden bg-border px-0 sm:grid-cols-3">
          {[
            { Icon: Shield, t: "Editorially independent", d: "No paid placements. Rankings reflect real-world performance and value." },
            { Icon: LineChart, t: "Spec-driven", d: "Every pick is backed by benchmarks across gaming, editing, coding and AI workloads." },
            { Icon: RefreshCw, t: "Updated regularly", d: "We refresh our top lists as new hardware ships, so picks stay current." },
          ].map((b) => (
            <div key={b.t} className="bg-background p-8">
              <b.Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              <h3 className="mt-4 text-base font-semibold text-foreground">{b.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeader
          eyebrow="Browse"
          title="Find your laptop by need"
          description="Pick the use case that fits you best — every pick is backed by hands-on testing and real benchmarks."
          href="/categories"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => {
            const Icon = categoryIcons[c.slug] ?? Sparkles;
            const count = getByCategory(c.slug).length;
            return (
              <Link
                key={c.slug}
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-md"
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-foreground/[0.04] transition-transform duration-500 group-hover:scale-125"
                  aria-hidden
                />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="relative mt-4 flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-foreground">{c.name}</span>
                  <span className="text-[11px] tabular-nums text-muted-foreground">{count}</span>
                </div>
                <p className="relative mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{c.description}</p>
                <span className="relative mt-4 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">
                  Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Get the next laptop review in your inbox.
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          One email per week. Just new picks and rankings. No spam.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            placeholder="you@email.com"
            className="h-11 flex-1 rounded-md border border-border bg-card px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground/40"
          />
          <button className="h-11 rounded-md bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
