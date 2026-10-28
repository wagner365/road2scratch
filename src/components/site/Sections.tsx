import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ADD_ONS, PACKAGES, SEGMENTS, type PackageId } from "@/lib/site-data";
import eventImg from "@/assets/event-placeholder.jpg";

export function SectionTitle({
  kicker,
  before,
  word,
  after = "",
  dark,
}: {
  kicker: string;
  before: string;
  word: string;
  after?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-10">
      <p className={`label-mono ${dark ? "text-fairway" : "text-fairway"}`}>{kicker}</p>
      <h2 className="mt-3 text-5xl font-black sm:text-6xl lg:text-7xl">
        {before} <span className="text-sunset">{word}</span>
        {after}
      </h2>
    </div>
  );
}

const TICKER = [
  "Closest to pin",
  "Longest drive",
  "Live leaderboard",
  "Rain or shine",
  "Corporate events",
  "Golf outings",
  "Weddings",
  "Hosted play",
];

export function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="bg-sunset overflow-hidden py-4 text-emerald" aria-label={TICKER.join(", ")}>
      <div className="animate-ticker flex w-max gap-8 whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="font-display text-2xl font-black uppercase" aria-hidden>
            {t} <span className="ml-8">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stats() {
  const stats: [string, string][] = [
    ["$499", "packages start here"],
    ["4+ hrs", "of hosted play on Premium"],
    ["1 host", "runs contests and the queue"],
    ["0", "rain delays, play is indoors"],
  ];
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-16 lg:grid-cols-4">
      {stats.map(([n, l]) => (
        <div key={l} className="glass lift rounded-[24px] p-6">
          <div className="text-sunset font-display text-5xl font-black sm:text-6xl">{n}</div>
          <div className="label-mono mt-2 text-muted-foreground">{l}</div>
        </div>
      ))}
    </section>
  );
}

export function WhoBooks({ onQuote }: { onQuote: (p: PackageId, eventType?: string) => void }) {
  const [active, setActive] = useState(SEGMENTS[0]!.id);
  const seg = SEGMENTS.find((s) => s.id === active)!;
  const pkg = PACKAGES.find((p) => p.id === seg.pkg)!;
  return (
    <section id="events" className="mx-auto max-w-6xl px-5 py-16">
      <SectionTitle kicker="Who books us" before="Made for your" word="crowd" />
      <div role="tablist" className="flex gap-2 overflow-x-auto pb-2">
        {SEGMENTS.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={s.id === active}
            onClick={() => setActive(s.id)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              s.id === active ? "bg-emerald text-emerald-foreground" : "glass hover:bg-secondary"
            }`}
          >
            {s.tab}
          </button>
        ))}
      </div>
      <div className="glass mt-6 grid gap-8 rounded-[28px] p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h3 className="text-4xl font-black">{seg.title}</h3>
          <p className="mt-4 text-lg text-muted-foreground">{seg.blurb}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {seg.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-fairway" /> {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between rounded-[24px] bg-emerald p-6 text-emerald-foreground">
          <div>
            <p className="label-mono text-emerald-foreground/60">Best fit</p>
            <p className="mt-2 font-display text-3xl font-black uppercase">{pkg.name}</p>
            <p className="text-sunset mt-1 font-display text-5xl font-black">{pkg.priceLabel}</p>
            <p className="mt-2 text-sm text-emerald-foreground/70">{pkg.fit}</p>
          </div>
          <Button variant="sunset" size="xl" className="mt-6" onClick={() => onQuote(seg.pkg, seg.eventType)}>
            Start a quote
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Packages({ onChoose }: { onChoose: (p: PackageId) => void }) {
  return (
    <section id="packages" className="mx-auto max-w-6xl px-5 py-16">
      <SectionTitle kicker="Packages" before="Three ways to" word="play" />
      <div className="grid gap-5 lg:grid-cols-3">
        {PACKAGES.map((p) => (
          <div
            key={p.id}
            className={`lift relative flex flex-col rounded-[28px] p-7 ${
              p.featured ? "bg-emerald text-emerald-foreground lg:-my-4 lg:py-11" : "glass"
            }`}
          >
            {p.featured && (
              <span className="bg-sunset label-mono absolute -top-3 left-7 rounded-full px-3 py-1 font-bold text-emerald">
                Most booked
              </span>
            )}
            <p className="label-mono opacity-70">{p.fit}</p>
            <h3 className="mt-2 text-4xl font-black">{p.name}</h3>
            <p className="mt-4">
              <span className="label-mono opacity-70">Starting at </span>
              <span className="text-sunset font-display text-6xl font-black">{p.priceLabel}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="h-5 w-5 shrink-0 text-fairway" /> {f}
                </li>
              ))}
            </ul>
            <Button
              variant={p.featured ? "sunset" : "emerald"}
              size="xl"
              className="mt-8"
              onClick={() => onChoose(p.id)}
            >
              Choose {p.name.split(" ")[0]}
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <p className="label-mono text-muted-foreground">Add-ons</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ADD_ONS.map((a) => (
            <span key={a} className="glass rounded-full px-4 py-2 text-sm font-semibold">
              + {a}
            </span>
          ))}
        </div>
        <p className="mt-5 max-w-2xl text-sm text-muted-foreground">
          Travel beyond our service radius and add-ons are quoted separately. A deposit reserves your
          date. Evening and holiday rates may apply.
        </p>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps: [string, string][] = [
    ["Tell us the event", "Date, place, crowd size. Two minutes, tops."],
    ["Get your quote", "A clear price with your package and add-ons."],
    ["Lock the date", "Sign the agreement and pay the deposit."],
    ["We roll in", "We level the trailer, run a safety check and calibrate."],
    ["Tee off", "Your attendant runs the queue, contests and leaderboard."],
  ];
  return (
    <section id="how" className="bg-emerald py-20 text-emerald-foreground">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle kicker="How it works" before="Five holes to" word="tee off" dark />
        <ol className="relative grid gap-6 md:grid-cols-5">
          <div className="bg-sunset absolute top-5 right-0 left-0 hidden h-0.5 md:block" aria-hidden />
          {steps.map(([t, d], i) => (
            <li key={t} className="relative">
              <div className="bg-sunset relative grid h-10 w-10 place-items-center rounded-full font-mono font-bold text-emerald">
                {i + 1}
              </div>
              <p className="label-mono mt-4 text-fairway">Hole {i + 1}</p>
              <h3 className="mt-1 text-2xl font-black">{t}</h3>
              <p className="mt-2 text-sm text-emerald-foreground/70">{d}</p>
            </li>
          ))}
        </ol>
        <figure className="relative mt-14 overflow-hidden rounded-[28px]">
          <img
            src={eventImg}
            alt="Guests lining up at a golf simulator trailer at sunset"
            loading="lazy"
            width={1280}
            height={800}
            className="h-72 w-full object-cover sm:h-96"
          />
        </figure>
      </div>
    </section>
  );
}

const CHECKLIST: [string, string][] = [
  ["Parking", "Level space for the trailer plus a guest walk-up area."],
  ["Power", "Shore power access preferred. Generator option available."],
  ["Access", "A clear route for a towed trailer and a venue contact on the day."],
  ["Setup", "We arrive early to set up and calibrate."],
  ["Weather", "Enclosed and climate-controlled. Play goes on."],
  ["Safety", "Enclosed hitting area, impact screen, padding and a marked spectator boundary."],
];
const SPECS: [string, string][] = [
  ["Trailer dimensions", "TBD"],
  ["Power specs", "TBD"],
  ["Setup time", "TBD"],
];

export function VenueInfo() {
  const copy = async () => {
    const text = [
      "Road 2 Scratch – Venue checklist",
      ...CHECKLIST.map(([k, v]) => `• ${k}: ${v}`),
      ...SPECS.map(([k, v]) => `• ${k}: ${v}`),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Venue checklist copied");
    } catch {
      toast.error("Couldn't copy. Try selecting the text instead.");
    }
  };
  return (
    <section id="venue" className="mx-auto max-w-6xl px-5 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle kicker="Venue info" before="What we need" word="on site" />
        <Button variant="emerald" size="xl" onClick={copy} className="mb-10">
          <Copy /> Copy venue checklist
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CHECKLIST.map(([k, v]) => (
          <div key={k} className="glass lift rounded-[24px] p-6">
            <p className="label-mono text-fairway">{k}</p>
            <p className="mt-2 text-lg">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {SPECS.map(([k, v]) => (
          <span key={k} className="label-mono rounded-full border border-dashed border-input px-4 py-2">
            {k}: <strong className="text-sun-coral">{v}</strong>
          </span>
        ))}
      </div>
    </section>
  );
}

const FAQS: [string, string][] = [
  ["Do guests need golf experience?", "Not at all. The simulator works for first-timers and scratch golfers alike, and the attendant helps everyone get a swing in."],
  ["What happens if it rains?", "Nothing changes. Play happens inside an enclosed, climate-controlled trailer, so there are no rain delays."],
  ["How far do you travel?", "We cover a local service radius at no extra charge. Events farther out get a travel fee included in your quote."],
  ["How do I hold a date?", "Request a quote, sign the event agreement and pay the deposit. Your date is locked once both are in."],
  ["Can we put our company logo on it?", "Yes. Custom logo leaderboards are included with Corporate / Premium and available as an add-on for other packages."],
  ["Is it safe for a crowd?", "Yes. Hitting happens in an enclosed area with an impact screen and padding, and we mark a spectator boundary. The attendant manages the queue the whole time."],
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 py-20">
      <SectionTitle kicker="FAQ" before="Fair" word="questions" />
      <Accordion type="single" collapsible className="space-y-3">
        {FAQS.map(([q, a]) => (
          <AccordionItem key={q} value={q} className="glass rounded-[24px] border-none px-6">
            <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
              {q}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="bg-hero py-24 text-center text-emerald-foreground">
      <div className="mx-auto max-w-4xl px-5">
        <h2 className="text-6xl font-black sm:text-8xl">
          Your event. <span className="text-sunset">Our tee box.</span>
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="sunset" size="xl">
            <a href="#quote">Book a date</a>
          </Button>
          <Button asChild variant="glass" size="xl">
            <a href="#packages">Compare packages</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-emerald border-t border-emerald-foreground/10 py-10 text-emerald-foreground/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm sm:flex-row sm:justify-between">
        <p>© 2026 Road 2 Scratch · Mobile Golf Simulator</p>
        <div className="label-mono flex flex-wrap gap-x-6 gap-y-2">
          <a href="tel:4403900641">(440) 390-0641</a>
          <span>@road2scratch</span>
          <span>Service area: Midwest</span>
        </div>
      </div>
    </footer>
  );
}
