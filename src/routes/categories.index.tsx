import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, getByCategory } from "@/lib/data";

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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Browse</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Categories</h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">Pick the use case that fits you best.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = getByCategory(c.slug).length;
          return (
            <Link
              key={c.slug}
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/30"
            >
              <div className="flex items-baseline justify-between">
                <h2 className="text-base font-semibold text-foreground">{c.name}</h2>
                <span className="text-xs text-muted-foreground">{count}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}