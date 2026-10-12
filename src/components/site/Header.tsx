import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "#events", label: "Events" },
  { href: "#packages", label: "Packages" },
  { href: "#how", label: "How it works" },
  { href: "#venue", label: "Venue info" },
  { href: "#faq", label: "FAQ" },
];

export function Logo() {
  return (
    <a href="#top" className="font-display text-2xl font-black uppercase tracking-wide">
      Road <span className="text-sunset">2</span> Scratch
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a
        href="#quote"
        className="bg-sunset block px-4 py-2 text-center text-sm font-semibold text-emerald"
      >
        Now booking founding events for launch season. Request a date →
      </a>
      <header className="sticky top-3 z-50 mx-3 mt-3 sm:mx-6">
        <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3">
          <Logo />
          <div className="hidden items-center gap-6 lg:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-semibold hover:text-fairway">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="sunset" className="hidden sm:inline-flex">
              <a href="#quote">Book a date</a>
            </Button>
            <button
              className="grid h-10 w-10 place-items-center rounded-full lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-4 lg:hidden">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 font-semibold hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <Button asChild variant="sunset" className="mt-2 w-full">
              <a href="#quote" onClick={() => setOpen(false)}>Book a date</a>
            </Button>
          </div>
        )}
      </header>
    </>
  );
}
