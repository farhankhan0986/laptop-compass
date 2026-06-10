import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Star, Check, X as XIcon, ExternalLink,
  Gamepad2, Video, Code2, BrainCircuit, Swords,
  Cpu, MemoryStick, HardDrive, Monitor, RefreshCw, BatteryCharging, Weight,
  Layers, Keyboard, Camera, Wind, Apple, Sparkles, Plug, Trophy, Target,
  ThumbsUp, ThumbsDown,
} from "lucide-react";
import { getLaptopBySlug, getSimilar, formatINR, formatUSD } from "@/lib/data";
import type { Laptop } from "@/lib/data/types";
import { LaptopCard } from "@/components/laptop/LaptopCard";

export const Route = createFileRoute("/laptops/$slug")({
  loader: ({ params }) => {
    const laptop = getLaptopBySlug(params.slug);
    if (!laptop) throw notFound();
    return { laptop };
  },
  head: ({ loaderData }) => {
    const l = loaderData?.laptop;
    if (!l) return { meta: [{ title: "Laptop — Laptopia" }] };
    return {
      meta: [
        { title: `${l.name} — Specs, Price & Review · Laptopia` },
        { name: "description", content: l.description },
        { property: "og:title", content: `${l.name} — Laptopia` },
        { property: "og:description", content: l.description },
        { property: "og:image", content: l.images[0] },
        { property: "og:type", content: "product" },
      ],
      links: [{ rel: "canonical", href: `/laptops/${l.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: l.name,
            brand: { "@type": "Brand", name: l.brand },
            image: l.images,
            description: l.description,
            aggregateRating: { "@type": "AggregateRating", ratingValue: l.rating, reviewCount: 100 },
            offers: { "@type": "Offer", price: l.priceUSD, priceCurrency: "USD" },
          }),
        },
      ],
    };
  },
  component: LaptopDetails,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Laptop not found</h1>
      <Link to="/laptops" className="mt-4 inline-block text-sm text-muted-foreground underline">Back to all laptops</Link>
    </div>
  ),
});

function LaptopDetails() {
  const { laptop } = Route.useLoaderData() as { laptop: Laptop };
  const [active, setActive] = useState(0);
  const similar = getSimilar(laptop);

  const specGroups: { title: string; items: { k: string; v: string; Icon: typeof Cpu }[] }[] = [
    {
      title: "Core hardware",
      items: [
        { k: "Processor", v: laptop.processor, Icon: Cpu },
        { k: "Graphics", v: laptop.gpu, Icon: Sparkles },
        { k: "Memory", v: laptop.ram, Icon: MemoryStick },
        { k: "Storage", v: laptop.storage, Icon: HardDrive },
      ],
    },
    {
      title: "Display & power",
      items: [
        { k: "Display", v: laptop.display, Icon: Monitor },
        { k: "Refresh rate", v: laptop.refreshRate, Icon: RefreshCw },
        { k: "Battery", v: laptop.battery, Icon: BatteryCharging },
        { k: "Weight", v: laptop.weight, Icon: Weight },
      ],
    },
    {
      title: "Build & I/O",
      items: [
        { k: "Build", v: laptop.build, Icon: Layers },
        { k: "Keyboard", v: laptop.keyboard, Icon: Keyboard },
        { k: "Webcam", v: laptop.webcam, Icon: Camera },
        { k: "Cooling", v: laptop.cooling, Icon: Wind },
        { k: "Operating system", v: laptop.os, Icon: Apple },
        { k: "AI features", v: laptop.aiFeatures, Icon: BrainCircuit },
        { k: "Ports", v: laptop.ports.join(" · "), Icon: Plug },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Top section */}
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-card">
            <img src={laptop.images[active]} alt={laptop.name} className="h-full w-full object-cover" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {laptop.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`aspect-[4/3] overflow-hidden rounded-md border ${active === i ? "border-foreground" : "border-border"}`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{laptop.brand}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{laptop.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 text-foreground">
              <Star className="h-3.5 w-3.5 fill-current" />
              {laptop.rating.toFixed(1)}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{laptop.os}</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{laptop.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {laptop.tags.map((t) => (
              <span key={t} className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">{t}</span>
            ))}
          </div>

          <div className="mt-8 flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-foreground">{formatINR(laptop.priceINR)}</span>
            <span className="text-sm text-muted-foreground">{formatUSD(laptop.priceUSD)}</span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {laptop.buyLinks.amazon && (
              <BuyBtn href={laptop.buyLinks.amazon} label="Buy on Amazon" />
            )}
            {laptop.buyLinks.flipkart && (
              <BuyBtn href={laptop.buyLinks.flipkart} label="Buy on Flipkart" />
            )}
            {laptop.buyLinks.official && (
              <BuyBtn href={laptop.buyLinks.official} label="Official store" primary />
            )}
          </div>
        </div>
      </div>

      {/* Specs */}
      <section className="mt-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Specifications</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Every detail that defines how this machine feels in daily use.
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-8">
          {specGroups.map((group) => (
            <div key={group.title}>
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {group.title}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map(({ k, v, Icon }) => (
                  <div
                    key={k}
                    className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-md"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background transition-colors group-hover:bg-foreground group-hover:text-background">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{k}</p>
                      <p className="mt-0.5 text-sm font-medium leading-snug text-foreground break-words">{v}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance */}
      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Performance</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Scored across four real-world workloads, normalised to a 100-point scale.
            </p>
          </div>
          <Link
            to="/laptop-war"
            className="hidden items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent sm:inline-flex"
          >
            <Swords className="h-3.5 w-3.5" /> Pit it against another
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Gaming", v: laptop.performance.gaming, Icon: Gamepad2, hint: "AAA & esports titles" },
            { k: "Editing", v: laptop.performance.editing, Icon: Video, hint: "4K video & RAW photo" },
            { k: "Coding", v: laptop.performance.coding, Icon: Code2, hint: "Builds, IDEs & VMs" },
            { k: "AI / ML", v: laptop.performance.aiml, Icon: BrainCircuit, hint: "Local inference & training" },
          ].map(({ k, v, Icon, hint }) => {
            const tier = v >= 85 ? "Excellent" : v >= 70 ? "Great" : v >= 55 ? "Good" : v >= 40 ? "Average" : "Limited";
            return (
              <div
                key={k}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background transition-colors group-hover:bg-foreground group-hover:text-background">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {tier}
                  </span>
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">{k}</p>
                <p className="mt-1 flex items-baseline gap-1 text-foreground">
                  <span className="text-3xl font-semibold tabular-nums">{v}</span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-foreground transition-[width] duration-500"
                    style={{ width: `${v}%` }}
                  />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{hint}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pros / Cons / Best For */}
      <section className="mt-16">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">The verdict</h2>
        <p className="mt-1 text-sm text-muted-foreground">What stands out, what to watch for, and who it's built for.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <VerdictCard
            title="Pros"
            subtitle="Where it wins"
            Icon={ThumbsUp}
            accent="from-emerald-500/15 to-emerald-500/0"
            ringClass="ring-emerald-500/20"
            iconClass="text-emerald-600 dark:text-emerald-400"
          >
            {laptop.pros.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-foreground/90">{p}</span>
              </li>
            ))}
          </VerdictCard>
          <VerdictCard
            title="Cons"
            subtitle="What to know"
            Icon={ThumbsDown}
            accent="from-rose-500/15 to-rose-500/0"
            ringClass="ring-rose-500/20"
            iconClass="text-rose-600 dark:text-rose-400"
          >
            {laptop.cons.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400">
                  <XIcon className="h-3 w-3" />
                </span>
                <span className="text-foreground/90">{c}</span>
              </li>
            ))}
          </VerdictCard>
          <VerdictCard
            title="Best for"
            subtitle="The right buyer"
            Icon={Target}
            accent="from-sky-500/15 to-sky-500/0"
            ringClass="ring-sky-500/20"
            iconClass="text-sky-600 dark:text-sky-400"
          >
            {laptop.bestFor.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400">
                  <Trophy className="h-3 w-3" />
                </span>
                <span className="text-foreground/90">{b}</span>
              </li>
            ))}
          </VerdictCard>
        </div>
      </section>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Similar laptops</h2>
          <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {similar.map((s) => (
              <LaptopCard key={s.id} laptop={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function VerdictCard({
  title, subtitle, Icon, accent, ringClass, iconClass, children,
}: {
  title: string;
  subtitle: string;
  Icon: typeof Check;
  accent: string;
  ringClass: string;
  iconClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border bg-card p-6 ring-1 ${ringClass} transition-all hover:-translate-y-0.5 hover:shadow-lg`}>
      <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${accent} blur-2xl`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{subtitle}</p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background ${iconClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <ul className="relative mt-5 space-y-2.5">{children}</ul>
    </div>
  );
}

function BuyBtn({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-10 items-center justify-center gap-1.5 rounded-md text-sm font-medium transition-colors ${
        primary
          ? "bg-foreground text-background hover:bg-foreground/90"
          : "border border-border bg-background text-foreground hover:bg-accent"
      }`}
    >
      {label} <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}