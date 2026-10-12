import { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ADD_ONS, EVENT_TYPES, PACKAGES, type PackageId } from "@/lib/site-data";
import { SectionTitle } from "./Sections";

const schema = z.object({
  event_date: z.string().min(1, "Pick an event date"),
  name: z.string().trim().min(1, "Your name is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional(),
  notes: z.string().trim().max(3000).optional(),
});

export type QuoteState = { pkg: PackageId; eventType: string };

export function QuoteBuilder({
  value,
  onChange,
}: {
  value: QuoteState;
  onChange: (v: QuoteState) => void;
}) {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [power, setPower] = useState("Not sure");
  const [venue, setVenue] = useState("");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"event_date" | "name" | "email" | "form", string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const pkg = PACKAGES.find((p) => p.id === value.pkg)!;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ event_date: date, name, email, phone, notes });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs as typeof errors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const { error } = await supabase.from("quote_requests").insert({
      package: pkg.name,
      event_type: value.eventType || null,
      event_date: date,
      guests: guests ? Math.max(0, parseInt(guests, 10)) : null,
      power_on_site: power,
      venue: venue.trim() || null,
      add_ons: addOns,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      notes: parsed.data.notes || null,
    });
    setSubmitting(false);
    if (error) {
      setErrors({ form: "Something went wrong sending your request. Please try again." });
      return;
    }
    setDone(true);
  };

  const field = "h-12 rounded-2xl bg-card";

  return (
    <section id="quote" className="mx-auto max-w-6xl px-5 py-20">
      <SectionTitle kicker="Quote builder" before="Build your" word="event" />
      {done ? (
        <div className="glass rounded-[28px] p-10 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-fairway" />
          <h3 className="mt-4 text-4xl font-black">Request received.</h3>
          <p className="mt-2 text-lg text-muted-foreground">
            We'll confirm availability and send your final quote.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <form onSubmit={submit} noValidate className="glass space-y-6 rounded-[28px] p-6 sm:p-8">
            <fieldset>
              <legend className="label-mono mb-3 text-muted-foreground">Package</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {PACKAGES.map((p) => (
                  <label
                    key={p.id}
                    className={`cursor-pointer rounded-2xl border-2 p-4 transition-colors ${
                      value.pkg === p.id ? "border-fairway bg-accent" : "border-transparent bg-card"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pkg"
                      className="sr-only"
                      checked={value.pkg === p.id}
                      onChange={() => onChange({ ...value, pkg: p.id })}
                    />
                    <span className="block font-semibold">{p.name}</span>
                    <span className="font-mono text-sm text-muted-foreground">{p.priceLabel}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="etype">Event type</Label>
                <select
                  id="etype"
                  value={value.eventType}
                  onChange={(e) => onChange({ ...value, eventType: e.target.value })}
                  className={`${field} mt-1.5 w-full border border-input px-3`}
                >
                  <option value="">Choose one</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="date">Event date *</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${field} mt-1.5`} />
                {errors.event_date && <p className="mt-1 text-sm text-destructive">{errors.event_date}</p>}
              </div>
              <div>
                <Label htmlFor="guests">Expected guests</Label>
                <Input id="guests" type="number" min={0} value={guests} onChange={(e) => setGuests(e.target.value)} className={`${field} mt-1.5`} />
              </div>
              <div>
                <Label htmlFor="venue">Venue or town</Label>
                <Input id="venue" value={venue} maxLength={200} onChange={(e) => setVenue(e.target.value)} className={`${field} mt-1.5`} />
              </div>
            </div>

            <fieldset>
              <legend className="label-mono mb-3 text-muted-foreground">Power on site</legend>
              <div className="flex flex-wrap gap-2">
                {["Yes", "Not sure", "No"].map((o) => (
                  <button
                    type="button"
                    key={o}
                    onClick={() => setPower(o)}
                    aria-pressed={power === o}
                    className={`rounded-full px-5 py-2 text-sm font-semibold ${
                      power === o ? "bg-emerald text-emerald-foreground" : "bg-card"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="label-mono mb-3 text-muted-foreground">Add-ons</legend>
              <div className="flex flex-wrap gap-2">
                {ADD_ONS.map((a) => {
                  const on = addOns.includes(a);
                  return (
                    <label
                      key={a}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold ${
                        on ? "border-fairway bg-accent" : "border-input bg-card"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={on}
                        onChange={() => setAddOns(on ? addOns.filter((x) => x !== a) : [...addOns, a])}
                      />
                      {on ? "✓ " : "+ "}
                      {a}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className={`${field} mt-1.5`} />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${field} mt-1.5`} />
                {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={`${field} mt-1.5`} />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1.5 rounded-2xl bg-card" placeholder="Timing, crowd, anything we should know." />
            </div>
            {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
            <Button type="submit" variant="sunset" size="xl" className="w-full" disabled={submitting}>
              {submitting ? "Sending…" : "Request my quote"}
            </Button>
          </form>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[28px] bg-emerald p-7 text-emerald-foreground">
              <p className="label-mono text-emerald-foreground/60">Starting at</p>
              <p className="text-sunset font-display text-7xl font-black">{pkg.priceLabel}</p>
              <dl className="mt-6 space-y-3 text-sm">
                {[
                  ["Package", pkg.name],
                  ["Play time", pkg.playTime],
                  ["Attendant", pkg.attendant],
                  ["Add-ons", String(addOns.length)],
                  ["Date", date || "Not set"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-emerald-foreground/10 pb-3">
                    <dt className="label-mono text-emerald-foreground/60">{k}</dt>
                    <dd className="text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs text-emerald-foreground/60">
                Add-ons and travel are quoted separately. Final price confirmed by email.
              </p>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
