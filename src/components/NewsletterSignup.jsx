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
    <div style={{ border: "1px solid var(--rule)", borderRadius: 4, background: "var(--paper-raised)", padding: 20, marginBottom: 24 }}>
      <div style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Weekly digest</div>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
        The week's legal analysis and regulatory updates, in one email.
      </p>
      {status === "done" ? (
        <div className="notice" style={{ marginBottom: 0 }}>You're subscribed. Thanks!</div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ flex: 1, padding: "9px 10px", border: "1px solid var(--rule)", borderRadius: 3, fontSize: 13 }}
          />
          <button type="submit" className="btn btn-oxblood" style={{ fontSize: 13, padding: "9px 14px" }}>
            Subscribe
          </button>
        </form>
      )}
      {status === "error" && <div style={{ color: "var(--oxblood-dark)", fontSize: 12, marginTop: 6 }}>Enter a valid email.</div>}
    </div>
  );
}
