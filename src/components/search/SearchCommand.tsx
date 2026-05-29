import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { searchLaptops } from "@/lib/data";

export function SearchCommand({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const results = searchLaptops(q, 8);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-lg border border-border bg-background shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search laptops, brands, processors…"
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button onClick={() => onOpenChange(false)} aria-label="Close" className="rounded-md p-1 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {q && results.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">No matches for "{q}".</p>
          )}
          {!q && (
            <p className="p-6 text-center text-xs text-muted-foreground">Try "MacBook", "RTX 4070", or "ThinkPad".</p>
          )}
          {results.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                onOpenChange(false);
                navigate({ to: "/laptops/$slug", params: { slug: l.slug } });
              }}
              className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-accent"
            >
              <img src={l.images[0]} alt="" className="h-10 w-14 rounded object-cover" loading="lazy" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{l.name}</p>
                <p className="truncate text-xs text-muted-foreground">{l.brand} · {l.processor}</p>
              </div>
              <span className="text-xs text-muted-foreground">★ {l.rating.toFixed(1)}</span>
            </button>
          ))}
        </div>
        <div className="border-t border-border bg-card px-4 py-2 text-[10px] text-muted-foreground">
          <kbd className="rounded border border-border bg-background px-1.5 py-0.5">⌘K</kbd> to open · <kbd className="rounded border border-border bg-background px-1.5 py-0.5">Esc</kbd> to close
        </div>
      </div>
    </div>
  );
}