import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, ExternalLink } from "lucide-react";
import { getTopList, getTopListLaptops, formatINR, formatUSD } from "@/lib/data";

export const Route = createFileRoute("/top-lists/$slug")({
  loader: ({ params }) => {
    const list = getTopList(params.slug);
    if (!list) throw notFound();
    return { list, laptops: getTopListLaptops(params.slug) };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.list;
    if (!t) return { meta: [{ title: "Top List — Laptopia" }] };
    return {
      meta: [
        { title: `${t.title} — Laptopia` },
        { name: "description", content: t.description },
        { property: "og:title", content: `${t.title} — Laptopia` },
        { property: "og:description", content: t.description },
      ],
      links: [{ rel: "canonical", href: `/top-lists/${t.slug}` }],
    };
  },
  component: TopListPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">List not found</h1>
      <Link to="/top-lists" className="mt-4 inline-block text-sm underline">Browse all lists</Link>
    </div>
  ),
});

function TopListPage() {
  const { list, laptops } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="mb-12 border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Editor's ranking</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{list.title}</h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">{list.description}</p>
      </header>

      <ol className="space-y-8">
        {laptops.map((l, i) => (
          <li key={l.id} className="grid gap-6 border-b border-border pb-8 last:border-0 md:grid-cols-[80px_1fr_240px]">
            <div className="flex items-start">
              <span className="text-5xl font-semibold tracking-tighter text-muted-foreground/40">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{l.brand}</p>
              <Link to="/laptops/$slug" params={{ slug: l.slug }} className="text-xl font-semibold text-foreground hover:underline">
                {l.name}
              </Link>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-current text-foreground" />
                {l.rating.toFixed(1)} · {l.os}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{l.description}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-foreground">
                <Spec label="CPU" value={l.processor} />
                <Spec label="GPU" value={l.gpu} />
                <Spec label="RAM" value={l.ram} />
                <Spec label="Battery" value={l.battery} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/laptops/$slug" params={{ slug: l.slug }} className="text-xs text-foreground underline underline-offset-4">
                  View details
                </Link>
                {l.buyLinks.amazon && (
                  <a href={l.buyLinks.amazon} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    Amazon <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {l.buyLinks.flipkart && (
                  <a href={l.buyLinks.flipkart} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    Flipkart <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
            <Link to="/laptops/$slug" params={{ slug: l.slug }} className="block overflow-hidden rounded-lg border border-border bg-card">
              <div className="aspect-[4/3]">
                <img src={l.images[0]} alt={l.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="flex items-baseline justify-between p-3 text-xs">
                <span className="font-semibold text-foreground">{formatINR(l.priceINR)}</span>
                <span className="text-muted-foreground">{formatUSD(l.priceUSD)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-muted-foreground">
      <span className="text-muted-foreground/60">{label}:</span> <span className="text-foreground">{value}</span>
    </span>
  );
}