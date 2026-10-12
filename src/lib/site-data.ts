export type PackageId = "quick" | "event" | "premium";

export const PACKAGES: {
  id: PackageId;
  name: string;
  price: number;
  priceLabel: string;
  fit: string;
  playTime: string;
  attendant: string;
  features: string[];
  featured?: boolean;
}[] = [
  {
    id: "quick",
    name: "Quick Play",
    price: 499,
    priceLabel: "$499",
    fit: "Birthdays & small parties",
    playTime: "2 hours",
    attendant: "Setup crew",
    features: ["2 hours of play", "Delivery & setup", "Free play", "Basic contest"],
  },
  {
    id: "event",
    name: "Road 2 Scratch Event",
    price: 799,
    priceLabel: "$799",
    fit: "Private & community events",
    playTime: "4 hours",
    attendant: "On-site attendant",
    features: ["4 hours of play", "On-site attendant", "Live leaderboard", "Closest-to-pin contest"],
    featured: true,
  },
  {
    id: "premium",
    name: "Corporate / Premium",
    price: 1199,
    priceLabel: "$1,199+",
    fit: "Companies, outings & weddings",
    playTime: "4+ hours",
    attendant: "Dedicated host",
    features: ["4+ hours of play", "Logo on leaderboard", "Hosted contests", "Premium presentation"],
  },
];

export const ADD_ONS = [
  "Extra hours",
  "Custom logo leaderboard",
  "Prize package",
  "Longest-drive contest",
  "Closest-to-pin tournament",
  "Sponsor signage",
  "Second attendant",
];

export const EVENT_TYPES = [
  "Corporate event",
  "Golf / charity outing",
  "Wedding",
  "Birthday / private party",
  "Brewery / venue night",
  "School event",
  "Community event",
  "Other",
];

export const SEGMENTS: {
  id: string;
  tab: string;
  title: string;
  blurb: string;
  bullets: string[];
  pkg: PackageId;
  eventType: string;
}[] = [
  {
    id: "corporate",
    tab: "Corporate",
    title: "Team events people actually show up for",
    blurb: "Skip the trivia night. Put a tee box in the parking lot and let the leaderboard do the team building.",
    bullets: [
      "Your logo on the live leaderboard",
      "Contests that mix departments fast",
      "Hosted start to finish, zero HR lift",
      "Rain or shine, it's enclosed",
    ],
    pkg: "premium",
    eventType: "Corporate event",
  },
  {
    id: "outings",
    tab: "Golf & charity outings",
    title: "The hole everyone talks about after",
    blurb: "Add a sponsor hole that runs all day. Closest-to-pin and longest drive, tracked and settled live.",
    bullets: [
      "Sponsor signage on site",
      "Closest-to-pin tournament",
      "Prize packages for fundraising",
      "Keeps guests busy between flights",
    ],
    pkg: "premium",
    eventType: "Golf / charity outing",
  },
  {
    id: "private",
    tab: "Private parties & weddings",
    title: "The reception's new favorite corner",
    blurb: "Guests of every skill level grab a club and a drink. The attendant handles the rest.",
    bullets: [
      "No golf experience needed",
      "Attendant runs the queue",
      "Climate-controlled for any season",
      "Looks sharp in photos",
    ],
    pkg: "event",
    eventType: "Wedding",
  },
  {
    id: "venues",
    tab: "Breweries & venues",
    title: "A reason to stay for one more round",
    blurb: "Pull in a crowd on a slow night. We park, plug in and run league-style contests your regulars will chase.",
    bullets: [
      "Draws walk-up traffic",
      "Weekly leaderboard nights",
      "We bring the setup and the host",
      "Minimal footprint, big buzz",
    ],
    pkg: "event",
    eventType: "Brewery / venue night",
  },
];
