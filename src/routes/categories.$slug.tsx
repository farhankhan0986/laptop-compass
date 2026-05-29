import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCategory, getByCategory, categories } from "@/lib/data";
import { LaptopCard } from "@/components/laptop/LaptopCard";
import { ArrowLeft } from "lucide-react";
import type { Laptop } from "@/lib/data/types";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const cat = getCategory(params.slug);
    if (!cat) throw notFound();
    return { cat, laptops: getByCategory(params.slug) };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.cat.name} laptops — Laptopia` : "Category — Laptopia";
    const desc = loaderData?.cat.description ?? "Browse laptops by category.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Category not found</h1>
      <Link to="/categories" className="mt-4 inline-block text-sm underline">All categories</Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { cat, laptops } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Link to="/categories" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> All categories
      </Link>
      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{cat.name} laptops</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{cat.description}</p>
        <p className="mt-2 text-xs text-muted-foreground">{laptops.length} laptops</p>
      </header>
      {laptops.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center text-sm text-muted-foreground">
          No laptops in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(laptops as Laptop[]).map((l) => (<LaptopCard key={l.id} laptop={l} />))}
        </div>
      )}

      <div className="mt-16 border-t border-border pt-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Other categories</p>
        <div className="flex flex-wrap gap-2">
          {categories.filter(c => c.slug !== cat.slug).map(c => (
            <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }}
              className="rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}