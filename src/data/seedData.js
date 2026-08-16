export const CATEGORIES = [
  "Constitutional Law",
  "Corporate & Commercial",
  "Litigation & Dispute Resolution",
  "Technology & Data Law",
  "Tax & Regulatory",
  "International & Comparative",
];

export const COUNTRIES = ["Pakistan", "USA", "UK"];

function makeArticle(id, title, category, excerpt, author, daysAgo) {
  const date = new Date(Date.now() - daysAgo * 86400000).toISOString();
  return {
    id,
    title,
    category,
    excerpt,
    body:
      excerpt +
      "\n\nThis is placeholder body text for a seed article. Publish real articles from the Admin Portal — once you post the first one through Supabase, this seed content is replaced automatically.",
    author,
    date,
    status: "published",
  };
}

export const SEED_ARTICLES = [
  makeArticle(
    "seed-1",
    "Reading Article 102 TFEU in the Age of Digital Gatekeepers",
    "International & Comparative",
    "How EU competition law's abuse-of-dominance doctrine is adapting to online multisided platforms.",
    "Editorial Desk",
    1
  ),
  makeArticle(
    "seed-2",
    "The Punjab Labour Code 2026: Twenty-Six Statutes, One Framework",
    "Constitutional Law",
    "A first look at Punjab's consolidated labour legislation and what it means for employers.",
    "Editorial Desk",
    2
  ),
  makeArticle(
    "seed-3",
    "Performance Bond Encashment: What Contractors Need to Know",
    "Corporate & Commercial",
    "Unpacking the legal standard for restraining unconditional bank guarantee encashment in Pakistan.",
    "Editorial Desk",
    3
  ),
  makeArticle(
    "seed-4",
    "AI in the Courtroom: Pakistan's New Judicial Guidelines",
    "Technology & Data Law",
    "NJPMC's guidance on AI use in the judiciary, set against nine comparative jurisdictions.",
    "Editorial Desk",
    4
  ),
  makeArticle(
    "seed-5",
    "Absorption vs. Additive Theory Under the Income Tax Ordinance 2001",
    "Tax & Regulatory",
    "A technical look at how minimum tax provisions interact with normal tax liability.",
    "Editorial Desk",
    5
  ),
  makeArticle(
    "seed-6",
    "Bills of Lading as Prima Facie, Not Conclusive, Evidence of Title",
    "Litigation & Dispute Resolution",
    "Tracing the doctrine from Lickbarrow v. Mason through Pakistani case law.",
    "Editorial Desk",
    6
  ),
];

export const SEED_NEWS = {
  Pakistan: [
    { id: "n-pk-1", headline: "SECP issues revised guidance on beneficial ownership reporting", date: new Date().toISOString() },
  ],
  USA: [
    { id: "n-us-1", headline: "SEC proposes updated disclosure rules for AI-related risk factors", date: new Date().toISOString() },
  ],
  UK: [
    { id: "n-uk-1", headline: "CMA opens market study into cloud infrastructure services", date: new Date().toISOString() },
  ],
};

export const SEED_LEGISLATIVE = {
  Pakistan: [
    { id: "l-pk-1", headline: "Punjab Labour Code 2026 receives Governor's assent", date: new Date().toISOString() },
  ],
  USA: [
    { id: "l-us-1", headline: "Federal AI transparency bill advances out of committee", date: new Date().toISOString() },
  ],
  UK: [
    { id: "l-uk-1", headline: "Data (Use and Access) Act amendments laid before Parliament", date: new Date().toISOString() },
  ],
};
