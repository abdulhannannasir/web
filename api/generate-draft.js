// POST /api/generate-draft
// Body: { topic: string, category: string }
// Returns: { title, category, excerpt, body, caveat }
//
// Requires ANTHROPIC_API_KEY set as an environment variable in your Vercel
// project (Settings → Environment Variables). This function does NOT use
// live web search — the model can only draw on its training data, which
// means dates, case citations, and figures may be stale or wrong. Every
// draft this produces lands in the Admin Portal's "AI Drafts" tab as
// unpublished and requires a human to check it — see the verification
// checkbox there — before it can go live.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error:
        "ANTHROPIC_API_KEY is not configured on this deployment. Add it under your Vercel project's Environment Variables.",
    });
    return;
  }

  const { topic, category } = req.body || {};
  if (!topic || typeof topic !== "string") {
    res.status(400).json({ error: "Missing 'topic' in request body." });
    return;
  }

  const system = `You draft article ideas for Legal Perspective, a legal commentary and news site. You are NOT a verified source of legal fact — you have no live access to current case law, statutes, or news, and your training data has a cutoff. Follow these rules strictly:

1. Never invent a specific case name, citation, statute section number, or SRO/notification number unless you are highly confident it is real. If you are not certain, write the point in general terms and explicitly say "(verify this citation)" inline rather than fabricating a plausible-looking one.
2. Prefer describing legal principles, trends, and general frameworks over specific numbers, dates, or figures you cannot be sure are current.
3. Write in clear, professional prose for a legally literate but non-specialist reader, 400-700 words.
4. Output ONLY valid JSON, no markdown fences, no preamble, in this exact shape:
{"title": "...", "excerpt": "...", "body": "...paragraphs separated by \\n\\n...", "caveat": "one sentence on what in this draft most needs independent verification"}`;

  const userMsg = `Category: ${category || "Commentary & Analysis"}\nTopic: ${topic}\n\nDraft the article now, following the system rules exactly.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 2000,
        system,
        messages: [{ role: "user", content: userMsg }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      res.status(502).json({ error: `Anthropic API error: ${errText}` });
      return;
    }

    const data = await response.json();
    const textBlock = (data.content || []).find((b) => b.type === "text");
    if (!textBlock) {
      res.status(502).json({ error: "No text content returned by the model." });
      return;
    }

    let parsed;
    try {
      const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      res.status(502).json({ error: "Model did not return valid JSON.", raw: textBlock.text });
      return;
    }

    res.status(200).json({
      title: parsed.title || "Untitled draft",
      category: category || "Commentary & Analysis",
      excerpt: parsed.excerpt || "",
      body: parsed.body || "",
      caveat: parsed.caveat || "This draft has not been checked against live sources — verify all claims before publishing.",
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
