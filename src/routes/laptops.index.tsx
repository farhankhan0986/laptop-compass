import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { brands, categories, filterLaptops, type SortKey } from "@/lib/data";
import { LaptopCard } from "@/components/laptop/LaptopCard";
import { Filter, X } from "lucide-react";

export const Route = createFileRoute("/laptops/")({
  validateSearch: (s: Record<string, unknown>) => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All Laptops — Laptopia" },
      { name: "description", content: "Browse and filter every laptop in our database by brand, OS, GPU, RAM, price, and more." },
      { property: "og:title", content: "All Laptops — Laptopia" },
      { property: "og:description", content: "Find the right laptop with powerful filters and sorting." },
    ],
    links: [{ rel: "canonical", href: "/laptops" }],
  }),
  component: LaptopsListing,
});

const OS_OPTIONS = ["Windows", "macOS", "Linux", "ChromeOS"];
const PROC_BRANDS = ["Intel", "AMD", "Apple", "Qualcomm"];
const GPU_BRANDS = ["NVIDIA", "AMD", "Intel", "Apple"];

function LaptopsListing() {
  const { q } = Route.useSearch();
  const [open, setOpen] = useState(false);
  const [selBrands, setSelBrands] = useState<string[]>([]);
  const [selOS, setSelOS] = useState<string[]>([]);
  const [selCats, setSelCats] = useState<string[]>([]);
  const [selProc, setSelProc] = useState<string[]>([]);
  const [selGpu, setSelGpu] = useState<string[]>([]);
  const [minRAM, setMinRAM] = useState(0);
  const [minPriceINR, setMinPriceINR] = useState(0);
  const [maxPriceINR, setMaxPriceINR] = useState(500000);
  const [search, setSearch] = useState(q ?? "");
  const [sort, setSort] = useState<SortKey>("popular");

  const results = useMemo(
    () =>
      filterLaptops(
        {
          brands: selBrands,
          os: selOS,
          categories: selCats,
          processorBrands: selProc,
          gpuBrands: selGpu,
          minRAM: minRAM || undefined,
          minPriceINR: minPriceINR || undefined,
          maxPriceINR: maxPriceINR < 500000 ? maxPriceINR : undefined,
          search: search || undefined,
        },
        sort,
      ),
    [selBrands, selOS, selCats, selProc, selGpu, minRAM, minPriceINR, maxPriceINR, search, sort],
  );

  const toggle = (arr: string[], setArr: (a: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const reset = () => {
    setSelBrands([]); setSelOS([]); setSelCats([]); setSelProc([]); setSelGpu([]);
    setMinRAM(0); setMinPriceINR(0); setMaxPriceINR(500000); setSearch("");
  };

  const FilterContent = (
    <div className="space-y-6 text-sm">
      <FilterGroup title="Brand">
        {brands.map((b) => (
          <Check key={b.id} label={b.name} checked={selBrands.includes(b.name)} onChange={() => toggle(selBrands, setSelBrands, b.name)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Operating system">
        {OS_OPTIONS.map((o) => (
          <Check key={o} label={o} checked={selOS.includes(o)} onChange={() => toggle(selOS, setSelOS, o)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Category">
        {categories.map((c) => (
          <Check key={c.slug} label={c.name} checked={selCats.includes(c.slug)} onChange={() => toggle(selCats, setSelCats, c.slug)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Processor brand">
        {PROC_BRANDS.map((p) => (
          <Check key={p} label={p} checked={selProc.includes(p)} onChange={() => toggle(selProc, setSelProc, p)} />
        ))}
      </FilterGroup>
      <FilterGroup title="GPU brand">
        {GPU_BRANDS.map((g) => (
          <Check key={g} label={g} checked={selGpu.includes(g)} onChange={() => toggle(selGpu, setSelGpu, g)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Minimum RAM">
        <div className="flex flex-wrap gap-1.5">
          {[0, 8, 16, 32, 64].map((r) => (
            <button
              key={r}
              onClick={() => setMinRAM(r)}
              className={`rounded-md border px-2.5 py-1 text-xs ${
                minRAM === r ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {r === 0 ? "Any" : `${r}GB+`}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Price (INR)">
        <div className="space-y-2">
          <input type="range" min={0} max={500000} step={10000} value={maxPriceINR} onChange={(e) => setMaxPriceINR(Number(e.target.value))} className="w-full accent-foreground" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹0</span>
            <span>Up to ₹{maxPriceINR.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </FilterGroup>
      <button onClick={reset} className="w-full rounded-md border border-border py-2 text-xs text-muted-foreground hover:text-foreground">
        Reset filters
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">All Laptops</h1>
        <p className="mt-2 text-sm text-muted-foreground">{results.length} laptops in our database</p>
      </div>

      {/* Search + sort + mobile filter */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, CPU, GPU…"
          className="h-10 flex-1 min-w-[200px] rounded-md border border-border bg-card px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground/40"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="h-10 rounded-md border border-border bg-card px-3 text-sm outline-none"
        >
          <option value="popular">Most popular</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="powerful">Most powerful</option>
          <option value="battery">Best battery</option>
          <option value="latest">Latest</option>
        </select>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex h-10 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-sm lg:hidden"
        >
          <Filter className="h-3.5 w-3.5" /> Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">{FilterContent}</aside>

        {/* Results */}
        <div className="flex-1">
          {results.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-12 text-center">
              <p className="text-sm text-muted-foreground">No laptops match these filters.</p>
              <button onClick={reset} className="mt-3 text-sm text-foreground underline underline-offset-4">Reset</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((l) => (
                <LaptopCard key={l.id} laptop={l} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-background p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold">Filters</h2>
              <button onClick={() => setOpen(false)} aria-label="Close" className="h-8 w-8 rounded-md border border-border">
                <X className="mx-auto h-4 w-4" />
              </button>
            </div>
            {FilterContent}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-3.5 w-3.5 accent-foreground" />
      <span className="text-muted-foreground hover:text-foreground">{label}</span>
    </label>
  );
}