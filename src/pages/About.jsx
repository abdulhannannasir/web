export default function About() {
  return (
    <div className="wrap" style={{ padding: "40px 20px 60px", maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: 34, marginBottom: 8 }}>About Legal Perspective</h1>
      <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
        Legal Perspective is an independent legal publishing platform. We cover constitutional law, corporate and
        commercial practice, litigation, technology and data law, tax and regulatory developments, and comparative
        law — written for a legally literate but non-specialist reader.
      </p>

      <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, marginTop: 32 }}>What we publish</h2>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text)" }}>
        Original analysis, commentary, and explainers from practitioners, academics, and students. Every submission
        is reviewed editorially before publication — see our{" "}
        <a href="#write" style={{ color: "var(--seal)" }}>
          Write for Us
        </a>{" "}
        guidelines for what we look for.
      </p>

      <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, marginTop: 32 }}>Editorial independence</h2>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text)" }}>
        Legal Perspective is not affiliated with, and does not represent, any single law firm. Sponsored content on
        this site is always clearly labeled and reviewed for accuracy; it never influences our independent editorial
        coverage.
      </p>

      <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, marginTop: 32 }}>A note on our content</h2>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text)" }}>
        Nothing published here is legal advice, and reading it does not create a lawyer-client relationship with
        Legal Perspective or any contributor. For advice on a specific matter, consult a qualified lawyer licensed
        in the relevant jurisdiction.
      </p>
    </div>
  );
}
