import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import { COUNTRIES } from "../data/seedData.js";

function LoginForm({ onSignedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    onSignedIn(data.user);
  };

  return (
    <div className="wrap" style={{ maxWidth: 380, margin: "60px auto", padding: "0 20px" }}>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: 26, marginBottom: 4 }}>Admin Portal</h1>
      <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 24 }}>
        Sign in with the admin account created in your Supabase project.
      </p>
      <form onSubmit={handleSubmit}>
        {error && <div className="notice">{error}</div>}
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-oxblood" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function SponsoredTab({ items, onAdd, onToggle, onRemove }) {
  const [form, setForm] = useState({ firmName: "", title: "", blurb: "", link: "" });
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.firmName.trim() || !form.title.trim()) return;
    onAdd({ id: `sp-${Date.now()}`, ...form, active: true, createdAt: new Date().toISOString() });
    setForm({ firmName: "", title: "", blurb: "", link: "" });
  };

  return (
    <div>
      <form onSubmit={submit} style={{ border: "1px solid var(--rule)", borderRadius: 4, padding: 16, marginBottom: 24, background: "var(--paper-raised)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="field">
            <label>Firm / sponsor name</label>
            <input value={form.firmName} onChange={update("firmName")} />
          </div>
          <div className="field">
            <label>Link URL</label>
            <input value={form.link} onChange={update("link")} placeholder="https://" />
          </div>
        </div>
        <div className="field">
          <label>Headline</label>
          <input value={form.title} onChange={update("title")} />
        </div>
        <div className="field">
          <label>Blurb</label>
          <textarea value={form.blurb} onChange={update("blurb")} rows={3} />
        </div>
        <button type="submit" className="btn btn-oxblood">
          Add sponsored placement
        </button>
      </form>

      {items.length === 0 && <p style={{ fontSize: 13, color: "var(--text-muted)" }}>No sponsored placements yet.</p>}
      {items.map((s) => (
        <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--rule)" }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600 }}>{s.title}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.firmName} · {s.active ? "Live" : "Paused"}</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => onToggle(s.id)} className="btn btn-outline" style={{ fontSize: 12, padding: "6px 10px" }}>
              {s.active ? "Pause" : "Activate"}
            </button>
            <button onClick={() => onRemove(s.id)} style={{ background: "none", border: "none", color: "var(--oxblood)", fontSize: 12 }}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function MessagesTab({ messages }) {
  if (messages.length === 0) return <p style={{ fontSize: 13, color: "var(--text-muted)" }}>No messages yet.</p>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {messages.map((m) => (
        <div key={m.id} style={{ border: "1px solid var(--rule)", borderRadius: 4, padding: 14, background: "var(--paper-raised)" }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name} · <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>{m.email}</span></div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>{new Date(m.sentAt).toLocaleString()}</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.6 }}>{m.message}</div>
        </div>
      ))}
    </div>
  );
}

function Tabs({ active, onChange }) {
  const tabs = ["Submissions", "News Wire", "Legislative Updates", "Sponsored Content", "Messages"];
  return (
    <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--rule)", marginBottom: 24 }}>
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          style={{
            background: "none",
            border: "none",
            borderBottom: active === t ? "2px solid var(--oxblood)" : "2px solid transparent",
            padding: "10px 4px",
            marginRight: 20,
            fontWeight: active === t ? 700 : 500,
            fontSize: 14,
            color: active === t ? "var(--ink)" : "var(--text-muted)",
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function SubmissionsTab({ submissions, onApprove, onReject }) {
  const pending = submissions.filter((s) => s.status === "pending");
  if (pending.length === 0) {
    return <p style={{ color: "var(--text-muted)", fontSize: 14 }}>No pending submissions.</p>;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {pending.map((s) => (
        <div key={s.id} style={{ border: "1px solid var(--rule)", borderRadius: 4, padding: 16, background: "var(--paper-raised)" }}>
          <div className="eyebrow">{s.category}</div>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: 17, margin: "4px 0" }}>{s.title}</h3>
          <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginBottom: 10 }}>
            {s.author} · {s.email} · {new Date(s.submittedAt).toLocaleDateString()}
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--text)", maxHeight: 120, overflow: "auto" }}>{s.body}</p>
          {s.attachment && (
            <a href={s.attachment.dataUrl} download={s.attachment.name} style={{ fontSize: 12.5, color: "var(--oxblood)" }}>
              📎 {s.attachment.name}
            </a>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button className="btn btn-oxblood" style={{ fontSize: 13, padding: "8px 14px" }} onClick={() => onApprove(s)}>
              Approve &amp; publish
            </button>
            <button className="btn btn-outline" style={{ fontSize: 13, padding: "8px 14px" }} onClick={() => onReject(s)}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function WireTab({ data, onAdd, onRemove }) {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [headline, setHeadline] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!headline.trim()) return;
    onAdd(country, { id: `w-${Date.now()}`, headline: headline.trim(), date: new Date().toISOString() });
    setHeadline("");
  };

  return (
    <div>
      <form onSubmit={submit} style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ padding: "10px 12px", border: "1px solid var(--rule)", borderRadius: 3 }}>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="Headline"
          style={{ flex: 1, padding: "10px 12px", border: "1px solid var(--rule)", borderRadius: 3 }}
        />
        <button className="btn btn-oxblood" type="submit">
          Post
        </button>
      </form>

      {COUNTRIES.map((c) => (
        <div key={c} style={{ marginBottom: 20 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            {c}
          </div>
          {(data[c] || []).length === 0 && <p style={{ fontSize: 13, color: "var(--text-muted)" }}>No items yet.</p>}
          {(data[c] || []).map((item) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--rule)", fontSize: 13.5 }}>
              <span>{item.headline}</span>
              <button onClick={() => onRemove(c, item.id)} style={{ background: "none", border: "none", color: "var(--oxblood)", fontSize: 12 }}>
                Remove
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function AdminPortal({
  user,
  submissions,
  newsWire,
  legislative,
  sponsored,
  messages,
  onSignedIn,
  onSignOut,
  onApproveSubmission,
  onRejectSubmission,
  onAddNews,
  onRemoveNews,
  onAddLegislative,
  onRemoveLegislative,
  onAddSponsored,
  onToggleSponsored,
  onRemoveSponsored,
}) {
  const [tab, setTab] = useState("Submissions");

  if (!user) return <LoginForm onSignedIn={onSignedIn} />;

  return (
    <div className="wrap" style={{ padding: "32px 20px 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 28, margin: 0 }}>Admin Dashboard</h1>
        <button className="btn btn-outline" onClick={onSignOut} style={{ fontSize: 13 }}>
          Sign out
        </button>
      </div>
      <Tabs active={tab} onChange={setTab} />
      {tab === "Submissions" && (
        <SubmissionsTab submissions={submissions} onApprove={onApproveSubmission} onReject={onRejectSubmission} />
      )}
      {tab === "News Wire" && <WireTab data={newsWire} onAdd={onAddNews} onRemove={onRemoveNews} />}
      {tab === "Legislative Updates" && <WireTab data={legislative} onAdd={onAddLegislative} onRemove={onRemoveLegislative} />}
      {tab === "Sponsored Content" && (
        <SponsoredTab items={sponsored} onAdd={onAddSponsored} onToggle={onToggleSponsored} onRemove={onRemoveSponsored} />
      )}
      {tab === "Messages" && <MessagesTab messages={messages} />}
    </div>
  );
}
