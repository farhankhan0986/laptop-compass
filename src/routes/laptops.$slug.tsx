import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Check, X as XIcon, ExternalLink } from "lucide-react";
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

  const specs: [string, string][] = [
    ["CPU", laptop.processor],
    ["GPU", laptop.gpu],
    ["RAM", laptop.ram],
    ["Storage", laptop.storage],
    ["Display", laptop.display],
    ["Refresh rate", laptop.refreshRate],
    ["Battery", laptop.battery],
    ["Weight", laptop.weight],
    ["Build", laptop.build],
    ["Keyboard", laptop.keyboard],
    ["Webcam", laptop.webcam],
    ["Cooling", laptop.cooling],
    ["OS", laptop.os],
    ["AI features", laptop.aiFeatures],
    ["Ports", laptop.ports.join(", ")],
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Specifications</h2>
        <div className="mt-5 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <tbody>
              {specs.map(([k, v], i) => (
                <tr key={k} className={i % 2 === 0 ? "bg-card" : "bg-background"}>
                  <td className="w-1/3 border-b border-border px-4 py-3 text-muted-foreground">{k}</td>
                  <td className="border-b border-border px-4 py-3 text-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Performance */}
      <section className="mt-16">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Performance</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Gaming", v: laptop.performance.gaming },
            { k: "Editing", v: laptop.performance.editing },
            { k: "Coding", v: laptop.performance.coding },
            { k: "AI / ML", v: laptop.performance.aiml },
          ].map((p) => (
            <div key={p.k} className="rounded-lg border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground">{p.k}</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{p.v}<span className="text-sm text-muted-foreground">/100</span></p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-foreground" style={{ width: `${p.v}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pros / Cons / Best For */}
      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <Card title="Pros">
          {laptop.pros.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
              <span className="text-muted-foreground">{p}</span>
            </li>
          ))}
        </Card>
        <Card title="Cons">
          {laptop.cons.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm">
              <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">{c}</span>
            </li>
          ))}
        </Card>
        <Card title="Best for">
          {laptop.bestFor.map((b) => (
            <li key={b} className="text-sm text-muted-foreground">{b}</li>
          ))}
        </Card>
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

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-3 text-sm font-semibold text-foreground">{title}</h3>
      <ul className="space-y-2">{children}</ul>
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