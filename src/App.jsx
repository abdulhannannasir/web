import { useEffect, useState } from "react";
import { supabase, storageGet, storageSet } from "./supabaseClient.js";
import { CATEGORIES, SEED_ARTICLES, SEED_NEWS, SEED_LEGISLATIVE } from "./data/seedData.js";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import CategoryRow from "./components/CategoryRow.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ArticlePage from "./components/ArticlePage.jsx";
import WriteForUs from "./components/WriteForUs.jsx";
import AdminPortal from "./components/AdminPortal.jsx";
import NewsletterSignup from "./components/NewsletterSignup.jsx";
import SponsoredSection from "./components/SponsoredSection.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";

// Load a JSON blob from kv_store, falling back to a default if the key
// doesn't exist yet (i.e. nothing has been published through the Admin
// Portal on this Supabase project so far).
async function loadJSON(key, fallback) {
  try {
    const result = await storageGet(key);
    if (!result) return fallback;
    return JSON.parse(result.value);
  } catch (err) {
    console.error(`Failed to load "${key}":`, err);
    return fallback;
  }
}

async function saveJSON(key, value) {
  await storageSet(key, JSON.stringify(value));
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("home"); // home | article | write | admin
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const [articles, setArticles] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [newsWire, setNewsWire] = useState({});
  const [legislative, setLegislative] = useState({});
  const [sponsored, setSponsored] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const [a, s, n, l, sp, msg, subs] = await Promise.all([
        loadJSON("articles", SEED_ARTICLES),
        loadJSON("submissions", []),
        loadJSON("newsWire", SEED_NEWS),
        loadJSON("legislative", SEED_LEGISLATIVE),
        loadJSON("sponsored", []),
        loadJSON("messages", []),
        loadJSON("subscribers", []),
      ]);
      setArticles(a);
      setSubmissions(s);
      setNewsWire(n);
      setLegislative(l);
      setSponsored(sp);
      setMessages(msg);
      setSubscribers(subs);
      setLoading(false);
    })();

    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const navigate = (v) => {
    setView(v);
    setSelectedArticle(null);
    setActiveCategory(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openArticle = (article) => {
    setSelectedArticle(article);
    setView("article");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openCategory = (category) => {
    setActiveCategory(category);
    setView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Write for Us ---
  const handleSubmit = async (submission) => {
    const next = [...submissions, submission];
    setSubmissions(next);
    await saveJSON("submissions", next);
  };

  // --- Admin: submissions ---
  const approveSubmission = async (submission) => {
    const published = {
      id: `art-${Date.now()}`,
      title: submission.title,
      category: submission.category,
      excerpt: submission.body.slice(0, 160) + (submission.body.length > 160 ? "…" : ""),
      body: submission.body,
      author: submission.author,
      date: new Date().toISOString(),
      status: "published",
    };
    const nextArticles = [published, ...articles];
    const nextSubs = submissions.map((s) => (s.id === submission.id ? { ...s, status: "approved" } : s));
    setArticles(nextArticles);
    setSubmissions(nextSubs);
    await Promise.all([saveJSON("articles", nextArticles), saveJSON("submissions", nextSubs)]);
  };

  const rejectSubmission = async (submission) => {
    const nextSubs = submissions.map((s) => (s.id === submission.id ? { ...s, status: "rejected" } : s));
    setSubmissions(nextSubs);
    await saveJSON("submissions", nextSubs);
  };

  // --- Admin: News Wire / Legislative ---
  const addNews = async (country, item) => {
    const next = { ...newsWire, [country]: [item, ...(newsWire[country] || [])] };
    setNewsWire(next);
    await saveJSON("newsWire", next);
  };
  const removeNews = async (country, id) => {
    const next = { ...newsWire, [country]: (newsWire[country] || []).filter((i) => i.id !== id) };
    setNewsWire(next);
    await saveJSON("newsWire", next);
  };
  const addLegislative = async (country, item) => {
    const next = { ...legislative, [country]: [item, ...(legislative[country] || [])] };
    setLegislative(next);
    await saveJSON("legislative", next);
  };
  const removeLegislative = async (country, id) => {
    const next = { ...legislative, [country]: (legislative[country] || []).filter((i) => i.id !== id) };
    setLegislative(next);
    await saveJSON("legislative", next);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // --- Admin: Sponsored Content ---
  const addSponsored = async (item) => {
    const next = [item, ...sponsored];
    setSponsored(next);
    await saveJSON("sponsored", next);
  };
  const toggleSponsored = async (id) => {
    const next = sponsored.map((s) => (s.id === id ? { ...s, active: !s.active } : s));
    setSponsored(next);
    await saveJSON("sponsored", next);
  };
  const removeSponsored = async (id) => {
    const next = sponsored.filter((s) => s.id !== id);
    setSponsored(next);
    await saveJSON("sponsored", next);
  };

  // --- Contact form ---
  const handleContactSubmit = async (message) => {
    const next = [message, ...messages];
    setMessages(next);
    await saveJSON("messages", next);
  };

  // --- Newsletter ---
  const handleSubscribe = async (email) => {
    if (subscribers.some((s) => s.email === email)) return;
    const next = [...subscribers, { email, subscribedAt: new Date().toISOString() }];
    setSubscribers(next);
    await saveJSON("subscribers", next);
  };

  if (loading) {
    return (
      <div style={{ padding: 60, textAlign: "center", fontFamily: "var(--sans)", color: "var(--text-muted)" }}>
        Loading Legal Perspective…
      </div>
    );
  }

  const published = articles.filter((a) => a.status === "published");
  const visibleArticles = activeCategory ? published.filter((a) => a.category === activeCategory) : published;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header onNavigate={navigate} onCategory={openCategory} isAdmin={!!user} />

      <main style={{ flex: 1 }}>
        {view === "home" && (
          <div className="wrap" style={{ padding: "0 20px 40px" }}>
            {!activeCategory && <HeroCarousel articles={published} onOpen={openArticle} />}
            {!activeCategory && <SponsoredSection items={sponsored} />}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 300px",
                gap: 36,
                marginTop: 20,
              }}
              className="home-grid"
            >
              <div>
                {activeCategory ? (
                  <CategoryRow category={activeCategory} articles={visibleArticles} onOpen={openArticle} onSeeAll={() => {}} />
                ) : (
                  CATEGORIES.map((cat) => (
                    <CategoryRow
                      key={cat}
                      category={cat}
                      articles={published.filter((a) => a.category === cat)}
                      onOpen={openArticle}
                      onSeeAll={openCategory}
                    />
                  ))
                )}
              </div>
              <Sidebar
                trending={published.slice(0, 5)}
                onOpen={openArticle}
                newsWire={newsWire}
                legislative={legislative}
                onSubscribe={handleSubscribe}
              />
            </div>
            <style>{`
              @media (max-width: 900px) {
                .home-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
          </div>
        )}

        {view === "article" && <ArticlePage article={selectedArticle} onBack={() => navigate("home")} />}

        {view === "write" && <WriteForUs onSubmit={handleSubmit} />}

        {view === "about" && <About />}
        {view === "contact" && <Contact onSubmit={handleContactSubmit} />}
        {view === "terms" && <Terms />}
        {view === "privacy" && <Privacy />}

        {view === "admin" && (
          <AdminPortal
            user={user}
            submissions={submissions}
            newsWire={newsWire}
            legislative={legislative}
            sponsored={sponsored}
            messages={messages}
            onSignedIn={setUser}
            onSignOut={handleSignOut}
            onApproveSubmission={approveSubmission}
            onRejectSubmission={rejectSubmission}
            onAddNews={addNews}
            onRemoveNews={removeNews}
            onAddLegislative={addLegislative}
            onRemoveLegislative={removeLegislative}
            onAddSponsored={addSponsored}
            onToggleSponsored={toggleSponsored}
            onRemoveSponsored={removeSponsored}
          />
        )}
      </main>

      <Footer onNavigate={navigate} onCategory={openCategory} />
    </div>
  );
}
