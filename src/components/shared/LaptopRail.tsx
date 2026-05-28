import type { Laptop } from "@/lib/data/types";
import { LaptopCard } from "@/components/laptop/LaptopCard";

export function LaptopRail({ laptops }: { laptops: Laptop[] }) {
  return (
    <>
      {/* Mobile: horizontal scroll */}
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:hidden">
        {laptops.map((l) => (
          <div key={l.id} className="w-[78%] shrink-0 snap-start">
            <LaptopCard laptop={l} />
          </div>
        ))}
      </div>
      {/* Desktop: grid */}
      <div className="hidden grid-cols-2 gap-5 sm:grid lg:grid-cols-4">
        {laptops.slice(0, 4).map((l) => (
          <LaptopCard key={l.id} laptop={l} />
        ))}
      </div>
    </>
  );
}