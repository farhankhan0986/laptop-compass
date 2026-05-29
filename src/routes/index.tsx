import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { categories, getByCategory, getLaptops, filterLaptops } from "@/lib/data";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { LaptopRail } from "@/components/shared/LaptopRail";

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
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-in-up">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Independent laptop reviews
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Discover the perfect laptop.
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
          </div>

          {/* Hero mockup grid */}
          <div className="grid grid-cols-2 gap-3">
            {popular.slice(0, 4).map((l, i) => (
              <div
                key={l.id}
                className={`overflow-hidden rounded-lg border border-border bg-card ${i % 3 === 0 ? "row-span-2" : ""}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={l.images[0]} alt={l.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground">{l.brand}</p>
                  <p className="truncate text-sm font-medium text-foreground">{l.name}</p>
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
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          {[
            { t: "Editorially independent", d: "No paid placements. Rankings reflect real-world performance and value." },
            { t: "Spec-driven", d: "Every pick is backed by detailed benchmarks across gaming, editing, coding and AI workloads." },
            { t: "Updated regularly", d: "We refresh our top lists as new hardware ships, so picks stay current." },
          ].map((b) => (
            <div key={b.t}>
              <h3 className="text-base font-semibold text-foreground">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeader eyebrow="Browse" title="By category" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/30"
            >
              <span className="text-sm font-medium text-foreground">{c.name}</span>
              <span className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.description}</span>
            </Link>
          ))}
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
