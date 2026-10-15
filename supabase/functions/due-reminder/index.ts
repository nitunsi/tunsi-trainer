import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
webpush.setVapidDetails("mailto:ni.karsten@gmail.com", Deno.env.get("VAPID_PUBLIC")!, Deno.env.get("VAPID_PRIVATE")!);

const berlinDay = (d: Date) => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin" }).format(d);
// Beginn des nächsten Berliner Kalendertags als UTC-Zeitpunkt (fällig = bis Ende des heutigen Berliner Tages).
// Vom heutigen Berliner Datum aus um einen Tag weiter, nicht "jetzt + 36 h": das landete abends schon beim übernächsten Tag.
export function cutoffUtc(now: Date): string {
  const today = berlinDay(now);
  const day = berlinDay(new Date(new Date(`${today}T12:00:00Z`).getTime() + 24 * 3600e3));
  for (let h = 21; h <= 23; h++) {                       // 00:00 Berlin = 22:00 oder 23:00 UTC des Vortags
    const t = new Date(`${day}T00:00:00Z`).getTime() - (24 - h) * 3600e3;
    if (berlinDay(new Date(t)) === day && berlinDay(new Date(t - 1)) !== day) return new Date(t).toISOString().slice(0, 19).replace("T", " ");
  }
  return `${day} 00:00:00`;
}

Deno.serve(async (req) => {
  if (req.headers.get("x-cron-secret") !== Deno.env.get("CRON_SECRET")) return new Response("forbidden", { status: 403 });
  const test = new URL(req.url).searchParams.get("test") === "1";   // Testmodus: ohne Sperre, ändert last_reminder_sent_at nicht
  const now = new Date();
  const { data: user } = await sb.from("users").select("id,last_reminder_sent_at").eq("username", "Nils").single();
  if (!user) return Response.json({ sent: 0, reason: "no user" });
  // höchstens ein Push alle 6 Stunden (morgens und abends je einer)
  if (!test && user.last_reminder_sent_at && now.getTime() - new Date(user.last_reminder_sent_at).getTime() < 6 * 3600e3)
    return Response.json({ sent: 0, reason: "sent less than 6h ago" });

  const cut = cutoffUtc(now);
  const cnt = async (table: string) => {
    const { count } = await sb.from(table).select("id", { count: "exact", head: true }).eq("user_id", user.id).not("next_review", "is", null).lt("next_review", cut);
    return count ?? 0;
  };
  const vocab = await cnt("progress"), course = await cnt("course_exercise_progress");
  const total = vocab + course;
  if (total === 0 && !test) return Response.json({ sent: 0, reason: "nothing due" });

  const { data: subs } = await sb.from("push_subscriptions").select("*").eq("user_id", user.id);
  if (!subs?.length) return Response.json({ sent: 0, reason: "no subscriptions", total });
  const payload = JSON.stringify({ title: "تونسي", body: `${test ? "Test: " : ""}${total} fällig: ${vocab} Vokabeln, ${course} Kurs-Übungen`, badge: total });
  let sent = 0;
  const errors: string[] = [];
  for (const s of subs) {
    try { await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload, { urgency: "high", TTL: 6 * 3600 }); sent++; }
    catch (e) { errors.push(String(e.statusCode ?? e.message)); if (e.statusCode === 404 || e.statusCode === 410) await sb.from("push_subscriptions").delete().eq("id", s.id); }
  }
  if (!test && sent > 0) await sb.from("users").update({ last_reminder_sent_at: now.toISOString() }).eq("id", user.id);
  return Response.json({ sent, vocab, course, errors, test });
});
