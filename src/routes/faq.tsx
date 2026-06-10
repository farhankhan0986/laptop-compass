import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Laptopia" },
      { name: "description", content: "Answers to common questions about Laptopia's reviews, rankings, and tools." },
      { property: "og:title", content: "FAQ — Laptopia" },
      { property: "og:description", content: "How we test, how we rank, and how to get the most out of Laptopia." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQ,
});

const items = [
  { q: "How does Laptopia rank laptops?", a: "Rankings combine spec analysis, benchmark data, build quality, battery life, display quality, and real-world feel. Every category is weighted to match its intended buyer — gaming weights GPU heavily, ultrabooks weight portability." },
  { q: "Do you accept paid placements?", a: "No. Brands cannot pay to appear on a top list or to influence a score. Some outbound links may be affiliate links, but rankings are decided before any link is added." },
  { q: "How often are rankings updated?", a: "Whenever new hardware ships or pricing shifts meaningfully. Most lists are revisited every quarter." },
  { q: "What is Laptop War?", a: "A head-to-head spec battle. Pick two laptops and we score them across 12 rounds — gaming, editing, coding, AI, RAM, storage, display, refresh, battery, weight, rating, and value. Winner takes the crown." },
  { q: "Where do you get pricing from?", a: "Prices are pulled from manufacturer sites and major retailers. Always confirm on the seller's page before purchasing — prices fluctuate constantly." },
  { q: "Can I suggest a laptop to review?", a: "Absolutely. Send us a note from the Contact page with the model and why it deserves a spot." },
];

function FAQ() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card">
          <HelpCircle className="h-6 w-6" />
        </span>
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Help</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">Frequently asked</h1>
        <p className="mt-3 text-sm text-muted-foreground">Everything you might want to know about how Laptopia works.</p>
      </div>
      <div className="mt-10 rounded-2xl border border-border bg-card px-6">
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-base font-medium text-foreground">{item.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}