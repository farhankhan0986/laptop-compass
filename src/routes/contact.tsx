import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Laptopia" },
      { name: "description", content: "Get in touch with the Laptopia team." },
      { property: "og:title", content: "Contact — Laptopia" },
      { property: "og:description", content: "Reach out about partnerships, corrections, or tips." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Contact</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">Get in touch.</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Have a tip, correction, or partnership idea? Drop us a line.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-4">
        <input type="text" placeholder="Your name" className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-foreground/40" />
        <input type="email" placeholder="Email" className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-foreground/40" />
        <textarea placeholder="Message" rows={5} className="w-full rounded-md border border-border bg-card p-3 text-sm outline-none focus:border-foreground/40" />
        <button className="h-11 rounded-md bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90">
          Send message
        </button>
      </form>
    </div>
  );
}