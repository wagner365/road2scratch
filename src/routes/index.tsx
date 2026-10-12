import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import {
  ClosingCta,
  Faq,
  Footer,
  HowItWorks,
  Packages,
  Stats,
  Ticker,
  VenueInfo,
  WhoBooks,
} from "@/components/site/Sections";
import { QuoteBuilder, type QuoteState } from "@/components/site/QuoteBuilder";
import type { PackageId } from "@/lib/site-data";

const TITLE = "Road 2 Scratch | Mobile Golf Simulator Rentals for Events";
const DESC =
  "A climate-controlled golf simulator trailer, live leaderboard and on-site attendant for corporate events, golf outings, weddings and parties. Packages from $499.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [quote, setQuote] = useState<QuoteState>({ pkg: "event", eventType: "" });
  const pick = (pkg: PackageId, eventType?: string) => {
    setQuote((q) => ({ pkg, eventType: eventType ?? q.eventType }));
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Stats />
        <WhoBooks onQuote={pick} />
        <Packages onChoose={(p) => pick(p)} />
        <HowItWorks />
        <VenueInfo />
        <QuoteBuilder value={quote} onChange={setQuote} />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
