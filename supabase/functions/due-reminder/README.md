# due-reminder

Supabase Edge Function (Projekt `lzecflvfalxkodytnwzf`, `verify_jwt` aus, Schutz über den Header `x-cron-secret`).
Schickt Nils per Web-Push „N fällig: X Vokabeln, Y Kurs-Übungen“, höchstens alle 6 Stunden, nur wenn etwas fällig ist.

- Fällig = `next_review` vor Beginn des nächsten Berliner Kalendertags (wie „Fällig“ in der App).
- `?test=1` sendet ohne Sperre und ändert `last_reminder_sent_at` nicht.
- Geheimnisse (`CRON_SECRET`, `VAPID_PUBLIC`, `VAPID_PRIVATE`) liegen nur in Supabase, nicht hier.
- Deployen: Quelltext in Supabase einspielen (Dashboard oder MCP `deploy_edge_function`); dieser Ordner ist die Vorlage.
