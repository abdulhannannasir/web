import { useState } from "react";
import { CATEGORIES } from "../data/seedData.js";

const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024; // 2MB — kv_store rows aren't meant for large blobs

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function WriteForUs({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    email: "",
    category: CATEGORIES[0],
    body: "",
  });
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setAttachment(null);
      return;
    }
    if (file.size > MAX_ATTACHMENT_BYTES) {
      setError(`"${file.name}" is over the 2MB attachment limit.`);
      e.target.value = "";
      return;
    }
    setError("");
    const dataUrl = await fileToDataUrl(file);
    setAttachment({ name: file.name, type: file.type, size: file.size, dataUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim() || !form.email.trim() || !form.body.trim()) {
      setError("Please fill in title, name, email, and the article body.");
      return;
    }
    setError("");
    await onSubmit({
      id: `sub-${Date.now()}`,
      ...form,
      attachment,
      submittedAt: new Date().toISOString(),
      status: "pending",
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="wrap" style={{ padding: "50px 20px", maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 30 }}>Thank you</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15 }}>
          Your submission has been received and is awaiting editorial review. We'll reach out at the email you
          provided if it's selected for publication.
        </p>
      </div>
    );
  }

  return (
    <div className="wrap" style={{ padding: "40px 20px 60px", maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, marginBottom: 6 }}>Write for Legal Perspective</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 28, fontSize: 15, lineHeight: 1.6 }}>
        We publish original legal analysis and commentary from practitioners, academics, and students. Submissions
        are reviewed editorially before publication.
      </p>

      <div style={{ border: "1px solid var(--rule)", borderRadius: 4, padding: 20, marginBottom: 32, background: "var(--paper-raised)" }}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 18, marginTop: 0 }}>Submission guidelines</h2>
        <ul style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text)", paddingLeft: 20, margin: 0 }}>
          <li>1,000–2,500 words. Original, unpublished work only.</li>
          <li>Cite authorities precisely — statute, case name, and reporter citation where applicable.</li>
          <li>Written in a clear, professional register aimed at a legally literate but non-specialist reader.</li>
          <li>Include a two- to three-sentence author bio in the body of your submission.</li>
          <li>Attachments (draft PDF/DOCX, supporting exhibits) are optional — under 2MB.</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        {error && <div className="notice">{error}</div>}
        <div className="field">
          <label htmlFor="title">Article title</label>
          <input id="title" value={form.title} onChange={update("title")} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="field">
            <label htmlFor="author">Your name</label>
            <input id="author" value={form.author} onChange={update("author")} />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} onChange={update("email")} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <select id="category" value={form.category} onChange={update("category")}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="body">Article body</label>
          <textarea id="body" value={form.body} onChange={update("body")} rows={12} />
        </div>
        <div className="field">
          <label htmlFor="attachment">Attachment (optional)</label>
          <input id="attachment" type="file" onChange={handleFile} />
          {attachment && (
            <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
              {attachment.name} ({Math.round(attachment.size / 1024)} KB)
            </span>
          )}
        </div>
        <button type="submit" className="btn btn-oxblood">
          Submit for review
        </button>
      </form>
    </div>
  );
}
