export const CATEGORIES = [
  "Commentary & Analysis",
  "Laws & Judgments",
  "News & Events",
  "Law FAQs & Guides",
  "Industry Updates",
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
    "Laws & Judgments",
    "A first look at Punjab's consolidated labour legislation and what it means for employers.",
    "Editorial Desk",
    2
  ),
  makeArticle(
    "seed-3",
    "Performance Bond Encashment: What Contractors Need to Know",
    "Commentary & Analysis",
    "Unpacking the legal standard for restraining unconditional bank guarantee encashment in Pakistan.",
    "Editorial Desk",
    3
  ),
  makeArticle(
    "seed-4",
    "AI in the Courtroom: Pakistan's New Judicial Guidelines",
    "Laws & Judgments",
    "NJPMC's guidance on AI use in the judiciary, set against nine comparative jurisdictions.",
    "Editorial Desk",
    4
  ),
  makeArticle(
    "seed-5",
    "Absorption vs. Additive Theory Under the Income Tax Ordinance 2001",
    "Commentary & Analysis",
    "A technical look at how minimum tax provisions interact with normal tax liability.",
    "Editorial Desk",
    5
  ),
  makeArticle(
    "seed-6",
    "Bills of Lading as Prima Facie, Not Conclusive, Evidence of Title",
    "Laws & Judgments",
    "Tracing the doctrine from Lickbarrow v. Mason through Pakistani case law.",
    "Editorial Desk",
    6
  ),
  makeArticle(
    "seed-7",
    "How to Guide: Filing a Consumer Complaint in Pakistan",
    "Law FAQs & Guides",
    "A step-by-step walkthrough for consumers seeking redress under provincial consumer protection law.",
    "Editorial Desk",
    7
  ),
  makeArticle(
    "seed-8",
    "CCP's Merger Control Enforcement Gap: A News Roundup",
    "News & Events",
    "Recent commentary and reporting on enforcement gaps in Pakistan's merger control regime.",
    "Editorial Desk",
    8
  ),
  makeArticle(
    "seed-9",
    "Legal Sector Snapshot: Hiring Trends Across Pakistani Law Firms",
    "Industry Updates",
    "A look at associate hiring, lateral moves, and practice-area growth across major Pakistani firms.",
    "Editorial Desk",
    9
  ),
];

export const SEED_AI_DRAFTS = [
  {
    id: "ai-1",
    title: "What a $25 Billion Legal AI Race Means for Firms Outside Silicon Valley",
    category: "Commentary & Analysis",
    excerpt:
      "Harvey and Legora are chasing a combined $25 billion in valuation. Here's what the funding surge actually signals for smaller markets.",
    body:
      "Two companies now anchor the legal AI industry's valuation story. Harvey, the San Francisco-based legal AI platform, closed a $200 million round at an $11 billion valuation in March 2026 and was reportedly in talks by mid-August to raise again near $15.5 billion, with annualised revenue reported above $350 million. Its Stockholm-based rival Legora closed a $600 million Series D at $5.6 billion in the same window and was separately reported to be in talks to roughly double that figure. Together, the two companies represent one of the fastest valuation run-ups the legal technology sector has seen.\n\nWhat's easy to miss from outside that market is who these tools are actually built for. Harvey and Legora both train primarily on common-law workflows — US and UK litigation, transactional review, common-law drafting conventions. Pakistan runs a common-law system too, but the tooling gap shows up fast in areas like Urdu-language documents, provincial procedural variation, and citation conventions that don't map cleanly onto US/UK training data.\n\nA smaller, less-covered detail is more relevant here: other entrants are explicitly targeting the markets Harvey and Legora don't serve well. Lexroom, for instance, is reportedly building specifically for civil-law markets, and Norm AI has focused on the billable-hour model rather than general drafting. That's the more useful signal for a firm — or a solo practice — in Pakistan: the frontier tools aren't built for this market yet, which is a gap, not a reason to wait. Smaller, regionally-focused legal AI tools are likely to emerge to fill it, the way they have in civil-law Europe.\n\nThe practical takeaway isn't \"adopt AI now\" or \"ignore it.\" It's that the current wave of funded tools solves problems most relevant to large common-law firms with US/UK caseloads — and the tooling gap for South Asian legal markets is itself becoming a known, named opportunity in the industry's own coverage of itself.",
    author: "Editorial Desk",
    sources: [
      { label: "Legal AI Arms Race: Legora Eyes $10B, Harvey Nears $15.5B — TechTimes", url: "https://www.techtimes.com/articles/324348/20260813/legal-ai-arms-race-legora-eyes-10b-harvey-nears-155b-one-month.htm" },
      { label: "Legora in talks to double valuation to $10B — Tech Funding News", url: "https://techfundingnews.com/legora-talks-10b-valuation-financing/" },
      { label: "Top Legal AI Startups Funded in 2026 — AI Funding Tracker", url: "https://aifundingtracker.com/top-legal-ai-startups/" },
    ],
  },
  {
    id: "ai-2",
    title: "SECP's 2026 Amendments: What Changed for Company Filings",
    category: "Laws & Judgments",
    excerpt:
      "Two 2026 SRO notifications expand beneficial-ownership disclosure and introduce mandatory share conversion requirements. Here's what companies need to check.",
    body:
      "The Securities and Exchange Commission of Pakistan issued a series of regulatory notifications through 2026 that materially expand compliance obligations for companies registered under the Companies Act, 2017. Two stand out. S.R.O. 328(I)/2026 introduces a mandatory share conversion requirement. S.R.O. 57(I)/2026 proposes draft amendments to Regulation 92, expanding the shareholding-pattern and beneficial-interest disclosure fields required on Form A. The Companies Regulations 2024 were also consolidated and reviewed as of April 14, 2026.\n\nThe practical effect is on the compliance side rather than the incorporation side: existing companies — not just new ones — need to revisit their filing processes. Beneficial-ownership disclosure in particular has been a recurring international compliance theme (it maps onto FATF-style transparency expectations), so the Regulation 92 changes read as part of that broader direction rather than an isolated local rule change.\n\nEnforcement posture matters here too. Under the amended framework, SECP can issue show-cause notices and penalty orders without requiring a court order first, and non-compliance carries escalating penalties and director liability, with knock-on effects on banking relationships and tax filings. For company secretaries and in-house counsel, that raises the cost of treating these as routine paperwork updates.\n\nOne caveat worth stating plainly: SRO numbers, exact form fields, and deadlines are the kind of detail that changes fast and should be checked directly against the current SECP notification before advising a client — this piece is a starting map, not a substitute for reading the actual S.R.O. text.",
    author: "Editorial Desk",
    sources: [
      { label: "SECP Amendments Pakistan — Global Law Experts", url: "https://globallawexperts.com/secp-amendments-pakistan/" },
      { label: "SECP Filing Requirements for Private Limited Companies 2026 — URCA", url: "https://urcapk.com/accounting-and-audit/secp-filing-requirements-private-limited-companies-pakistan/" },
    ],
  },
  {
    id: "ai-3",
    title: "US Commerce Department Delegation Discusses ADR Centre Plans with SECP",
    category: "News & Events",
    excerpt:
      "A CLDP delegation from the US Department of Commerce met with SECP leadership to discuss developing a dedicated Alternative Dispute Resolution Centre in Pakistan.",
    body:
      "A delegation from the U.S. Department of Commerce's Commercial Law Development Program (CLDP) visited the Securities and Exchange Commission of Pakistan to discuss cooperation on out-of-court mechanisms for resolving corporate disputes. The discussions centred on establishing a dedicated Alternative Dispute Resolution (ADR) Centre in Pakistan, drawing on international best practices, with SECP leadership — including Chairman Dr. Kabir Ahmed Sidhu — expressing openness to collaborating on ADR reform.\n\nThis is worth flagging for practitioners even at this early, exploratory stage. Pakistan's ADR landscape has historically been thin relative to litigation volume, particularly for commercial and corporate disputes that would benefit from faster, less adversarial resolution than the civil court system currently offers. A dedicated, SECP-linked ADR Centre — if it materialises — would sit at the intersection of corporate regulation and dispute resolution in a way Pakistan doesn't currently have a direct institutional equivalent for.\n\nIt's also a useful data point on where Pakistan's institutional capacity-building relationships currently sit: CLDP engagement of this kind typically precedes technical assistance programs (training, drafting support for procedural frameworks) rather than standing up new institutions unilaterally, so the realistic timeline from \"discussion\" to \"functioning centre\" is measured in years, not months.\n\nWorth tracking as a developing story rather than a settled development — this piece should be revisited once SECP publishes anything more concrete than a meeting record.",
    author: "Editorial Desk",
    sources: [
      { label: "Regulations — SECP", url: "https://www.secp.gov.pk/laws/regulations/" },
    ],
  },
  {
    id: "ai-4",
    title: "How to Register a Private Limited Company in Pakistan: The Basics",
    category: "Law FAQs & Guides",
    excerpt:
      "A plain-language walkthrough of incorporating a private limited company with SECP, from name reservation through post-incorporation filings.",
    body:
      "Incorporating a private limited company in Pakistan runs through the Securities and Exchange Commission of Pakistan under the Companies Act, 2017, primarily via SECP's online eZFile platform (which replaced the earlier eServices system). The process, at a high level, follows a consistent sequence.\n\nFirst, reserve a company name through the SECP portal — the name is checked against existing registrations and certain restricted-word rules. Second, prepare the constitutional documents: the Memorandum of Association and Articles of Association, setting out the company's objects and internal governance rules. Third, submit the incorporation documents — director and subscriber details, registered office address, and the constitutional documents — through eZFile, typically using a digital signature. Once SECP processes the filing, it issues a Certificate of Incorporation, at which point the company legally exists.\n\nIncorporation isn't the end of the compliance timeline, though — it's the start of a recurring one. Newly incorporated companies need to register for a National Tax Number with the FBR, open a corporate bank account, and file event-based forms whenever officer details change (director appointments, resignations, or changes in particulars are generally required within a short window of the change, historically 15 days, though this should be confirmed against the current regulation). Every registered company — including dormant ones — has an ongoing annual return obligation under the Companies Act, with no exemption for inactivity.\n\nOne honest caveat: exact fee schedules, form numbers, and filing windows are updated periodically by SECP notification, and this guide reflects the general shape of the process rather than current authoritative figures. Before advising a client on a specific incorporation, check the live SECP eZFile guidance directly.",
    author: "Editorial Desk",
    sources: [
      { label: "SECP Filing Requirements for Private Limited Companies 2026 — URCA", url: "https://urcapk.com/accounting-and-audit/secp-filing-requirements-private-limited-companies-pakistan/" },
      { label: "SECP Annual Return Filing Guide Pakistan 2026", url: "https://www.ict.edu.pk/blogs/secp-annual-return-filing-pakistan-2026" },
    ],
  },
  {
    id: "ai-5",
    title: "The EU's First DMA Review: What It Signals for Digital Platform Regulation Elsewhere",
    category: "International & Comparative",
    excerpt:
      "The European Commission's April 2026 review found the Digital Markets Act \"fit for purpose.\" What that verdict means for platform regulation beyond Europe.",
    body:
      "On April 28, 2026, the European Commission published its first statutory review of the Digital Markets Act, the ex ante regime governing the EU's largest digital \"gatekeepers.\" The headline finding was that the DMA is fit for purpose and does not require legislative revision at this stage. Seven gatekeepers are currently designated — Alphabet, Amazon, Apple, Booking, ByteDance, Meta, and Microsoft — across 23 core platform services, covering most consumer-facing digital infrastructure operating in Europe.\n\nThe review pointed to concrete, measurable effects as evidence the regime is working: mandated choice screens under Article 6(3), for instance, produced measurable shifts in browser market share. But the Commission's own report also acknowledged that gatekeepers have adopted approaches that may delay or limit effective implementation — a notable admission sitting alongside the broadly positive verdict. Several investigations remain open, including one concerning Google's search self-preferencing and its Shopping and Maps services, where reporting has suggested the process was affected by external diplomatic pressure before a prepared fine was ultimately not issued.\n\nFor anyone working from an Article 102 TFEU background, the DMA's real significance is structural: it's an ex ante complement to abuse-of-dominance doctrine's traditionally ex post enforcement. Article 102 requires proving abuse after the fact, case by case; the DMA instead imposes upfront, standing obligations on designated firms before any specific abuse is shown. That's a meaningfully different regulatory philosophy, not just a stricter version of the same rule.\n\nThe comparative angle matters for jurisdictions like Pakistan too. As the Competition Commission of Pakistan and sectoral regulators like the PTA consider how to approach large digital platforms, the DMA's first-review verdict — \"working, but gatekeepers are finding ways to slow it down\" — is a useful early data point on what ex ante platform regulation actually looks like in practice, three years after enactment, rather than in theory.",
    author: "Editorial Desk",
    sources: [
      { label: "Making Enforcement Negotiable? The DMA under US Pressure — IAI", url: "https://www.iai.it/en/publications/c41/making-enforcement-negotiable-digital-markets-act-under-us-pressure" },
      { label: "DMA Review 2026 — IndexBox", url: "https://www.indexbox.io/blog/eu-review-of-digital-markets-act-shows-new-opportunities-for-businesses-and-users/" },
      { label: "Digital Markets Act — European Commission", url: "https://digital-markets-act.ec.europa.eu/index_en" },
    ],
  },
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
