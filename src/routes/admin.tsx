import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Road 2 Scratch" },
      { name: "description", content: "Quote request dashboard for Road 2 Scratch." },
      { property: "og:title", content: "Admin · Road 2 Scratch" },
      { property: "og:description", content: "Quote request dashboard for Road 2 Scratch." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);
  if (!ready) return null;
  return (
    <div className="min-h-screen px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-2xl font-black uppercase">
          Road <span className="text-sunset">2</span> Scratch · Admin
        </p>
        {session ? <Quotes session={session} /> : <Login />}
      </div>
    </div>
  );
}

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (error) setMsg(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password: pw,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setMsg(error ? error.message : "Check your email to confirm your account.");
    }
  };
  return (
    <form onSubmit={submit} className="glass mx-auto mt-16 max-w-sm space-y-4 rounded-[28px] p-8">
      <h1 className="text-4xl font-black">{mode === "in" ? "Sign in" : "Create account"}</h1>
      <div>
        <Label htmlFor="em">Email</Label>
        <Input id="em" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="pw">Password</Label>
        <Input id="pw" type="password" required minLength={8} value={pw} onChange={(e) => setPw(e.target.value)} className="mt-1.5" />
      </div>
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      <Button type="submit" variant="sunset" className="w-full">
        {mode === "in" ? "Sign in" : "Sign up"}
      </Button>
      <button type="button" className="w-full text-sm underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {mode === "in" ? "Need an account? Sign up" : "Have an account? Sign in"}
      </button>
    </form>
  );
}

function Quotes({ session }: { session: Session }) {
  const [rows, setRows] = useState<Tables<"quote_requests">[] | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  useEffect(() => {
    (async () => {
      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!role);
      if (!role) return;
      const { data } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });
      setRows(data ?? []);
    })();
  }, [session.user.id]);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-5xl font-black">Quote <span className="text-sunset">requests</span></h1>
        <Button variant="emerald" onClick={() => supabase.auth.signOut()}>Sign out</Button>
      </div>
      {isAdmin === false && (
        <p className="glass mt-8 rounded-2xl p-6">
          Signed in as {session.user.email}, but this account doesn't have admin access yet.
        </p>
      )}
      {rows && rows.length === 0 && <p className="mt-8 text-muted-foreground">No requests yet.</p>}
      <div className="mt-8 grid gap-4">
        {rows?.map((r) => (
          <div key={r.id} className="glass rounded-[24px] p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-xl font-bold">{r.name} · <span className="font-normal">{r.package}</span></p>
              <p className="label-mono text-muted-foreground">Event {r.event_date} · sent {new Date(r.created_at).toLocaleDateString()}</p>
            </div>
            <p className="mt-2 text-sm">
              <a className="underline" href={`mailto:${r.email}`}>{r.email}</a>
              {r.phone && <> · {r.phone}</>}
            </p>
            <p className="label-mono mt-3 text-muted-foreground">
              {[r.event_type, r.venue, r.guests != null && `${r.guests} guests`, r.power_on_site && `Power: ${r.power_on_site}`]
                .filter(Boolean)
                .join(" · ")}
            </p>
            {r.add_ons.length > 0 && <p className="mt-2 text-sm">Add-ons: {r.add_ons.join(", ")}</p>}
            {r.notes && <p className="mt-2 text-sm text-muted-foreground">{r.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
