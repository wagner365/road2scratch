import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const NAMES = ["Jordan M.", "Priya S.", "Chris T.", "Dana K.", "Alex R.", "Sam W."];

function randomBoard() {
  return NAMES.map((n) => ({ n, ft: +(2 + Math.random() * 18).toFixed(1) }))
    .sort((a, b) => a.ft - b.ft)
    .slice(0, 4);
}

export function Hero() {
  const [board, setBoard] = useState([
    { n: "Jordan M.", ft: 3.4 },
    { n: "Priya S.", ft: 6.1 },
    { n: "Chris T.", ft: 9.8 },
    { n: "Dana K.", ft: 12.2 },
  ]);
  const [shot, setShot] = useState({ carry: 162, speed: 118, pin: 14 });

  useEffect(() => {
    const id = setInterval(() => {
      setBoard(randomBoard());
      setShot({
        carry: 130 + Math.round(Math.random() * 70),
        speed: 100 + Math.round(Math.random() * 40),
        pin: 2 + Math.round(Math.random() * 25),
      });
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="bg-hero relative -mt-[5.5rem] overflow-hidden pt-36 pb-20 text-emerald-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="label-mono text-fairway">Mobile golf simulator · Hosted events</p>
          <h1 className="mt-4 text-6xl font-black sm:text-7xl lg:text-8xl">
            The golf bay <span className="text-sunset">comes to you.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-emerald-foreground/80">
            A climate-controlled simulator trailer, a live leaderboard and an attendant who runs
            the whole thing. We park at your outing, office party or backyard and turn it into a
            tournament.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="sunset" size="xl">
              <a href="#quote">Get a quote</a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#packages">See packages</a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Packages from $499", "Closest-to-pin & longest drive", "Custom company branding"].map((t) => (
              <span key={t} className="glass-dark label-mono rounded-full px-3 py-1.5">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:rotate-2">
          <div className="glass-dark rounded-[28px] p-4">
            <div className="relative overflow-hidden rounded-[20px] bg-emerald">
              <svg viewBox="0 0 400 220" className="block w-full" aria-hidden>
                <defs>
                  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--sun-orange)" stopOpacity="0.45" />
                    <stop offset="1" stopColor="var(--emerald)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="trace" x1="0" x2="1">
                    <stop offset="0" stopColor="var(--sun-yellow)" />
                    <stop offset="0.5" stopColor="var(--sun-orange)" />
                    <stop offset="1" stopColor="var(--sun-coral)" />
                  </linearGradient>
                </defs>
                <rect width="400" height="220" fill="url(#sky)" />
                <path d="M0 170 Q120 140 220 158 T400 150 V220 H0Z" fill="var(--fairway)" opacity="0.55" />
                <path d="M0 190 Q160 170 400 185 V220 H0Z" fill="var(--fairway)" opacity="0.85" />
                <line x1="330" y1="150" x2="330" y2="118" stroke="var(--emerald-foreground)" strokeWidth="2" />
                <path d="M330 118 L348 124 L330 130Z" fill="var(--sun-coral)" />
                <path
                  className="animate-tracer"
                  d="M40 195 Q170 -10 325 150"
                  fill="none"
                  stroke="url(#trace)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <div className="grid grid-cols-3 border-t border-emerald-foreground/10">
                {[
                  ["Carry", shot.carry, "yds"],
                  ["Ball speed", shot.speed, "mph"],
                  ["To pin", shot.pin, "ft"],
                ].map(([l, v, u]) => (
                  <div key={l as string} className="p-3 text-center">
                    <div className="label-mono text-emerald-foreground/60">{l}</div>
                    <div className="font-display text-3xl font-black">
                      {v}
                      <span className="ml-1 font-mono text-xs text-emerald-foreground/60">{u}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-[20px] bg-emerald-foreground/5 p-4">
              <div className="flex items-center justify-between">
                <span className="label-mono">Closest to pin</span>
                <span className="label-mono flex items-center gap-1.5 text-fairway">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-fairway" /> Live
                </span>
              </div>
              <ol className="mt-3 space-y-2">
                {board.map((r, i) => (
                  <li key={r.n} className="flex items-center justify-between text-sm">
                    <span>
                      <span className="mr-3 font-mono text-emerald-foreground/50">{i + 1}</span>
                      {r.n}
                    </span>
                    <span className={i === 0 ? "font-mono font-bold text-sunset" : "font-mono"}>
                      {r.ft} ft
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="label-mono mt-3 text-center text-emerald-foreground/50">
              Sample leaderboard for illustration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
