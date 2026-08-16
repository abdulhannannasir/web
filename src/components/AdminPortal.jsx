import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import { COUNTRIES, CATEGORIES } from "../data/seedData.js";
import CoverArt from "./CoverArt.jsx";

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
        <button type="submit" className="btn btn-seal" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function resizeImageToDataUrl(file, maxWidth = 800, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Couldn't read that image."));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error("Couldn't read that file."));
    reader.readAsDataURL(file);
  });
}

function ArticlesTab({ articles, onSetThumbnail, onRemoveThumbnail }) {
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  const handleFile = async (article, file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError(`"${file.name}" isn't an image file.`);
      return;
    }
    setError("");
    setBusyId(article.id);
    try {
      const dataUrl = await resizeImageToDataUrl(file);
      await onSetThumbnail(article.id, dataUrl);
    } catch (e) {
      setError(e.message || "Couldn't process that image — try a different file.");
    } finally {
      setBusyId(null);
    }
  };

  if (articles.length === 0) {
    return <p style={{ fontSize: 13, color: "var(--text-muted)" }}>No published articles yet.</p>;
  }

  return (
    <div>
      <div style={{ background: "var(--gold-soft)", border: "1px solid var(--gold)", borderRadius: 4, padding: "10px 12px", fontSize: 13, marginBottom: 18 }}>
        Every article uses the site's generated cover art by default. Upload your own image here to use it
        instead — the generated design stays as the fallback the moment you remove a custom thumbnail.
      </div>
      {error && <div className="notice">{error}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {articles.map((a) => (
          <div
            key={a.id}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              border: "1px solid var(--rule)",
              borderRadius: 6,
              padding: 12,
              background: "var(--paper-raised)",
            }}
          >
            <div style={{ width: 84, height: 54, borderRadius: 4, overflow: "hidden", flexShrink: 0, border: "1px solid var(--rule)" }}>
              {a.thumbnail ? (
                <img src={a.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : (
                <CoverArt seed={a.id} category={a.category} />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="eyebrow">{a.category}</div>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 14.5,
                  fontWeight: 700,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {a.title}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <label className="btn btn-outline" style={{ fontSize: 12, padding: "7px 12px", cursor: "pointer" }}>
                {busyId === a.id ? "Processing…" : a.thumbnail ? "Change" : "Add thumbnail"}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  disabled={busyId === a.id}
                  onChange={(e) => handleFile(a, e.target.files?.[0])}
                />
              </label>
              {a.thumbnail && (
                <button className="btn btn-outline" style={{ fontSize: 12, padding: "7px 12px" }} onClick={() => onRemoveThumbnail(a.id)}>
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIDraftsTab({ drafts, onPublish, onDiscard, onGenerate, generating, generateError }) {
  const [expanded, setExpanded] = useState(null);
  const [edits, setEdits] = useState({});
  const [verified, setVerified] = useState({});
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const startEdit = (d) => {
    setExpanded(d.id);
    setEdits((e) => ({ ...e, [d.id]: { title: d.title, category: d.category, excerpt: d.excerpt, body: d.body, author: d.author || "Abdul Hannan Nasir" } }));
  };
  const updateEdit = (id, key) => (e) => setEdits((prev) => ({ ...prev, [id]: { ...prev[id], [key]: e.target.value } }));

  const submitGenerate = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onGenerate(topic.trim(), category);
    setTopic("");
  };

  return (
    <div>
      <div style={{ background: "var(--gold-soft)", border: "1px solid var(--gold)", borderRadius: 4, padding: "12px 14px", fontSize: 13, marginBottom: 20 }}>
        <strong>AI-generated content.</strong> Nothing here is public. Every draft requires you to confirm you've
        checked its citations and legal claims before it can be published — verify against the linked sources (or
        independently, for anything auto-generated later without live search grounding) before publishing.
      </div>

      <form onSubmit={submitGenerate} style={{ border: "1px solid var(--rule)", borderRadius: 4, padding: 14, marginBottom: 24, background: "var(--paper-raised)" }}>
        <div style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Generate a new draft</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic (e.g. 'recent SBP fintech guidance')" style={{ padding: "9px 10px", border: "1px solid var(--rule)", borderRadius: 3, fontSize: 13.5 }} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: "9px 10px", border: "1px solid var(--rule)", borderRadius: 3, fontSize: 13.5 }}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-seal" disabled={generating} style={{ fontSize: 13 }}>
          {generating ? "Generating…" : "Generate draft"}
        </button>
        {generateError && <div style={{ color: "var(--seal-dark)", fontSize: 12.5, marginTop: 8 }}>{generateError}</div>}
        <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 8 }}>
          Requires an ANTHROPIC_API_KEY set in your deployment's environment variables. This path does not use live
          web search — treat every claim and citation as unverified until you check it yourself.
        </div>
      </form>

      {drafts.length === 0 && <p style={{ fontSize: 13, color: "var(--text-muted)" }}>No AI drafts pending.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {drafts.map((d) => {
          const isOpen = expanded === d.id;
          const e = edits[d.id] || d;
          const isVerified = !!verified[d.id];
          return (
            <div key={d.id} style={{ border: "1px solid var(--rule)", borderRadius: 4, padding: 16, background: "var(--paper-raised)" }}>
              <div className="eyebrow">{d.category}</div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 16, margin: "4px 0" }}>{d.title}</h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>{d.excerpt}</p>

              {d.sources && d.sources.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)", marginBottom: 4 }}>Sources to verify:</div>
                  {d.sources.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: 12.5, color: "var(--seal)", marginBottom: 2 }}>
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              )}

              {!isOpen && (
                <button className="btn btn-outline" style={{ fontSize: 12.5, padding: "7px 12px" }} onClick={() => startEdit(d)}>
                  Review &amp; edit
                </button>
              )}

              {isOpen && (
                <div>
                  <div className="field">
                    <label>Title</label>
                    <input value={e.title} onChange={updateEdit(d.id, "title")} />
                  </div>
                  <div className="field">
                    <label>Author</label>
                    <input value={e.author} onChange={updateEdit(d.id, "author")} />
                  </div>
                  <div className="field">
                    <label>Excerpt</label>
                    <textarea value={e.excerpt} onChange={updateEdit(d.id, "excerpt")} rows={2} />
                  </div>
                  <div className="field">
                    <label>Body</label>
                    <textarea value={e.body} onChange={updateEdit(d.id, "body")} rows={12} />
                  </div>

                  <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, marginBottom: 14, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={isVerified}
                      onChange={(ev) => setVerified((v) => ({ ...v, [d.id]: ev.target.checked }))}
                      style={{ marginTop: 3 }}
                    />
                    I have verified every citation, statute reference, and factual claim in this draft.
                  </label>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      className="btn btn-seal"
                      style={{ fontSize: 13, padding: "8px 14px", opacity: isVerified ? 1 : 0.4, cursor: isVerified ? "pointer" : "not-allowed" }}
                      disabled={!isVerified}
                      onClick={() => onPublish(d.id, e)}
                    >
                      Publish
                    </button>
                    <button className="btn btn-outline" style={{ fontSize: 13, padding: "8px 14px" }} onClick={() => onDiscard(d.id)}>
                      Discard
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
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
        <button type="submit" className="btn btn-seal">
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
            <button onClick={() => onRemove(s.id)} style={{ background: "none", border: "none", color: "var(--seal)", fontSize: 12 }}>
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
  const tabs = ["Articles", "Submissions", "News Wire", "Legislative Updates", "Sponsored Content", "AI Drafts", "Messages"];
  return (
    <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--rule)", marginBottom: 24 }}>
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          style={{
            background: "none",
            border: "none",
            borderBottom: active === t ? "2px solid var(--seal)" : "2px solid transparent",
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
            <a href={s.attachment.dataUrl} download={s.attachment.name} style={{ fontSize: 12.5, color: "var(--seal)" }}>
              📎 {s.attachment.name}
            </a>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button className="btn btn-seal" style={{ fontSize: 13, padding: "8px 14px" }} onClick={() => onApprove(s)}>
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
        <button className="btn btn-seal" type="submit">
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
              <button onClick={() => onRemove(c, item.id)} style={{ background: "none", border: "none", color: "var(--seal)", fontSize: 12 }}>
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
  aiDrafts,
  generatingDraft,
  generateDraftError,
  articles,
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
  onGenerateDraft,
  onPublishDraft,
  onDiscardDraft,
  onSetThumbnail,
  onRemoveThumbnail,
}) {
  const [tab, setTab] = useState("Articles");

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
      {tab === "Articles" && (
        <ArticlesTab articles={articles} onSetThumbnail={onSetThumbnail} onRemoveThumbnail={onRemoveThumbnail} />
      )}
      {tab === "Submissions" && (
        <SubmissionsTab submissions={submissions} onApprove={onApproveSubmission} onReject={onRejectSubmission} />
      )}
      {tab === "News Wire" && <WireTab data={newsWire} onAdd={onAddNews} onRemove={onRemoveNews} />}
      {tab === "Legislative Updates" && <WireTab data={legislative} onAdd={onAddLegislative} onRemove={onRemoveLegislative} />}
      {tab === "Sponsored Content" && (
        <SponsoredTab items={sponsored} onAdd={onAddSponsored} onToggle={onToggleSponsored} onRemove={onRemoveSponsored} />
      )}
      {tab === "AI Drafts" && (
        <AIDraftsTab
          drafts={aiDrafts}
          onPublish={onPublishDraft}
          onDiscard={onDiscardDraft}
          onGenerate={onGenerateDraft}
          generating={generatingDraft}
          generateError={generateDraftError}
        />
      )}
      {tab === "Messages" && <MessagesTab messages={messages} />}
    </div>
  );
}
