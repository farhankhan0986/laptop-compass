import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Laptopia" },
      { name: "description", content: "Laptopia is an independent laptop review and discovery platform." },
      { property: "og:title", content: "About — Laptopia" },
      { property: "og:description", content: "Independent. Editorial. Built for laptop enthusiasts." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">About</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">Built for laptop enthusiasts.</h1>
      <div className="mt-8 space-y-5 text-base text-muted-foreground">
        <p>
          Laptopia is an independent platform for discovering, comparing, and choosing the right laptop —
          whether you're a gamer, a creator, a student, or a professional.
        </p>
        <p>
          We don't take paid placements. Every ranking reflects real-world performance, build quality, and value.
          Our top lists are updated as new hardware ships.
        </p>
        <p>
          The site is editorial by design. Clean type, no neon, no marketing fluff — just the information you
          need to make a confident decision.
        </p>
      </div>
    </div>
  );
}