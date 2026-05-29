import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { getLaptops, formatINR, formatUSD } from "@/lib/data";
import type { Laptop } from "@/lib/data/types";

export const Route = createFileRoute("/compare")({
  validateSearch: (s: Record<string, unknown>) => ({
    a: typeof s.a === "string" ? s.a : undefined,
    b: typeof s.b === "string" ? s.b : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Compare Laptops — Laptopia" },
      { name: "description", content: "Side-by-side comparison of any two laptops in our database." },
      { property: "og:title", content: "Compare Laptops — Laptopia" },
      { property: "og:description", content: "Compare specs, performance, battery, and price side by side." },
    ],
    links: [{ rel: "canonical", href: "/compare" }],
  }),
  component: Compare,
});

function Compare() {
  const all = getLaptops();
  const { a: aSlug, b: bSlug } = Route.useSearch();
  const navigate = useNavigate({ from: "/compare" });
  const a = all.find((l) => l.slug === aSlug) ?? all[0];
  const b = all.find((l) => l.slug === bSlug) ?? all[1];
  const setA = (slug: string) => navigate({ search: (p: { a?: string; b?: string }) => ({ ...p, a: slug }) });
  const setB = (slug: string) => navigate({ search: (p: { a?: string; b?: string }) => ({ ...p, b: slug }) });

  const rows: [string, (l: Laptop) => string | number][] = [
    ["Price (INR)", (l) => formatINR(l.priceINR)],
    ["Price (USD)", (l) => formatUSD(l.priceUSD)],
    ["Rating", (l) => l.rating.toFixed(1)],
    ["OS", (l) => l.os],
    ["CPU", (l) => l.processor],
    ["GPU", (l) => l.gpu],
    ["RAM", (l) => l.ram],
    ["Storage", (l) => l.storage],
    ["Display", (l) => l.display],
    ["Refresh rate", (l) => l.refreshRate],
    ["Battery", (l) => l.battery],
    ["Weight", (l) => l.weight],
    ["Gaming score", (l) => `${l.performance.gaming}/100`],
    ["Editing score", (l) => `${l.performance.editing}/100`],
    ["Coding score", (l) => `${l.performance.coding}/100`],
    ["AI/ML score", (l) => `${l.performance.aiml}/100`],
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Compare laptops</h1>
        <p className="mt-2 text-sm text-muted-foreground">Pick two laptops to see them side by side.</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {[
          { l: a, set: setA },
          { l: b, set: setB },
        ].map((col, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={col.l.images[0]} alt={col.l.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <select
                value={col.l.slug}
                onChange={(e) => col.set(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
              >
                {all.map((l) => (
                  <option key={l.id} value={l.slug}>{l.name}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <tbody>
            {rows.map(([k, fn], i) => (
              <tr key={k} className={i % 2 === 0 ? "bg-card" : "bg-background"}>
                <td className="w-1/3 border-b border-border px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">{k}</td>
                <td className="border-b border-border px-4 py-3 text-foreground">{fn(a)}</td>
                <td className="border-b border-border px-4 py-3 text-foreground">{fn(b)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}