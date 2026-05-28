import laptopsData from "@/data/laptops.json";
import brandsData from "@/data/brands.json";
import categoriesData from "@/data/categories.json";
import topListsData from "@/data/topLists.json";
import type { Laptop, Brand, Category, TopList } from "./types";

export const laptops = laptopsData as Laptop[];
export const brands = brandsData as Brand[];
export const categories = categoriesData as Category[];
export const topLists = topListsData as TopList[];

export function getLaptops(): Laptop[] {
  return laptops;
}

export function getLaptopBySlug(slug: string): Laptop | undefined {
  return laptops.find((l) => l.slug === slug);
}

export function getByCategory(slug: string): Laptop[] {
  return laptops.filter((l) => l.category.includes(slug));
}

export function getTopList(slug: string): TopList | undefined {
  return topLists.find((t) => t.slug === slug);
}

export function getTopListLaptops(slug: string): Laptop[] {
  const list = getTopList(slug);
  if (!list) return [];
  return list.laptopIds
    .map((id) => laptops.find((l) => l.id === id))
    .filter((l): l is Laptop => Boolean(l));
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getSimilar(laptop: Laptop, limit = 4): Laptop[] {
  return laptops
    .filter((l) => l.id !== laptop.id)
    .map((l) => ({
      l,
      score:
        l.category.filter((c) => laptop.category.includes(c)).length * 2 +
        (l.brand === laptop.brand ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.l);
}

export interface FilterQuery {
  brands?: string[];
  os?: string[];
  categories?: string[];
  processorBrands?: string[];
  gpuBrands?: string[];
  minRAM?: number;
  minStorage?: number;
  minDisplay?: number;
  maxDisplay?: number;
  minRefresh?: number;
  minBattery?: number;
  minPriceINR?: number;
  maxPriceINR?: number;
  search?: string;
}

export type SortKey = "popular" | "price-asc" | "price-desc" | "powerful" | "battery" | "latest";

export function filterLaptops(q: FilterQuery, sort: SortKey = "popular"): Laptop[] {
  let result = laptops.filter((l) => {
    if (q.brands?.length && !q.brands.includes(l.brand)) return false;
    if (q.os?.length && !q.os.includes(l.os)) return false;
    if (q.categories?.length && !q.categories.some((c) => l.category.includes(c))) return false;
    if (q.processorBrands?.length && !q.processorBrands.includes(l.processorBrand)) return false;
    if (q.gpuBrands?.length && !q.gpuBrands.includes(l.gpuBrand)) return false;
    if (q.minRAM && l.ramGB < q.minRAM) return false;
    if (q.minStorage && l.storageGB < q.minStorage) return false;
    if (q.minDisplay && l.displaySize < q.minDisplay) return false;
    if (q.maxDisplay && l.displaySize > q.maxDisplay) return false;
    if (q.minRefresh && l.refreshRateHz < q.minRefresh) return false;
    if (q.minBattery && l.batteryHours < q.minBattery) return false;
    if (q.minPriceINR && l.priceINR < q.minPriceINR) return false;
    if (q.maxPriceINR && l.priceINR > q.maxPriceINR) return false;
    if (q.search) {
      const s = q.search.toLowerCase();
      const haystack = [l.name, l.brand, l.processor, l.gpu, ...l.tags, ...l.category].join(" ").toLowerCase();
      if (!haystack.includes(s)) return false;
    }
    return true;
  });

  const perfScore = (l: Laptop) =>
    l.performance.gaming + l.performance.editing + l.performance.coding + l.performance.aiml;

  switch (sort) {
    case "price-asc": result.sort((a, b) => a.priceINR - b.priceINR); break;
    case "price-desc": result.sort((a, b) => b.priceINR - a.priceINR); break;
    case "powerful": result.sort((a, b) => perfScore(b) - perfScore(a)); break;
    case "battery": result.sort((a, b) => b.batteryHours - a.batteryHours); break;
    case "latest": /* keep order */ break;
    case "popular":
    default: result.sort((a, b) => b.rating - a.rating); break;
  }

  return result;
}

export function searchLaptops(query: string, limit = 8): Laptop[] {
  if (!query.trim()) return [];
  return filterLaptops({ search: query }, "popular").slice(0, limit);
}

export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}
export function formatUSD(n: number): string {
  return "$" + n.toLocaleString("en-US");
}