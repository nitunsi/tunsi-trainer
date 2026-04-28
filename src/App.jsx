import { useState, useEffect, useCallback } from "react";

const SUPABASE_URL = "https://lzecflvfalxkodytnwzf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZWNmbHZmYWx4a29keXRud3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczOTkyNjAsImV4cCI6MjA5Mjk3NTI2MH0.GdZ1KgiA8DxHan5neKnDNasO96dQxGg_PqbMIsHxOtk";

const api = async (path, method = "GET", body = null) => {
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Prefer": method === "POST" ? "return=representation" : "",
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, opts);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

const simpleHash = async (str) => {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
};

// ── LOGIN ─────────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handle = async () => {
    if (!username.trim() || !password.trim()) { setError("Bitte alle Felder ausfüllen."); return; }
    setLoading(true); setError("");
    try {
      const hash = await simpleHash(password);
      if (isRegister) {
        const existing = await api(`users?username=eq.${encodeURIComponent(username)}&select=id`);
        if (existing.length > 0) { setError("Nutzername bereits vergeben."); setLoading(false); return; }
        const result = await api("users", "POST", { username: username.trim(), password_hash: hash, is_admin: false });
        onLogin(result[0]);
      } else {
        const result = await api(`users?username=eq.${encodeURIComponent(username)}&select=*`);
        if (result.length === 0) { setError("Nutzer nicht gefunden."); setLoading(false); return; }
        if (result[0].password_hash !== hash) { setError("Falsches Passwort."); setLoading(false); return; }
        onLogin(result[0]);
      }
    } catch (e) {
      setError("Fehler: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif" }}>
      <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "48px 40px", width: 360, boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🇹🇳</div>
          <h1 style={{ color: "#e8d5b7", fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: 1 }}>Tunsi Trainer</h1>
          <p style={{ color: "rgba(232,213,183,0.5)", fontSize: 13, margin: "6px 0 0" }}>Tunesisches Arabisch lernen</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            placeholder="Nutzername"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handle()}
            style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", color: "#e8d5b7", fontSize: 15, outline: "none", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handle()}
            style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", color: "#e8d5b7", fontSize: 15, outline: "none", boxSizing: "border-box" }}
          />
        </div>
        {error && <p style={{ color: "#ff6b6b", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{error}</p>}
        <button
          onClick={handle}
          disabled={loading}
          style={{ width: "100%", background: "linear-gradient(135deg, #e8a045, #c67c1a)", border: "none", borderRadius: 10, padding: "13px", color: "#1a1a2e", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 14 }}
        >
          {loading ? "..." : isRegister ? "Registrieren" : "Anmelden"}
        </button>
        <p style={{ textAlign: "center", color: "rgba(232,213,183,0.5)", fontSize: 13, cursor: "pointer" }} onClick={() => { setIsRegister(!isRegister); setError(""); }}>
          {isRegister ? "← Bereits registriert? Anmelden" : "Noch kein Konto? Registrieren →"}
        </p>
      </div>
    </div>
  );
}

// ── ADMIN ─────────────────────────────────────────────────────────────────────

function AdminScreen({ user, onBack }) {
  const [lessons, setLessons] = useState([]);
  const [tab, setTab] = useState("lessons");
  const [newLesson, setNewLesson] = useState({ lesson_number: "", title: "" });
  const [newVocab, setNewVocab] = useState({ lesson_id: "", darija: "", arabic_script: "", german: "" });
  const [vocabs, setVocabs] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [msg, setMsg] = useState("");

  const loadLessons = useCallback(async () => {
    const data = await api("lessons?select=*&order=lesson_number.asc");
    setLessons(data);
  }, []);

  const loadVocabs = useCallback(async (lessonId) => {
    const data = await api(`vocabulary?lesson_id=eq.${lessonId}&select=*&order=id.asc`);
    setVocabs(data);
  }, []);

  useEffect(() => { loadLessons(); }, [loadLessons]);

  const addLesson = async () => {
    if (!newLesson.lesson_number || !newLesson.title) return;
    await api("lessons", "POST", { lesson_number: parseInt(newLesson.lesson_number), title: newLesson.title });
    setNewLesson({ lesson_number: "", title: "" });
    setMsg("✓ Lektion hinzugefügt");
    loadLessons();
    setTimeout(() => setMsg(""), 2000);
  };

  const addVocab = async () => {
    if (!newVocab.lesson_id || !newVocab.darija || !newVocab.german) return;
    await api("vocabulary", "POST", {
      lesson_id: parseInt(newVocab.lesson_id),
      darija: newVocab.darija,
      arabic_script: newVocab.arabic_script,
      german: newVocab.german
    });
    setNewVocab({ ...newVocab, darija: "", arabic_script: "", german: "" });
    setMsg("✓ Vokabel hinzugefügt");
    if (selectedLesson === parseInt(newVocab.lesson_id)) loadVocabs(newVocab.lesson_id);
    setTimeout(() => setMsg(""), 2000);
  };

  const deleteVocab = async (id) => {
    await api(`vocabulary?id=eq.${id}`, "DELETE");
    setVocabs(v => v.filter(x => x.id !== id));
  };

  const s = {
    container: { minHeight: "100vh", background: "#0f1923", color: "#e8d5b7", fontFamily: "'Georgia', serif", padding: 24 },
    card: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 24, marginBottom: 20 },
    input: { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "10px 14px", color: "#e8d5b7", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" },
    btn: { background: "linear-gradient(135deg, #e8a045, #c67c1a)", border: "none", borderRadius: 8, padding: "10px 20px", color: "#1a1a2e", fontSize: 14, fontWeight: 700, cursor: "pointer" },
    tab: (active) => ({ padding: "8px 20px", borderRadius: 8, cursor: "pointer", background: active ? "rgba(232,160,69,0.2)" : "transparent", border: active ? "1px solid #e8a045" : "1px solid transparent", color: active ? "#e8a045" : "rgba(232,213,183,0.5)", fontSize: 14 }),
  };

  return (
    <div style={s.container}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <button onClick={onBack} style={{ ...s.btn, background: "rgba(255,255,255,0.1)", color: "#e8d5b7" }}>← Zurück</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>⚙️ Admin-Bereich</h2>
        {msg && <span style={{ color: "#4caf50", fontSize: 14 }}>{msg}</span>}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button style={s.tab(tab === "lessons")} onClick={() => setTab("lessons")}>Lektionen</button>
        <button style={s.tab(tab === "vocab")} onClick={() => setTab("vocab")}>Vokabeln</button>
      </div>

      {tab === "lessons" && (
        <>
          <div style={s.card}>
            <h3 style={{ margin: "0 0 16px", color: "#e8a045", fontSize: 16 }}>Neue Lektion</h3>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: 10, alignItems: "end" }}>
              <div>
                <div style={{ fontSize: 12, color: "rgba(232,213,183,0.5)", marginBottom: 4 }}>Nr.</div>
                <input style={s.input} placeholder="1" value={newLesson.lesson_number} onChange={e => setNewLesson({ ...newLesson, lesson_number: e.target.value })} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: "rgba(232,213,183,0.5)", marginBottom: 4 }}>Titel</div>
                <input style={s.input} placeholder="Begrüßungen" value={newLesson.title} onChange={e => setNewLesson({ ...newLesson, title: e.target.value })} />
              </div>
              <button style={s.btn} onClick={addLesson}>+ Hinzufügen</button>
            </div>
          </div>
          <div style={s.card}>
            <h3 style={{ margin: "0 0 16px", color: "#e8a045", fontSize: 16 }}>Vorhandene Lektionen</h3>
            {lessons.length === 0 && <p style={{ color: "rgba(232,213,183,0.4)", fontSize: 14 }}>Noch keine Lektionen.</p>}
            {lessons.map(l => (
              <div key={l.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: 14 }}>Lektion {l.lesson_number}: {l.title}</span>
                <span style={{ fontSize: 12, color: "rgba(232,213,183,0.4)" }}>ID: {l.id}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "vocab" && (
        <>
          <div style={s.card}>
            <h3 style={{ margin: "0 0 16px", color: "#e8a045", fontSize: 16 }}>Neue Vokabel</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: 10, alignItems: "end" }}>
              <div>
                <div style={{ fontSize: 12, color: "rgba(232,213,183,0.5)", marginBottom: 4 }}>Lektion</div>
                <select style={{ ...s.input }} value={newVocab.lesson_id} onChange={e => setNewVocab({ ...newVocab, lesson_id: e.target.value })}>
                  <option value="">Wählen...</option>
                  {lessons.map(l => <option key={l.id} value={l.id}>L{l.lesson_number}: {l.title}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "rgba(232,213,183,0.5)", marginBottom: 4 }}>Darija</div>
                <input style={s.input} placeholder="ahla" value={newVocab.darija} onChange={e => setNewVocab({ ...newVocab, darija: e.target.value })} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: "rgba(232,213,183,0.5)", marginBottom: 4 }}>Arabisch (optional)</div>
                <input style={s.input} placeholder="أهلا" value={newVocab.arabic_script} onChange={e => setNewVocab({ ...newVocab, arabic_script: e.target.value })} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: "rgba(232,213,183,0.5)", marginBottom: 4 }}>Deutsch</div>
                <input style={s.input} placeholder="Hallo" value={newVocab.german} onChange={e => setNewVocab({ ...newVocab, german: e.target.value })} />
              </div>
              <button style={s.btn} onClick={addVocab}>+</button>
            </div>
          </div>
          <div style={s.card}>
            <h3 style={{ margin: "0 0 16px", color: "#e8a045", fontSize: 16 }}>Vokabeln ansehen</h3>
            <select style={{ ...s.input, maxWidth: 300, marginBottom: 16 }} value={selectedLesson || ""} onChange={e => { const id = parseInt(e.target.value); setSelectedLesson(id); loadVocabs(id); }}>
              <option value="">Lektion wählen...</option>
              {lessons.map(l => <option key={l.id} value={l.id}>L{l.lesson_number}: {l.title}</option>)}
            </select>
            {vocabs.map(v => (
              <div key={v.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", alignItems: "center" }}>
                <span style={{ fontSize: 14 }}>{v.darija}</span>
                <span style={{ fontSize: 14, fontFamily: "serif", direction: "rtl" }}>{v.arabic_script || "—"}</span>
                <span style={{ fontSize: 14, color: "rgba(232,213,183,0.7)" }}>{v.german}</span>
                <button onClick={() => deleteVocab(v.id)} style={{ background: "rgba(255,100,100,0.2)", border: "none", borderRadius: 6, padding: "4px 10px", color: "#ff6b6b", cursor: "pointer", fontSize: 12 }}>✕</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── TRAINER ───────────────────────────────────────────────────────────────────

function TrainerScreen({ user, onLogout, onAdmin }) {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [progress, setProgress] = useState({});
  const [mode, setMode] = useState("menu");
  const [card, setCard] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [queue, setQueue] = useState([]);
  const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0 });

  const loadLessons = useCallback(async () => {
    const data = await api("lessons?select=*&order=lesson_number.asc");
    setLessons(data);
  }, []);

  const loadProgress = useCallback(async () => {
    const data = await api(`progress?user_id=eq.${user.id}&select=*`);
    const map = {};
    data.forEach(p => { map[p.vocabulary_id] = p; });
    setProgress(map);
  }, [user.id]);

  useEffect(() => { loadLessons(); loadProgress(); }, [loadLessons, loadProgress]);

  const startLesson = async (lesson) => {
    setSelectedLesson(lesson);
    const data = await api(`vocabulary?lesson_id=eq.${lesson.id}&select=*&order=id.asc`);
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    setSessionStats({ correct: 0, wrong: 0 });
    setMode("learn");
    setCard(shuffled[0]);
    setFlipped(false);
  };

  const nextCard = (wasCorrect) => {
    const vocabId = card.id;
    const existing = progress[vocabId];
    const newCorrect = (existing?.correct_count || 0) + (wasCorrect ? 1 : 0);
    const newWrong = (existing?.wrong_count || 0) + (wasCorrect ? 0 : 1);

    const upsertProgress = async () => {
      if (existing) {
        await api(`progress?id=eq.${existing.id}`, "PATCH", {
          correct_count: newCorrect,
          wrong_count: newWrong,
          next_review: new Date().toISOString()
        });
      } else {
        await api("progress", "POST", {
          user_id: user.id,
          vocabulary_id: vocabId,
          correct_count: newCorrect,
          wrong_count: newWrong
        });
      }
      loadProgress();
    };
    upsertProgress();

    setSessionStats(s => ({
      correct: s.correct + (wasCorrect ? 1 : 0),
      wrong: s.wrong + (wasCorrect ? 0 : 1)
    }));

    let newQueue;
    if (wasCorrect) {
      newQueue = queue.filter(v => v.id !== vocabId);
    } else {
      newQueue = [...queue.filter(v => v.id !== vocabId), card];
    }

    if (newQueue.length === 0) {
      setMode("done");
    } else {
      setQueue(newQueue);
      setCard(newQueue[0]);
    }
    setFlipped(false);
  };

  const btn = (variant = "primary") => ({
    background: variant === "primary" ? "linear-gradient(135deg, #e8a045, #c67c1a)"
      : variant === "success" ? "linear-gradient(135deg, #4caf50, #388e3c)"
      : variant === "danger" ? "linear-gradient(135deg, #ef5350, #c62828)"
      : "rgba(255,255,255,0.08)",
    border: "none", borderRadius: 10, padding: "12px 24px",
    color: variant === "secondary" ? "#e8d5b7" : "#1a1a2e",
    fontSize: 14, fontWeight: 700, cursor: "pointer"
  });

  const base = { minHeight: "100vh", background: "#0f1923", color: "#e8d5b7", fontFamily: "'Georgia', serif" };

  if (mode === "menu") return (
    <div style={base}>
      <div style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22 }}>🇹🇳</span>
          <span style={{ fontSize: 18, fontWeight: 700 }}>Darija Trainer</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {user.is_admin && <button style={btn("secondary")} onClick={onAdmin}>⚙️ Admin</button>}
          <button style={btn("secondary")} onClick={onLogout}>Abmelden</button>
        </div>
      </div>
      <div style={{ padding: 24 }}>
        <p style={{ color: "rgba(232,213,183,0.5)", marginBottom: 24, fontSize: 14 }}>
          Willkommen, <strong style={{ color: "#e8a045" }}>{user.username}</strong>! Wähle eine Lektion:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {lessons.map(lesson => (
            <div key={lesson.id} onClick={() => startLesson(lesson)}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 20, cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#e8a045"}
              onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
            >
              <div style={{ fontSize: 12, color: "#e8a045", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Lektion {lesson.lesson_number}</div>
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{lesson.title}</div>
              <div style={{ fontSize: 12, color: "rgba(232,213,183,0.4)" }}>Klicken zum Lernen →</div>
            </div>
          ))}
          {lessons.length === 0 && (
            <p style={{ color: "rgba(232,213,183,0.4)", fontSize: 14 }}>
              {user.is_admin ? "Füge Lektionen im Admin-Bereich hinzu." : "Noch keine Lektionen verfügbar."}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  if (mode === "learn" && card) {
    const prog = progress[card.id];
    const mastered = (prog?.correct_count || 0) >= 2;
    return (
      <div style={{ ...base, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 480 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <button style={btn("secondary")} onClick={() => setMode("menu")}>← Zurück</button>
            <span style={{ fontSize: 13, color: "rgba(232,213,183,0.5)" }}>
              ✓ {sessionStats.correct} · ✗ {sessionStats.wrong} · {queue.length} verbleibend
            </span>
          </div>
          <div
            onClick={() => setFlipped(!flipped)}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 40, textAlign: "center", minHeight: 220, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 20 }}
          >
            {!flipped ? (
              <>
                <div style={{ fontSize: 13, color: "#e8a045", marginBottom: 16, textTransform: "uppercase", letterSpacing: 2 }}>Darija</div>
                <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 8 }}>{card.darija}</div>
                {card.arabic_script && <div style={{ fontSize: 24, fontFamily: "serif", direction: "rtl", color: "rgba(232,213,183,0.6)" }}>{card.arabic_script}</div>}
                <div style={{ fontSize: 12, color: "rgba(232,213,183,0.3)", marginTop: 20 }}>Tippen zum Umdrehen</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 13, color: "#4caf50", marginBottom: 16, textTransform: "uppercase", letterSpacing: 2 }}>Deutsch</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{card.german}</div>
                {mastered && <div style={{ fontSize: 12, color: "#e8a045", marginTop: 12 }}>⭐ Bereits gemeistert</div>}
              </>
            )}
          </div>
          {flipped ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button style={btn("danger")} onClick={() => nextCard(false)}>✗ Nicht gewusst</button>
              <button style={btn("success")} onClick={() => nextCard(true)}>✓ Gewusst!</button>
            </div>
          ) : (
            <button style={{ ...btn("secondary"), width: "100%" }} onClick={() => setFlipped(true)}>Lösung zeigen</button>
          )}
        </div>
      </div>
    );
  }

  if (mode === "done") {
    const total = sessionStats.correct + sessionStats.wrong;
    const pct = total > 0 ? Math.round((sessionStats.correct / total) * 100) : 0;
    return (
      <div style={{ ...base, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>{pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"}</div>
          <h2 style={{ color: "#e8a045", fontSize: 24, marginBottom: 8 }}>Lektion abgeschlossen!</h2>
          <p style={{ color: "rgba(232,213,183,0.6)", fontSize: 15, marginBottom: 24 }}>
            {sessionStats.correct} von {total} richtig ({pct}%)
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button style={btn("secondary")} onClick={() => setMode("menu")}>← Zur Übersicht</button>
            <button style={btn()} onClick={() => startLesson(selectedLesson)}>Nochmal üben</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("trainer");

  if (!user) return <LoginScreen onLogin={setUser} />;
  if (screen === "admin" && user.is_admin) return <AdminScreen user={user} onBack={() => setScreen("trainer")} />;
  return <TrainerScreen user={user} onLogout={() => setUser(null)} onAdmin={() => setScreen("admin")} />;
}
