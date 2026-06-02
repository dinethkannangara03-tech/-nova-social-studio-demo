import { useMemo, useState } from "react";
import { initialOrders, loadOrders, packages, portfolio, saveOrders, services, team } from "./data/demoData";

const icons = {
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  calendar: <><path d="M5 4v3m14-3v3M4 9h16" /><rect x="4" y="5" width="16" height="15" rx="2" /></>,
  chart: <><path d="M5 19V9m7 10V5m7 14v-7" /><path d="M3 19h18" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5m-18 4 9 5 9-5" /></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  package: <><path d="m12 3 8 4-8 4-8-4 8-4Z" /><path d="M4 7v10l8 4 8-4V7M12 11v10" /></>,
  play: <path d="m9 7 8 5-8 5V7Z" />,
  search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>,
  spark: <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Zm7 14 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z" />,
  trash: <><path d="M5 7h14m-9 4v6m4-6v6M8 7l1 13h6l1-13m-7-3h6l1 3H8l1-3Z" /></>,
  user: <><circle cx="12" cy="8" r="3" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
};

function Icon({ name, size = 20 }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icons[name]}</svg>;
}

function Logo({ compact = false }) {
  return <a className="logo" href="/"><span className="logo-mark"><span /></span>{!compact && <span>Nova <b>Social</b></span>}</a>;
}

function Button({ children, kind = "primary", href, type, onClick }) {
  const Tag = href ? "a" : "button";
  return <Tag className={`button ${kind}`} href={href} type={type} onClick={onClick}>{children}<Icon name="arrow" size={17} /></Tag>;
}

function Reveal({ children, className = "" }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Home", "Services", "Packages", "Work", "About", "Team", "Contact"];
  return <header className="navbar"><div className="nav-inner">
    <Logo />
    <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu"><Icon name={open ? "close" : "menu"} /></button>
    <nav className={open ? "nav-links open" : "nav-links"}>
      {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}
      <a className="button primary nav-cta" href="#order">Start a Project <Icon name="arrow" size={16} /></a>
    </nav>
  </div></header>;
}

function HeroVisual() {
  return <div className="hero-visual">
    <div className="orb orb-a" /><div className="orb orb-b" />
    <div className="mockup-card mockup-main">
      <div className="mock-top"><span className="eyebrow">Content performance</span><span className="live-dot">Live</span></div>
      <div className="metric-big">+218%</div><p>Audience growth this month</p>
      <div className="graph"><i /><i /><i /><i /><i /><i /><i /></div>
    </div>
    <div className="mockup-card mockup-small mockup-float"><span className="eyebrow">Engagement</span><strong>84.6K</strong><em>+34.2%</em></div>
    <div className="mockup-card mockup-post"><div className="post-art"><span>NOVA</span></div><div><b>Campaign ready</b><small>12 posts scheduled</small></div></div>
    <div className="social-chip chip-a">Reels <b>02</b></div><div className="social-chip chip-b">Ads <b>+42%</b></div>
  </div>;
}

function SectionHead({ label, title, copy }) {
  return <div className="section-head"><span className="section-label">{label}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function HomePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ customer: "", business: "", whatsapp: "", email: "", service: "", budget: "", deadline: "", details: "", references: "" });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const orders = loadOrders();
    saveOrders([{ ...form, id: `order-${Date.now()}`, paymentStatus: "Unpaid", projectStatus: "New", date: new Date().toISOString().slice(0, 10) }, ...orders]);
    setSubmitted(true);
    setForm({ customer: "", business: "", whatsapp: "", email: "", service: "", budget: "", deadline: "", details: "", references: "" });
  };
  return <>
    <Navbar />
    <main>
      <section id="home" className="hero section-shell">
        <div className="hero-copy">
          <span className="section-label"><i /> Social media growth systems</span>
          <h1>Turn attention <span>into growth.</span></h1>
          <p>Nova Social Studio helps brands grow with content, strategy, design, and performance marketing.</p>
          <div className="hero-actions"><Button href="#packages">View Packages</Button><Button href="#order" kind="ghost">Start a Project</Button></div>
          <div className="hero-proof"><div><strong>50+</strong><small>Campaigns launched</small></div><div><strong>2.4M</strong><small>Monthly reach</small></div><div><strong>94%</strong><small>Client retention</small></div></div>
        </div>
        <HeroVisual />
      </section>

      <section id="services" className="content-section section-shell"><Reveal><SectionHead label="What we do" title="Everything your brand needs to stay visible." copy="A focused set of creative and performance services built for modern brands." /></Reveal>
        <div className="card-grid services-grid">{services.map(([title, text, icon], i) => <Reveal className="glass-card service-card" key={title}><span className="number">0{i + 1}</span><div className="icon-box"><Icon name={icon} /></div><h3>{title}</h3><p>{text}</p><a href="#order">Explore service <Icon name="arrow" size={16} /></a></Reveal>)}</div>
      </section>

      <section id="packages" className="content-section section-shell"><Reveal><SectionHead label="Monthly packages" title="Choose your growth pace." copy="Clear monthly plans designed to keep your social presence moving forward." /></Reveal>
        <div className="card-grid package-grid">{packages.map((item) => <Reveal className={`glass-card price-card ${item.featured ? "featured" : ""}`} key={item.name}>{item.featured && <span className="popular">Most popular</span>}<h3>{item.name}</h3><p>{item.description}</p><div className="price"><small>LKR</small>{item.price}<em>/ month</em></div><ul>{item.features.map((feature) => <li key={feature}><span><Icon name="check" size={14} /></span>{feature}</li>)}</ul><Button href="#order" kind={item.featured ? "primary" : "ghost"}>Choose {item.name}</Button></Reveal>)}</div>
      </section>

      <section id="work" className="content-section section-shell"><Reveal><SectionHead label="Selected work" title="Built to stop the scroll." copy="A preview of social campaigns and brand content systems across different industries." /></Reveal>
        <div className="portfolio-grid">{portfolio.map(([title, category, number]) => <Reveal className="portfolio-card" key={title}><div className={`portfolio-image art-${number}`}><span>{number}</span><b>NOVA / {category}</b></div><div className="portfolio-info"><div><h3>{title}</h3><p>{category}</p></div><span><Icon name="arrow" /></span></div></Reveal>)}</div>
      </section>

      <section id="about" className="about-section content-section section-shell"><Reveal className="about-art"><div className="about-glow" /><div className="stat-card"><span>Monthly reach</span><strong>2.4M+</strong><small>Across active campaigns</small></div><div className="mini-card">Ideas <b>that convert.</b></div></Reveal><Reveal className="about-copy"><SectionHead label="About Nova" title="Creative energy. Clear strategy." /><p>Nova Social Studio is a creative social media agency focused on helping brands grow through content, design, strategy, and performance marketing.</p><Button href="#order" kind="ghost">Work with us</Button></Reveal></section>

      <section id="team" className="content-section section-shell"><Reveal><SectionHead label="The team" title="A small team with a sharp focus." /></Reveal>
        <div className="team-grid">{team.map(([name, role, initials], i) => <Reveal className="glass-card team-card" key={name}><div className={`team-photo team-${i}`}><b>{initials}</b></div><h3>{name}</h3><p>{role}</p></Reveal>)}</div>
      </section>

      <section id="order" className="content-section section-shell order-section"><Reveal className="order-copy"><SectionHead label="Start a project" title="Tell us what you want to build." /><p>Share a few details about your brand and goals. This demo stores your request locally and adds it to the dashboard preview.</p><div className="order-note"><Icon name="spark" /><div><b>Demo mode</b><span>No payment or login required.</span></div></div></Reveal>
        <Reveal className="glass-card form-card">{submitted && <div className="success"><Icon name="check" /><div><b>Demo request saved.</b><span>It is now visible in the admin dashboard.</span></div></div>}<form onSubmit={submit}>
          <div className="form-grid"><label>Full name<input required name="customer" value={form.customer} onChange={update} placeholder="Your name" /></label><label>Business name<input required name="business" value={form.business} onChange={update} placeholder="Your brand" /></label><label>WhatsApp number<input required name="whatsapp" value={form.whatsapp} onChange={update} placeholder="+94 77 123 4567" /></label><label>Email<input required type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" /></label><label>Service needed<select required name="service" value={form.service} onChange={update}><option value="">Select a service</option>{services.map(([name]) => <option key={name}>{name}</option>)}</select></label><label>Budget range<select required name="budget" value={form.budget} onChange={update}><option value="">Select your budget</option><option>LKR 25,000</option><option>LKR 45,000</option><option>LKR 75,000+</option></select></label><label>Deadline<input required type="date" name="deadline" value={form.deadline} onChange={update} /></label><label>Reference links<input name="references" value={form.references} onChange={update} placeholder="Optional links" /></label></div><label>Project details<textarea required name="details" value={form.details} onChange={update} rows="4" placeholder="Tell us about your goals, audience, and ideas..." /></label><Button type="submit">Submit Request</Button>
        </form></Reveal>
      </section>

      <section id="contact" className="contact-section"><div className="section-shell contact-inner"><Reveal><span className="section-label">Let's connect</span><h2>Ready to turn your content into momentum?</h2><p>Send us a message and let’s talk about your next campaign.</p><div className="contact-actions"><Button href="https://wa.me/94771234567">WhatsApp Us</Button><a href="mailto:hello@novasocialstudio.lk">hello@novasocialstudio.lk</a></div></Reveal></div></section>
    </main>
    <footer><div className="section-shell footer-inner"><Logo /><p>Social media systems that help brands grow.</p><div className="footer-links"><a href="#home">Instagram</a><a href="#home">Facebook</a><a href="#home">LinkedIn</a><a href="/admin-demo">Admin Demo</a></div></div><div className="section-shell copyright">© 2026 Nova Social Studio. Demo website only.</div></footer>
  </>;
}

function SummaryCard({ label, value, icon = "chart" }) {
  return <div className="dashboard-card summary-card"><div className="summary-icon"><Icon name={icon} /></div><span>{label}</span><strong>{value}</strong></div>;
}

function AdminDemo() {
  const [orders, setOrders] = useState(() => loadOrders());
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [payment, setPayment] = useState("All");
  const [selected, setSelected] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const persist = (next) => { setOrders(next); saveOrders(next); };
  const change = (id, field, value) => persist(orders.map((o) => o.id === id ? { ...o, [field]: value } : o));
  const remove = (id) => { persist(orders.filter((o) => o.id !== id)); setSelected(null); };
  const visible = useMemo(() => orders.filter((o) => {
    const query = search.toLowerCase();
    return (!query || `${o.customer} ${o.business} ${o.service}`.toLowerCase().includes(query)) && (status === "All" || o.projectStatus === status) && (payment === "All" || o.paymentStatus === payment);
  }), [orders, search, status, payment]);
  const total = (state) => orders.filter((o) => o.projectStatus === state).length;
  const paid = orders.filter((o) => o.paymentStatus === "Paid").length;
  const nav = ["Overview", "Orders", "Paid", "Unpaid", "Analytics"];
  return <div className="admin-layout">
    <aside className={sidebar ? "admin-sidebar open" : "admin-sidebar"}><div><Logo /><button className="sidebar-close" onClick={() => setSidebar(false)}><Icon name="close" /></button></div><nav>{nav.map((item, i) => <a className={i === 0 ? "active" : ""} key={item} href="#dashboard"><Icon name={i === 0 ? "layers" : i === 4 ? "chart" : "calendar"} />{item}</a>)}<a href="/"><Icon name="arrow" />Back to Website</a></nav><small>Dashboard preview<br />Local demo data only</small></aside>
    <main className="admin-main" id="dashboard">
      <header className="admin-header"><div><button className="admin-menu" onClick={() => setSidebar(true)}><Icon name="menu" /></button><span className="eyebrow">Admin demo</span><h1>Overview dashboard</h1><p>Track project requests and preview your agency workflow.</p></div><div className="admin-profile"><span><Icon name="user" /></span><div><b>Nova Studio</b><small>Demo administrator</small></div></div></header>
      <section className="summary-grid"><SummaryCard label="Total Orders" value={orders.length} icon="package" /><SummaryCard label="New Orders" value={total("New")} /><SummaryCard label="In Progress" value={total("In Progress")} /><SummaryCard label="Completed" value={total("Completed")} icon="check" /><SummaryCard label="Paid Orders" value={paid} /><SummaryCard label="Unpaid Orders" value={orders.length - paid} /><SummaryCard label="Daily Revenue" value="LKR 45K" icon="chart" /><SummaryCard label="Weekly Revenue" value="LKR 145K" icon="chart" /><SummaryCard label="Monthly Revenue" value="LKR 485K" icon="chart" /></section>
      <section className="dashboard-card orders-panel"><div className="panel-title"><div><h2>Order requests</h2><p>Manage demo project enquiries stored in your browser.</p></div><span>{visible.length} orders</span></div><div className="filters"><label className="search"><Icon name="search" size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..." /></label><select value={status} onChange={(e) => setStatus(e.target.value)}><option>All</option><option>New</option><option>In Progress</option><option>Completed</option><option>Cancelled</option></select><select value={payment} onChange={(e) => setPayment(e.target.value)}><option>All</option><option>Paid</option><option>Unpaid</option></select><button className="reset" onClick={() => persist(initialOrders)}>Reset demo data</button></div>
        <div className="table-wrap"><table><thead><tr><th>Customer</th><th>Business</th><th>Service</th><th>Budget</th><th>Deadline</th><th>Payment Status</th><th>Project Status</th><th>Date</th><th>Actions</th></tr></thead><tbody>{visible.map((o) => <tr key={o.id}><td><b>{o.customer}</b></td><td>{o.business}</td><td>{o.service}</td><td>{o.budget}</td><td>{o.deadline}</td><td><select className={`table-select ${o.paymentStatus.toLowerCase()}`} value={o.paymentStatus} onChange={(e) => change(o.id, "paymentStatus", e.target.value)}><option>Paid</option><option>Unpaid</option></select></td><td><select className="table-select status" value={o.projectStatus} onChange={(e) => change(o.id, "projectStatus", e.target.value)}><option>New</option><option>In Progress</option><option>Completed</option><option>Cancelled</option></select></td><td>{o.date}</td><td><div className="row-actions"><button onClick={() => setSelected(o)}>View</button><button className="delete" onClick={() => remove(o.id)}><Icon name="trash" size={16} /></button></div></td></tr>)}</tbody></table>{!visible.length && <div className="empty">No matching orders found.</div>}</div>
      </section>
    </main>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="modal dashboard-card" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}><Icon name="close" /></button><span className="section-label">Order details</span><h2>{selected.business}</h2><div className="detail-grid"><div><span>Customer</span><b>{selected.customer}</b></div><div><span>Service</span><b>{selected.service}</b></div><div><span>Email</span><b>{selected.email}</b></div><div><span>WhatsApp</span><b>{selected.whatsapp}</b></div><div><span>Budget</span><b>{selected.budget}</b></div><div><span>Deadline</span><b>{selected.deadline}</b></div></div><div className="detail-copy"><span>Project details</span><p>{selected.details}</p></div><div className="detail-copy"><span>Reference links</span><p>{selected.references || "No references included."}</p></div><button className="button ghost" onClick={() => remove(selected.id)}>Delete demo order <Icon name="trash" size={16} /></button></div></div>}
  </div>;
}

export default function App() {
  return window.location.pathname === "/admin-demo" ? <AdminDemo /> : <HomePage />;
}
