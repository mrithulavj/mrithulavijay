import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { useTheme } from "@/hooks/use-theme";
import mrithulaAsset from "@/assets/mrithula.png.asset.json";
import { POSTS, type Post } from "@/lib/posts";
import { Moon, Sun, ArrowDown, Mail, Linkedin, Github, Search, X, Download, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mrithula Vijay — CSE Student, Curious Generalist" },
      {
        name: "description",
        content:
          "Personal profile of Mrithula Vijay — Computer Science Engineering student at Easwari Engineering College. Interests: AI, geopolitics, economics, finance, history.",
      },
      { property: "og:title", content: "Mrithula Vijay — CSE Student" },
      { property: "og:description", content: "Curious about patterns and interdisciplinary connections." },
      { property: "og:image", content: mrithulaAsset.url },
    ],
  }),
  component: Home,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "interests", label: "Interests" },
  { id: "certifications", label: "Certifications" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

const ACTIVITIES = [
  "Debates", "Model United Nations", "Shark Tanks", "Hackathons",
  "Podcasting", "Rotaract", "Emceeing", "Public Speaking",
];

const INTERESTS = [
  { title: "Artificial Intelligence", desc: "Agents, reasoning systems, and the practical edges of what models can do.", accent: "blue" },
  { title: "Geopolitics", desc: "Power, borders, and the slow currents shaping the next decade.", accent: "orange" },
  { title: "Economics", desc: "Markets, incentives, and the math behind everyday decisions.", accent: "pink" },
  { title: "Finance", desc: "Capital, risk, and how money actually moves through the world.", accent: "blue" },
  { title: "History", desc: "Patterns that rhyme — context for almost everything else.", accent: "orange" },
] as const;

type CertCategory =
  | "Finance & Investment Banking"
  | "Financial Markets & Economics"
  | "Data Analytics & Business Intelligence"
  | "Technology & Computer Science"
  | "Consulting & Strategy";
type Cert = { issuer: string; title: string; date: string; id?: string; category: CertCategory };
const CERTS: Cert[] = [
  { category: "Financial Markets & Economics", issuer: "Yale University", title: "Financial Markets", date: "Jun 2026", id: "XKJ23HLKL90Z" },
  { category: "Finance & Investment Banking", issuer: "J.P. Morgan Chase & Co.", title: "Quantitative Research", date: "Jun 2026" },
  { category: "Data Analytics & Business Intelligence", issuer: "Deloitte", title: "Data Analytics", date: "May 2026" },
  { category: "Technology & Computer Science", issuer: "Anthropic", title: "Introduction to Agent Skills", date: "Mar 2026" },
  { category: "Consulting & Strategy", issuer: "BCG X", title: "Introduction to Data for Decision Makers", date: "Dec 2025", id: "WbBDb3oLYPsi6Bxib" },
  { category: "Technology & Computer Science", issuer: "Cisco Networking Academy", title: "Security and Connectivity", date: "Dec 2025" },
  { category: "Technology & Computer Science", issuer: "Cisco Networking Academy", title: "Introduction to Modern AI", date: "Dec 2025" },
  { category: "Technology & Computer Science", issuer: "Cisco Networking Academy", title: "HTML Essentials", date: "Sep 2025" },
  { category: "Financial Markets & Economics", issuer: "City of Moreton Bay", title: "Economic Development", date: "Jul 2025", id: "XrvQY9yzRAeuPujCT" },
  { category: "Technology & Computer Science", issuer: "Microsoft", title: "Explore Generative AI", date: "Sep 2025" },
  { category: "Finance & Investment Banking", issuer: "Bank of America", title: "Global Markets Sales and Trading Analysis", date: "Jul 2025", id: "Pd2suzdN5WJnEjtN9" },
  { category: "Financial Markets & Economics", issuer: "NSW Government", title: "Economic Analysis", date: "Jul 2025", id: "QEwsEzrLPxgEQyXsh" },
  { category: "Finance & Investment Banking", issuer: "University of Illinois Urbana-Champaign", title: "Financial Accounting: Foundations", date: "Aug 2025" },
  { category: "Technology & Computer Science", issuer: "University of Michigan", title: "Programming for Everybody (Getting Started with Python)", date: "Jun 2025" },
  { category: "Technology & Computer Science", issuer: "University of Michigan", title: "Python Data Structures", date: "Jul 2025" },
];

function Home() {
  useReveal();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav scrolled={scrolled} theme={theme} toggle={toggle} />
      <Hero />
      <About />
      <Education />
      <Interests />
      <Certifications />
      <Writing />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav({ scrolled, theme, toggle }: { scrolled: boolean; theme: "light" | "dark"; toggle: () => void }) {
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-background/70 border-b border-border" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-lg tracking-tight hover-pink">MV.</a>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={
                i % 3 === 0 ? "hover-pink" : i % 3 === 1 ? "hover-blue" : "hover-orange"
              }
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="p-2 rounded-full border border-border hover:border-foreground transition-colors"
        >
          {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center px-6 md:px-10 pt-24 pb-16">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-8 reveal">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
            <span className="size-1.5 rounded-full" style={{ background: "var(--pop-pink)" }} />
            Personal Profile · 2026
          </div>
          <h1 className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.92]">
            MRITHULA
            <br />
            <span style={{ color: "var(--muted-foreground)" }}>VIJAY.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            <span className="font-script text-2xl md:text-3xl" style={{ color: "var(--pop-pink)" }}>Computer Science </span>
            <span className="font-script text-2xl md:text-3xl">Engineering Student.</span>
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Explore profile <ArrowDown className="size-4" />
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover-orange"
            >
              <Download className="size-4" /> Download resume
            </a>
          </div>
        </div>
        <div className="md:col-span-4 reveal">
          <div className="relative aspect-[4/5] w-full max-w-sm mx-auto">
            <div
              className="absolute -inset-3 rounded-2xl -z-10"
              style={{
                background:
                  "linear-gradient(135deg, var(--pop-pink), var(--pop-orange) 50%, var(--pop-blue))",
                opacity: 0.15,
              }}
            />
            <img
              src={mrithulaAsset.url}
              alt="Portrait of Mrithula Vijay"
              className="rounded-2xl object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-muted-foreground flex flex-col items-center gap-2"
      >
        Scroll
        <span className="block w-px h-10 bg-border animate-pulse" />
      </a>
    </section>
  );
}

function SectionLabel({ children, color = "pink" }: { children: React.ReactNode; color?: "pink" | "blue" | "orange" }) {
  const c = color === "pink" ? "var(--pop-pink)" : color === "blue" ? "var(--pop-blue)" : "var(--pop-orange)";
  return (
    <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">
      <span className="size-1.5 rounded-full" style={{ background: c }} />
      {children}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4 reveal">
          <SectionLabel>About</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl leading-[0.95]">
            A <span className="font-script" style={{ color: "var(--pop-blue)" }}>curious</span> mind.
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg leading-relaxed reveal">
          <p>
            Computer Science Engineering student with a strong curiosity for understanding
            patterns and interdisciplinary connections.
          </p>
          <p>
            I believe in building broad foundational knowledge across domains while
            developing deeper expertise in areas that truly interest me.
          </p>
          <p className="text-muted-foreground">
            I enjoy exploring how ideas from different fields intersect and influence one
            another — constantly learning, observing, and refining my perspectives through
            curiosity.
          </p>
        </div>
      </div>
    </section>
  );
}

function Education() {
  const items = [
    {
      school: "Easwari Engineering College",
      degree: "Bachelor of Engineering (B.E.) — Computer Science and Engineering",
      period: "2025 – 2029",
      grades: "",
      activities: ACTIVITIES,
      accent: "pink" as const,
    },
    {
      school: "Chettinad Hari Shree Vidyalayam",
      degree: "ICSE & ISC School Education",
      period: "Until 2025",
      grades: "ICSE Class X — 95%  ·  ISC Class XII — 93%",
      activities: [
        "Under-Secretary General & Public Relations, CHSV MUN 2024",
        "Public Relations & Design Team, Vizha (School Cultural Fest)",
        "Model United Nations",
        "Quizzing Competitions",
        "Shark Tank Competitions",
      ],
      accent: "blue" as const,
    },
  ];

  return (
    <section id="education" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="reveal">
          <SectionLabel color="blue">Education</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl mb-16">
            Where I've <span className="font-script" style={{ color: "var(--pop-orange)" }}>learned</span>.
          </h2>
        </div>
        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-2 md:left-3 top-2 bottom-2 w-px bg-border" />
          <div className="space-y-16">
            {items.map((it) => {
              const c =
                it.accent === "pink" ? "var(--pop-pink)" :
                it.accent === "blue" ? "var(--pop-blue)" : "var(--pop-orange)";
              return (
                <div key={it.school} className="relative reveal">
                  <span
                    className="absolute -left-[26px] md:-left-[34px] top-2 size-3 rounded-full ring-4 ring-background"
                    style={{ background: c }}
                  />
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{it.period}</div>
                  <h3 className="font-display text-2xl md:text-3xl">{it.school}</h3>
                  <p className="mt-2 text-muted-foreground">{it.degree}</p>
                  {it.grades && (
                    <p className="mt-2 text-sm" style={{ color: c }}>{it.grades}</p>
                  )}
                  {it.activities.length > 0 && (
                    <div className="mt-5">
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                        Activities & Leadership
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {it.activities.map((a, i) => (
                          <span
                            key={a}
                            className={`text-sm rounded-full border border-border px-3 py-1.5 transition-colors ${
                              i % 3 === 0 ? "hover-pink" : i % 3 === 1 ? "hover-blue" : "hover-orange"
                            }`}
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Interests() {
  return (
    <section id="interests" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="reveal">
          <SectionLabel color="orange">Interests</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl mb-16">
            Fields I <span className="font-script" style={{ color: "var(--pop-pink)" }}>follow</span>.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INTERESTS.map((it) => {
            const c =
              it.accent === "pink" ? "var(--pop-pink)" :
              it.accent === "blue" ? "var(--pop-blue)" : "var(--pop-orange)";
            return (
              <div
                key={it.title}
                className="group relative overflow-hidden rounded-2xl border border-border p-6 md:p-8 bg-card transition-all duration-300 hover:-translate-y-1 reveal"
              >
                <span
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: c }}
                />
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-xl md:text-2xl transition-colors duration-300 group-hover:[color:var(--hc)]" style={{ ["--hc" as string]: c }}>
                    {it.title}
                  </h3>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:rotate-45" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {it.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Cert | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>(CERTS.map((c) => c.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = CERTS.filter((c) => {
    const matchQ =
      q === "" ||
      c.title.toLowerCase().includes(q.toLowerCase()) ||
      c.issuer.toLowerCase().includes(q.toLowerCase()) ||
      c.category.toLowerCase().includes(q.toLowerCase());
    const matchF = filter === "All" || c.category === filter;
    return matchQ && matchF;
  });

  const visibleCategories = (filter === "All" ? categories.slice(1) : [filter]).filter((cat) =>
    filtered.some((c) => c.category === cat)
  );

  const catAccent = (cat: string) => {
    const idx = categories.indexOf(cat);
    return idx % 3 === 1 ? "var(--pop-pink)" : idx % 3 === 2 ? "var(--pop-blue)" : "var(--pop-orange)";
  };

  return (
    <section id="certifications" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="reveal">
          <SectionLabel>Certifications</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl mb-10">
            Proof of <span className="font-script" style={{ color: "var(--pop-blue)" }}>practice</span>.
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:items-center mb-10 reveal">
          <div className="relative flex-1 max-w-md">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search certifications…"
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-card border border-border text-sm focus:outline-none focus:border-foreground"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((f, i) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs uppercase tracking-wider rounded-full px-3 py-1.5 border transition-colors ${
                  filter === f ? "bg-foreground text-background border-foreground" :
                  "border-border " + (i % 3 === 0 ? "hover-pink" : i % 3 === 1 ? "hover-blue" : "hover-orange")
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-14">
          {visibleCategories.map((cat) => {
            const accent = catAccent(cat);
            const items = filtered.filter((c) => c.category === cat);
            return (
              <div key={cat} className="reveal">
                <div className="flex items-center gap-3 mb-5">
                  <span className="size-2 rounded-full" style={{ background: accent }} />
                  <h3 className="font-display text-xl md:text-2xl">{cat}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {items.length} {items.length === 1 ? "credential" : "credentials"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((c) => (
                    <button
                      key={c.title + c.issuer}
                      onClick={() => setActive(c)}
                      className="group text-left rounded-2xl border border-border p-6 bg-card hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.date}</span>
                        <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" style={{ color: accent }} />
                      </div>
                      <h4 className="font-display text-lg leading-tight mb-2 group-hover:[color:var(--hc)] transition-colors" style={{ ["--hc" as string]: accent }}>
                        {c.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{c.issuer}</p>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No certifications match.</p>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-card border border-border rounded-2xl max-w-lg w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Issued {active.date}
            </div>
            <h3 className="font-display text-2xl mb-2">{active.title}</h3>
            <p className="text-muted-foreground mb-6">{active.issuer}</p>
            {active.id && (
              <div className="text-sm">
                <span className="text-muted-foreground">Credential ID: </span>
                <span className="font-mono">{active.id}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function Writing() {
  const [open, setOpen] = useState<Post | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setProgress(0);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const popColor = (a: Post["accent"]) => `var(--pop-${a})`;

  return (
    <section id="writing" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5 reveal">
          <SectionLabel color="orange">Writing & Insights</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl leading-[0.95]">
            Thoughts, <span className="font-script" style={{ color: "var(--pop-orange)" }}>in progress</span>.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            A collection of reflections and observations on AI, geopolitics, economics, finance,
            history, technology, and learning.
          </p>
        </div>
        <div className="md:col-span-7 reveal space-y-4">
          {POSTS.map((post, i) => (
            <article key={post.id} className="rounded-2xl border border-border bg-card p-6 md:p-8 transition-colors hover:border-foreground/30">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
                <span className="size-1.5 rounded-full" style={{ background: popColor(post.accent) }} />
                {post.tag}
                <span className="ml-auto tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-display text-xl md:text-2xl leading-tight">{post.title}</h3>
              <p className="mt-3 text-muted-foreground text-sm md:text-base">{post.blurb}</p>
              <button
                onClick={() => setOpen(post)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: "inherit" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = popColor(post.accent))}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                Read essay <ArrowUpRight className="size-4" />
              </button>
            </article>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center p-4 md:p-10 overflow-hidden"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-full overflow-y-auto rounded-2xl border border-border bg-card"
            onClick={(e) => e.stopPropagation()}
            onScroll={(e) => {
              const el = e.currentTarget;
              const max = el.scrollHeight - el.clientHeight;
              setProgress(max > 0 ? (el.scrollTop / max) * 100 : 100);
            }}
          >
            <div className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border">
              <div className="h-1 w-full bg-border">
                <div
                  className="h-full transition-[width] duration-150"
                  style={{ width: `${progress}%`, background: popColor(open.accent) }}
                />
              </div>
              <div className="flex items-start gap-4 p-5 md:p-7">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">{open.tag}</div>
                  <h3 className="font-display text-2xl md:text-3xl leading-tight">{open.title}</h3>
                </div>
                <button
                  onClick={() => setOpen(null)}
                  aria-label="Close essay"
                  className="ml-auto shrink-0 rounded-full border border-border p-2 hover:bg-muted transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
            <div className="p-5 md:p-7 pt-0 md:pt-0 space-y-5 text-[15px] md:text-base leading-relaxed text-muted-foreground">
              {open.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


function Contact() {
  const links = [
    { label: "Email", value: "mrithula.vj@gmail.com", href: "mailto:mrithula.vj@gmail.com", Icon: Mail, hover: "hover-pink" },
    { label: "LinkedIn", value: "linkedin.com/in/mrithulavijay", href: "https://www.linkedin.com/in/mrithulavijay", Icon: Linkedin, hover: "hover-blue" },
    { label: "GitHub", value: "github.com/mrithulavj", href: "https://github.com/mrithulavj", Icon: Github, hover: "hover-orange" },
  ];
  return (
    <section id="contact" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center max-w-3xl mx-auto">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
            Let's <span className="font-script" style={{ color: "var(--pop-pink)" }}>talk</span>.
          </h2>
          <p className="mt-6 text-muted-foreground">
            For collaborations, conversations, or just a good idea worth exchanging.
          </p>
        </div>
        <div className="mt-14 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto reveal">
          {links.map(({ label, value, href, Icon, hover }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={`group rounded-2xl border border-border p-6 bg-card transition-all duration-300 hover:-translate-y-1 ${hover}`}
            >
              <Icon className="size-5 mb-4" />
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">{label}</div>
              <div className="font-medium text-sm break-all">{value}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="font-display text-base text-foreground">MRITHULA VIJAY</div>
        <div>© {new Date().getFullYear()} · Built with curiosity.</div>
      </div>
    </footer>
  );
}
