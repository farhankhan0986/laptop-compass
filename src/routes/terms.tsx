import { createFileRoute } from "@tanstack/react-router";
import { Scale } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Laptopia" },
      { name: "description", content: "The terms that govern your use of Laptopia." },
      { property: "og:title", content: "Terms of Use — Laptopia" },
      { property: "og:description", content: "Fair, simple terms for using Laptopia's content and tools." },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  const sections = [
    { h: "Use of content", p: "All editorial content — reviews, rankings, photography — is owned by Laptopia. Personal, non-commercial use is welcome; please credit and link back when quoting." },
    { h: "Accuracy", p: "We work hard to keep specs and prices accurate, but errors happen. Always confirm details on the manufacturer's site before purchasing." },
    { h: "Affiliate disclosure", p: "Some buy links may earn us a commission at no cost to you. This never affects our scoring or rankings." },
    { h: "No warranties", p: "Laptopia is provided as-is. We are not liable for purchase decisions made based on our content." },
    { h: "Changes", p: "These terms may evolve. Material changes will be highlighted on this page." },
  ];
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card">
          <Scale className="h-5 w-5" />
        </span>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Legal</p>
      </div>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">Terms of Use</h1>
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