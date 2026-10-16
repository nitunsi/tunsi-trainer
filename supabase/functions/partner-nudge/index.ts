import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
webpush.setVapidDetails("mailto:ni.karsten@gmail.com", Deno.env.get("VAPID_PUBLIC")!, Deno.env.get("VAPID_PRIVATE")!);

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, apikey, content-type",
  "access-control-allow-methods": "POST, OPTIONS",
};
const json = (b: unknown, status = 200) => Response.json(b, { status, headers: CORS });

// Manuelle Erinnerung an Semia (Vokabeln prüfen). Text kommt aus der App (von Nils vorher bearbeitet).
// Nur an Semias eigene Geräte; Text höchstens 140 Zeichen; höchstens eine Nachricht alle 60 Sekunden.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return json({ error: "POST only" }, 405);
  const { text } = await req.json().catch(() => ({}));
  const body = String(text ?? "").trim().slice(0, 140);
  if (!body) return json({ sent: 0, reason: "empty text" }, 400);

  const { data: user } = await sb.from("users").select("id,last_reminder_sent_at").eq("username", "Semia").eq("is_partner", true).single();
  if (!user) return json({ sent: 0, reason: "no user" });
  const now = new Date();
  if (user.last_reminder_sent_at && now.getTime() - new Date(user.last_reminder_sent_at).getTime() < 60e3)
    return json({ sent: 0, reason: "too soon" }, 429);

  const { data: subs } = await sb.from("push_subscriptions").select("*").eq("user_id", user.id);
  if (!subs?.length) return json({ sent: 0, reason: "no subscriptions" });
  const payload = JSON.stringify({ title: "تونسي", body });
  let sent = 0;
  const errors: string[] = [];
  for (const s of subs) {
    try { await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload, { urgency: "high", TTL: 24 * 3600 }); sent++; }
    catch (e) { errors.push(String(e.statusCode ?? e.message)); if (e.statusCode === 404 || e.statusCode === 410) await sb.from("push_subscriptions").delete().eq("id", s.id); }
  }
  if (sent > 0) await sb.from("users").update({ last_reminder_sent_at: now.toISOString() }).eq("id", user.id);
  return json({ sent, errors });
});
