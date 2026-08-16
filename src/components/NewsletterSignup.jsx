import { useState } from "react";

export default function NewsletterSignup({ onSubscribe }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | done | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    await onSubscribe(email.trim());
    setStatus("done");
    setEmail("");
  };

  return (
    <div
      style={{
        border: "1px solid #33302d",
        borderRadius: 14,
        background: "#1c1917",
        color: "#f5f5f4",
        padding: 22,
        marginBottom: 24,
      }}
    >
      <div style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 19, marginBottom: 6 }}>Weekly digest</div>
      <p style={{ fontSize: 13, color: "#a8a29e", marginBottom: 14, lineHeight: 1.5 }}>
        The week's legal analysis and regulatory updates, in one email.
      </p>
      {status === "done" ? (
        <div style={{ background: "rgba(192,125,43,0.15)", border: "1px solid rgba(192,125,43,0.4)", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#f5f5f4" }}>
          You're subscribed. Thanks!
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "11px 12px",
              border: "1px solid #44403c",
              borderRadius: 8,
              fontSize: 13.5,
              background: "#292524",
              color: "#f5f5f4",
            }}
          />
          <button
            type="submit"
            style={{
              background: "var(--gold)",
              color: "#1c1917",
              border: "none",
              borderRadius: 8,
              padding: "11px 14px",
              fontSize: 13.5,
              fontWeight: 700,
              cursor: "pointer",
              transition: "opacity var(--dur-fast) var(--ease)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            Subscribe
          </button>
        </form>
      )}
      {status === "error" && <div style={{ color: "#f0a0a0", fontSize: 12, marginTop: 8 }}>Enter a valid email.</div>}
    </div>
  );
}
