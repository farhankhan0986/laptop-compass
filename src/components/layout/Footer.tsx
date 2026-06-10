import { Link } from "@tanstack/react-router";
import { Mail, Github, Twitter, Laptop2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-gradient-to-b from-background to-muted/30">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[80%] -translate-x-1/2 rounded-full bg-foreground/[0.04] blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
                <Laptop2 className="h-4 w-4" />
              </span>
              Laptopia
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Editorial laptop reviews, head-to-head battles, and rankings — for creators, gamers, students, and professionals.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <SocialBtn href="mailto:hello@laptopia.dev" label="Email"><Mail className="h-4 w-4" /></SocialBtn>
              <SocialBtn href="#" label="Twitter"><Twitter className="h-4 w-4" /></SocialBtn>
              <SocialBtn href="#" label="GitHub"><Github className="h-4 w-4" /></SocialBtn>
            </div>
          </div>

          <FooterCol title="Discover" links={[
            { to: "/laptops", label: "All laptops" },
            { to: "/top-lists", label: "Top lists" },
            { to: "/categories", label: "Categories" },
            { to: "/compare", label: "Compare" },
            { to: "/laptop-war", label: "Laptop War" },
          ]} />

          <FooterCol title="Company" links={[
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/faq", label: "FAQ" },
          ]} />

          <FooterCol title="Resources" links={[
            { to: "/faq", label: "Buying guide" },
            { to: "/laptop-war", label: "Spec battles" },
            { to: "/top-lists", label: "Best picks" },
          ]} />

          <FooterCol title="Legal" links={[
            { to: "/privacy", label: "Privacy" },
            { to: "/terms", label: "Terms" },
            { to: "/contact", label: "Contact us" },
          ]} />
        </div>
      </div>
      <div className="relative border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6">
          <span>© {new Date().getFullYear()} Laptopia. All rights reserved.</span>
          <span>Crafted for laptop enthusiasts · Independent & ad-free.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.to + l.label}>
            <Link
              to={l.to}
              className="group inline-flex items-center gap-1 text-foreground/80 transition-colors hover:text-foreground"
            >
              <span className="h-px w-0 bg-foreground transition-all duration-300 group-hover:w-3" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialBtn({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:text-foreground"
    >
      {children}
    </a>
  );
}