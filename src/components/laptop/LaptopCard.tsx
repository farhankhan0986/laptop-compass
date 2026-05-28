import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Laptop } from "@/lib/data/types";
import { formatINR, formatUSD } from "@/lib/data";

export function LaptopCard({ laptop }: { laptop: Laptop }) {
  return (
    <Link
      to="/laptops/$slug"
      params={{ slug: laptop.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-foreground/30"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={laptop.images[0]}
          alt={laptop.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{laptop.brand}</span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" />
            {laptop.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="text-sm font-medium leading-snug text-foreground">{laptop.name}</h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">{laptop.shortDescription}</p>
        <div className="mt-auto flex items-baseline justify-between pt-2">
          <span className="text-sm font-semibold text-foreground">{formatINR(laptop.priceINR)}</span>
          <span className="text-xs text-muted-foreground">{formatUSD(laptop.priceUSD)}</span>
        </div>
      </div>
    </Link>
  );
}