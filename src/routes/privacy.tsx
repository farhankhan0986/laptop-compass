import { createFileRoute } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Laptopia" },
      { name: "description", content: "How Laptopia handles your data, cookies, and analytics." },
      { property: "og:title", content: "Privacy Policy — Laptopia" },
      { property: "og:description", content: "Our approach to privacy: minimal data, no selling, full transparency." },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  const sections = [
    { h: "What we collect", p: "Basic, anonymous usage data — page views, device type, and referrer — to understand how the site is used. No accounts, no personal profiles." },
    { h: "Cookies", p: "We use minimal first-party cookies for theme preference and analytics. You can clear them any time from your browser settings." },
    { h: "Affiliate links", p: "Some outbound buy links may be affiliate links. They never influence our rankings or scoring methodology." },
    { h: "Third parties", p: "We don't sell or share your data. Analytics are aggregated and anonymized." },
    { h: "Your rights", p: "Email us to request information removal or to ask any privacy question. We'll respond within 7 days." },
  ];
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card">
          <Shield className="h-5 w-5" />
        </span>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Legal</p>
      </div>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: June 2026</p>
      <div className="mt-10 space-y-6">
        {sections.map((s) => (
          <section key={s.h} className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-foreground">{s.h}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}