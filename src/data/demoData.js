export const STORAGE_KEY = "nova-social-studio-orders";

export const services = [
  ["Social Media Management", "Consistent strategy, publishing, and community care.", "calendar"],
  ["Content Creation", "Scroll-stopping visuals and captions crafted for your brand.", "spark"],
  ["Reels Editing", "Fast-paced vertical edits built to hold attention.", "play"],
  ["Paid Ads Management", "Campaigns that turn budget into measurable momentum.", "chart"],
  ["Brand Design", "A polished visual system that makes your content recognizable.", "layers"],
  ["Monthly Content Packages", "A reliable monthly content engine for busy teams.", "package"],
];

export const packages = [
  {
    name: "Starter",
    price: "25,000",
    description: "A consistent social presence for growing brands.",
    features: ["12 posts", "4 reels", "Basic strategy", "Monthly report"],
  },
  {
    name: "Growth",
    price: "45,000",
    description: "A sharper content rhythm with room to scale.",
    featured: true,
    features: ["20 posts", "8 reels", "Content strategy", "Ad support", "Weekly report"],
  },
  {
    name: "Premium",
    price: "75,000",
    description: "A complete social growth system with priority support.",
    features: ["30 posts", "12 reels", "Full strategy", "Ad management", "Priority support", "Advanced reporting"],
  },
];

export const portfolio = [
  ["Restaurant Campaign", "Food & Hospitality", "01"],
  ["Fitness Brand Growth", "Fitness & Wellness", "02"],
  ["Clothing Brand Reels", "Fashion & Retail", "03"],
  ["Tutor Social Media Package", "Education", "04"],
  ["Local Business Ads", "Performance Marketing", "05"],
  ["Personal Brand Content", "Creator Strategy", "06"],
];

export const team = [
  ["Isuru McG", "Founder & Strategy Lead", "IM"],
  ["Nethmi Silva", "Content Designer", "NS"],
  ["Kaveen Perera", "Video Editor", "KP"],
];

export const initialOrders = [
  ["Ayesha Fernando", "Luna Cafe", "Social Media Management", "LKR 45,000", "2026-06-12", "Paid", "In Progress", "2026-05-30"],
  ["Ruwan Silva", "Form Athletics", "Reels Editing", "LKR 25,000", "2026-06-08", "Unpaid", "New", "2026-06-01"],
  ["Kavindi Perera", "Curve Clothing", "Monthly Content Packages", "LKR 75,000", "2026-06-20", "Paid", "Completed", "2026-05-22"],
  ["Dilan Jay", "Peak Tutors", "Content Creation", "LKR 25,000", "2026-06-15", "Unpaid", "In Progress", "2026-05-28"],
  ["Maya Wick", "Studio M", "Brand Design", "LKR 45,000", "2026-06-25", "Paid", "New", "2026-06-02"],
].map(([customer, business, service, budget, deadline, paymentStatus, projectStatus, date], index) => ({
  id: `demo-${index + 1}`,
  customer,
  business,
  service,
  budget,
  deadline,
  paymentStatus,
  projectStatus,
  date,
  email: `${customer.split(" ")[0].toLowerCase()}@example.com`,
  whatsapp: "+94 77 123 4567",
  details: "Demo project request. Looking for a polished social media presence and a clear monthly content rhythm.",
  references: "https://example.com/inspiration",
}));

export function loadOrders() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialOrders));
    return initialOrders;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return initialOrders;
  }
}

export function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}
