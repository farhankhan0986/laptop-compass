import { Link } from "@tanstack/react-router";
import { Laptop, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SearchCommand } from "@/components/search/SearchCommand";

const nav = [
  { to: "/", label: "Home" },
  { to: "/laptops", label: "Laptops" },
  { to: "/categories", label: "Categories" },
  { to: "/top-lists", label: "Top Lists" },
  { to: "/compare", label: "Compare" },
  { to: "/laptop-war", label: "Laptop War" },
  { to: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="group flex items-center gap-2 text-base font-semibold tracking-tight">
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-foreground to-foreground/70 text-background shadow-sm ring-1 ring-border transition-transform group-hover:scale-105">
              <Laptop className="h-4 w-4" strokeWidth={2.25} />
              <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-background" />
            </span>
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Laptopia</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-accent sm:inline-flex"
          >
            <Search className="h-3.5 w-3.5" />
            Search laptops
            <kbd className="ml-2 rounded border border-border bg-card px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border sm:hidden"
          >
            <Search className="h-4 w-4" />
          </button>
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                activeProps={{ className: "bg-accent text-foreground" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}