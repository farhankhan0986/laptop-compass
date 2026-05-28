import { createFileRoute, Link } from "@tanstack/react-router";
import { topLists, getTopListLaptops } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/top-lists/")({
  head: () => ({
    meta: [
      { title: "Top Laptop Lists — Laptopia" },
      { name: "description", content: "Ranked top 10 lists across gaming, creator, budget, students, and most powerful laptops." },
      { property: "og:title", content: "Top Laptop Lists — Laptopia" },
      { property: "og:description", content: "Our editor's ranked picks across every category." },
    ],
    links: [{ rel: "canonical", href: "/top-lists" }],
  }),
  component: TopListsIndex,
});

function TopListsIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Rankings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Top laptop lists</h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Editor-ranked top 10 lists across every major laptop category.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {topLists.map((list) => {
          const laps = getTopListLaptops(list.slug);
          return (
            <Link
              key={list.slug}
              to="/top-lists/$slug"
              params={{ slug: list.slug }}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-foreground/30"
            >
              <div className="grid grid-cols-3 gap-px bg-border">
                {laps.slice(0, 3).map((l) => (
                  <div key={l.id} className="aspect-[4/3] bg-card">
                    <img src={l.images[0]} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-foreground">{list.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{list.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">
                  View ranking <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}