import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Swords,
  Shuffle,
  Crown,
  Trophy,
  Gamepad2,
  Video,
  Code2,
  BrainCircuit,
  Cpu,
  MemoryStick,
  HardDrive,
  BatteryCharging,
  Monitor,
  Zap,
  Scale,
  Star,
  Sparkles,
} from "lucide-react";
import { laptops, formatINR } from "@/lib/data";
import type { Laptop } from "@/lib/data/types";

export const Route = createFileRoute("/laptop-war")({
  head: () => ({
    meta: [
      { title: "Laptop War — Battle two laptops head-to-head · Laptopia" },
      {
        name: "description",
        content:
          "Pick any two laptops and watch them battle across performance, hardware, display, battery and value. A spec-driven knockout showdown.",
      },
      { property: "og:title", content: "Laptop War — Laptopia" },
      {
        property: "og:description",
        content: "Two laptops enter. One wins. Spec-driven head-to-head battles.",
      },
    ],
  }),
  component: LaptopWar,
});

type RoundKey =
  | "Gaming"
  | "Editing"
  | "Coding"
  | "AI / ML"
  | "RAM"
  | "Storage"
  | "Display"
  | "Refresh rate"
  | "Battery"
  | "Weight"
  | "Rating"
  | "Value";

interface Round {
  key: RoundKey;
  icon: React.ComponentType<{ className?: string }>;
  a: number;
  b: number;
  aLabel: string;
  bLabel: string;
  higherWins: boolean;
}

function buildRounds(a: Laptop, b: Laptop): Round[] {
  const perScore = (l: Laptop) =>
    l.performance.gaming + l.performance.editing + l.performance.coding + l.performance.aiml;
  // value = total perf per ₹1000
  const valueA = (perScore(a) / a.priceINR) * 100000;
  const valueB = (perScore(b) / b.priceINR) * 100000;
  const wKg = (l: Laptop) => parseFloat(l.weight) || 0;
  const wA = wKg(a);
  const wB = wKg(b);

  return [
    { key: "Gaming", icon: Gamepad2, a: a.performance.gaming, b: b.performance.gaming, aLabel: `${a.performance.gaming}/100`, bLabel: `${b.performance.gaming}/100`, higherWins: true },
    { key: "Editing", icon: Video, a: a.performance.editing, b: b.performance.editing, aLabel: `${a.performance.editing}/100`, bLabel: `${b.performance.editing}/100`, higherWins: true },
    { key: "Coding", icon: Code2, a: a.performance.coding, b: b.performance.coding, aLabel: `${a.performance.coding}/100`, bLabel: `${b.performance.coding}/100`, higherWins: true },
    { key: "AI / ML", icon: BrainCircuit, a: a.performance.aiml, b: b.performance.aiml, aLabel: `${a.performance.aiml}/100`, bLabel: `${b.performance.aiml}/100`, higherWins: true },
    { key: "RAM", icon: MemoryStick, a: a.ramGB, b: b.ramGB, aLabel: `${a.ramGB} GB`, bLabel: `${b.ramGB} GB`, higherWins: true },
    { key: "Storage", icon: HardDrive, a: a.storageGB, b: b.storageGB, aLabel: `${a.storageGB} GB`, bLabel: `${b.storageGB} GB`, higherWins: true },
    { key: "Display", icon: Monitor, a: a.displaySize, b: b.displaySize, aLabel: `${a.displaySize}"`, bLabel: `${b.displaySize}"`, higherWins: true },
    { key: "Refresh rate", icon: Zap, a: a.refreshRateHz, b: b.refreshRateHz, aLabel: `${a.refreshRateHz} Hz`, bLabel: `${b.refreshRateHz} Hz`, higherWins: true },
    { key: "Battery", icon: BatteryCharging, a: a.batteryHours, b: b.batteryHours, aLabel: `${a.batteryHours} h`, bLabel: `${b.batteryHours} h`, higherWins: true },
    { key: "Weight", icon: Scale, a: wA, b: wB, aLabel: a.weight, bLabel: b.weight, higherWins: false },
    { key: "Rating", icon: Star, a: a.rating, b: b.rating, aLabel: a.rating.toFixed(1), bLabel: b.rating.toFixed(1), higherWins: true },
    { key: "Value", icon: Sparkles, a: valueA, b: valueB, aLabel: `${valueA.toFixed(1)} pts/₹1k`, bLabel: `${valueB.toFixed(1)} pts/₹1k`, higherWins: true },
  ];
}

function winnerOf(r: Round): "a" | "b" | "tie" {
  if (r.a === r.b) return "tie";
  const aWins = r.higherWins ? r.a > r.b : r.a < r.b;
  return aWins ? "a" : "b";
}

function LaptopWar() {
  const [aId, setAId] = useState(laptops[0]?.id ?? "");
  const [bId, setBId] = useState(laptops[1]?.id ?? "");

  const a = laptops.find((l) => l.id === aId);
  const b = laptops.find((l) => l.id === bId);

  const rounds = useMemo(() => (a && b ? buildRounds(a, b) : []), [a, b]);
  const score = useMemo(() => {
    let av = 0, bv = 0, ties = 0;
    rounds.forEach((r) => {
      const w = winnerOf(r);
      if (w === "a") av++; else if (w === "b") bv++; else ties++;
    });
    return { a: av, b: bv, ties };
  }, [rounds]);

  const championId = !a || !b || score.a === score.b ? null : score.a > score.b ? a.id : b.id;

  const shuffle = () => {
    if (laptops.length < 2) return;
    let i = Math.floor(Math.random() * laptops.length);
    let j = Math.floor(Math.random() * laptops.length);
    while (j === i) j = Math.floor(Math.random() * laptops.length);
    setAId(laptops[i].id);
    setBId(laptops[j].id);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-10 sm:px-10 sm:py-14">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" aria-hidden />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Swords className="h-3.5 w-3.5" /> Laptop War
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Two laptops enter. One wins.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            A spec-driven knockout. Pick two contenders and watch them battle across
            performance, hardware, display, battery, and value. Best of {12} rounds takes the crown.
          </p>
          <button
            onClick={shuffle}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            <Shuffle className="h-3.5 w-3.5" /> Surprise me
          </button>
        </div>
      </div>

      {/* Pickers */}
      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_auto_1fr]">
        <FighterCard
          side="Challenger A"
          accent="left"
          laptop={a}
          value={aId}
          onChange={setAId}
          wins={score.a}
          isChampion={championId === a?.id}
        />
        <div className="flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-card shadow-sm">
            <Swords className="h-7 w-7 text-foreground" />
          </div>
        </div>
        <FighterCard
          side="Challenger B"
          accent="right"
          laptop={b}
          value={bId}
          onChange={setBId}
          wins={score.b}
          isChampion={championId === b?.id}
        />
      </div>

      {/* Verdict */}
      {a && b && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid grid-cols-3 divide-x divide-border text-center">
            <Stat label={a.name} value={score.a} highlight={championId === a.id} />
            <Stat label="Ties" value={score.ties} muted />
            <Stat label={b.name} value={score.b} highlight={championId === b.id} />
          </div>
          {championId && (
            <div className="border-t border-border px-6 py-5 text-center">
              <p className="inline-flex items-center justify-center gap-2 text-sm font-medium text-foreground">
                <Crown className="h-4 w-4" />
                Winner:{" "}
                <span className="font-semibold">
                  {championId === a.id ? a.name : b.name}
                </span>
              </p>
            </div>
          )}
          {!championId && score.a === score.b && (
            <div className="border-t border-border px-6 py-5 text-center text-sm text-muted-foreground">
              It's a draw — these two are evenly matched.
            </div>
          )}
        </div>
      )}

      {/* Rounds */}
      {a && b && (
        <section className="mt-12">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-foreground" />
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Round-by-round</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {rounds.map((r) => {
              const w = winnerOf(r);
              const total = r.a + r.b || 1;
              const aPct = (r.a / total) * 100;
              const bPct = (r.b / total) * 100;
              const Icon = r.icon;
              return (
                <div
                  key={r.key}
                  className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/30"
                >
                  <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5" />
                      {r.key}
                    </span>
                    <span>{r.higherWins ? "Higher wins" : "Lower wins"}</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div className={`flex items-center justify-end gap-2 text-sm ${w === "a" ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                      {w === "a" && <Crown className="h-3.5 w-3.5" />}
                      <span>{r.aLabel}</span>
                    </div>
                    <span className="text-[10px] uppercase text-muted-foreground">vs</span>
                    <div className={`flex items-center gap-2 text-sm ${w === "b" ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                      <span>{r.bLabel}</span>
                      {w === "b" && <Crown className="h-3.5 w-3.5" />}
                    </div>
                  </div>
                  <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={w === "a" ? "bg-foreground" : "bg-muted-foreground/40"}
                      style={{ width: `${aPct}%` }}
                    />
                    <div
                      className={w === "b" ? "bg-foreground" : "bg-muted-foreground/40"}
                      style={{ width: `${bPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <p className="mt-10 text-center text-xs text-muted-foreground">
        Want a deeper spec-by-spec table?{" "}
        <Link to="/compare" className="underline underline-offset-2 hover:text-foreground">
          Use the full Compare tool →
        </Link>
      </p>
    </div>
  );
}

function FighterCard({
  side,
  laptop,
  value,
  onChange,
  wins,
  isChampion,
  accent,
}: {
  side: string;
  laptop?: Laptop;
  value: string;
  onChange: (v: string) => void;
  wins: number;
  isChampion: boolean;
  accent: "left" | "right";
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-card p-5 transition-all ${
        isChampion ? "border-foreground shadow-lg" : "border-border"
      }`}
    >
      {isChampion && (
        <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
          <Crown className="h-3 w-3" /> Champion
        </div>
      )}
      <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
        <span>{side}</span>
        <span className="inline-flex items-center gap-1 text-foreground">
          <Trophy className="h-3 w-3" /> {wins} wins
        </span>
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
      >
        {laptops.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </select>

      {laptop && (
        <div className="mt-4 grid grid-cols-[96px_1fr] gap-4">
          <div className={`aspect-[4/3] overflow-hidden rounded-md border border-border bg-background ${accent === "right" ? "order-2" : ""}`}>
            <img src={laptop.images[0]} alt={laptop.name} className="h-full w-full object-cover" />
          </div>
          <div className={accent === "right" ? "order-1 text-right" : ""}>
            <p className="text-xs text-muted-foreground">{laptop.brand}</p>
            <p className="mt-0.5 text-sm font-semibold leading-tight text-foreground">{laptop.name}</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Cpu className="h-3 w-3" /> {laptop.processorBrand}
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">{formatINR(laptop.priceINR)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
  muted,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="px-4 py-5">
      <p className={`text-4xl font-semibold ${highlight ? "text-foreground" : muted ? "text-muted-foreground" : "text-foreground/70"}`}>
        {value}
      </p>
      <p className="mt-1 truncate text-xs text-muted-foreground">{label}</p>
    </div>
  );
}