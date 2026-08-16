import { useState } from "react";

export default function Contact({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    await onSubmit({ id: `msg-${Date.now()}`, ...form, sentAt: new Date().toISOString() });
    setSent(true);
  };

  if (sent) {
    return (
      <div className="wrap" style={{ padding: "50px 20px", maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 28 }}>Message sent</h1>
        <p style={{ color: "var(--text-muted)" }}>Thanks for reaching out — we'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="wrap" style={{ padding: "40px 20px 60px", maxWidth: 560, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, marginBottom: 8 }}>Contact</h1>
      <p style={{ color: "var(--text-muted)", fontSize: 15, marginBottom: 28 }}>
        Questions about a story, a correction, sponsorship, or anything else — send us a note.
      </p>
      <form onSubmit={handleSubmit}>
        {error && <div className="notice">{error}</div>}
        <div className="field">
          <label htmlFor="c-name">Name</label>
          <input id="c-name" value={form.name} onChange={update("name")} />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" type="email" value={form.email} onChange={update("email")} />
        </div>
        <div className="field">
          <label htmlFor="c-message">Message</label>
          <textarea id="c-message" value={form.message} onChange={update("message")} rows={6} />
        </div>
        <button type="submit" className="btn btn-oxblood">
          Send message
        </button>
      </form>
    </div>
  );
}
