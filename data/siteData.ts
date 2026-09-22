export interface EventItem {
  id: string;
  title: string;
  category: 'National Conference' | 'Seminar' | 'Roundtable' | 'Delegation';
  date: string;
  venue: string;
  image: string;
  caption: string;
  description: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorTitle: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  designation: string;
  courtChamber: string;
  specialization: string;
  bio: string;
  linkedin?: string;
  isLeadership?: boolean;
}

export const SIL_ABOUT_DATA = {
  title: "About SIL",
  intro: "The Society of Indian Lawyers (SIL) is a non-political, not-for-profit learned society committed to advancing the rule of law, legal education, and professional collaboration among members of the Indian and international legal fraternity.",
  mission: {
    title: "Mission",
    description: "To promote legal excellence, uphold justice, and foster dialogue across jurisdictions through research, education, and professional exchange."
  },
  vision: {
    title: "Vision",
    description: "To build a globally respected platform that unites lawyers, academicians, and students in strengthening the Indian legal system and its engagement with global legal standards."
  },
  whyExists: {
    title: "Why this Society exists",
    description: "SIL was established to bridge the gap between practitioners, scholars, and students — creating a forum for continuous professional growth, policy dialogue, and public service through law. It exists to nurture leadership, integrity, and inclusivity within the legal community."
  },
  objectives: [
    {
      id: "obj-1",
      number: "01",
      title: "Knowledge & Legal Administration",
      text: "To advance knowledge of law and its administration in India and abroad."
    },
    {
      id: "obj-2",
      number: "02",
      title: "Seminars, Conferences & Training",
      text: "To organize seminars, conferences, and training for lawyers and students."
    },
    {
      id: "obj-3",
      number: "03",
      title: "Pro Bono & Access to Justice",
      text: "To promote pro bono initiatives and access to justice."
    },
    {
      id: "obj-4",
      number: "04",
      title: "Comparative Legal Research",
      text: "To encourage comparative legal research and international cooperation."
    },
    {
      id: "obj-5",
      number: "05",
      title: "Professional & Ethical Standards",
      text: "To maintain high professional and ethical standards among members."
    }
  ],
  history: {
    title: "History & Legal Status",
    text: "Founded in 2024 following collaborative deliberations among senior members of the Indian Bar and academic leaders, SIL is registered as a non-profit society under the Societies Registration Act, 1860, headquartered in Chandigarh, India."
  }
};

export const SIL_EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: "National Legal Conclave on Judicial Reforms",
    category: "National Conference",
    date: "November 2024",
    venue: "Chandigarh Judicial Academy, India",
    image: "/images/events/event_1.jpg",
    caption: "Senior members of the Bar and judicial delegates addressing modern courtroom technologies and pendency management.",
    description: "Deliberation convened senior advocates, retired High Court judges, and academicians on bridging procedural gaps and embracing digitised dispute resolution."
  },
  {
    id: "evt-2",
    title: "Symposium on Rule of Law & Constitutional Values",
    category: "Seminar",
    date: "October 2024",
    venue: "India International Centre, New Delhi",
    image: "/images/events/event_2.jpg",
    caption: "Panel discussion on constitutional morality, institutional integrity, and evolving fundamental rights jurisprudence.",
    description: "Featured keynote perspectives by renowned jurists on maintaining constitutional equilibrium and ethical advocacy in contemporary litigation."
  },
  {
    id: "evt-3",
    title: "High-Table Dialogue on Corporate Governance & ADR",
    category: "Roundtable",
    date: "August 2024",
    venue: "Chandigarh Club Legal Conclave Hall",
    image: "/images/events/event_3.jpg",
    caption: "Focusing on institutional arbitration frameworks, mediation bills, and multi-jurisdictional enforcement.",
    description: "A focused interactive roundtable examining commercial dispute resolutions, Section 9 injunctions, and foreign arbitral award enforcement."
  },
  {
    id: "evt-4",
    title: "SIL International Legal Delegation Forum",
    category: "Delegation",
    date: "June 2024",
    venue: "Grand Convention Auditorium",
    image: "/images/events/event_4.jpg",
    caption: "Plenary assembly exploring cross-border legal exchange, international trade law, and comparative constitutionalism.",
    description: "Over 200 advocates and researchers gathered to establish mutual exchange programs and legal training frameworks across international bars."
  },
  {
    id: "evt-5",
    title: "Colloquium on Access to Justice & Pro Bono Advocacy",
    category: "Seminar",
    date: "May 2024",
    venue: "State Legal Services Authority Auditorium",
    image: "/images/events/event_5.jpg",
    caption: "Empowering young advocates and legal aid clinics to expand indigent representation across lower courts.",
    description: "Strategic workshop outlining structured pro bono metrics and legal aid representation for underserved communities across districts."
  },
  {
    id: "evt-6",
    title: "Inaugural Assembly & Bar-Bench Interaction",
    category: "National Conference",
    date: "March 2024",
    venue: "Hotel Mountview, Chandigarh",
    image: "/images/events/event_6.jpg",
    caption: "Commencement gathering marking the formal establishment of the Society of Indian Lawyers under the Act of 1860.",
    description: "Founding convention celebrating the registration of SIL with inaugural speeches on collegiate brotherhood, ethical standards, and youth mentorship."
  }
];

export const SIL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "advancing-rule-of-law-india",
    title: "Advancing the Rule of Law: Navigating the Intersection of Technology and Justice",
    author: "Editorial Board, SIL",
    authorTitle: "Society of Indian Lawyers Research Cell",
    date: "September 2024",
    readTime: "6 min read",
    category: "Constitutional Law",
    excerpt: "How modern e-courts, paperless filings, and virtual hearings are strengthening the constitutional promise of speedy access to justice in India.",
    content: [
      "The administration of justice in India is witnessing a monumental paradigm shift. As courts across high jurisdictions transition into hybrid models, the constitutional guarantee under Article 21 has expanded to embody swift, accessible, and digitized relief.",
      "The Society of Indian Lawyers continuously advocates for the progressive adoption of open-source courtroom tooling, standardized e-filing protocols, and continuous CLE (Continuing Legal Education) for junior members of the bar.",
      "By eliminating physical bottlenecks and reducing filing discrepancies, technology acts not merely as a convenience, but as a direct instrument upholding fundamental rights."
    ]
  },
  {
    id: "blog-2",
    slug: "institutional-arbitration-india",
    title: "Institutional Arbitration in India: Catalyzing Global Commercial Confidence",
    author: "Senior Research Fellow",
    authorTitle: "Commercial & Arbitration Practice Group",
    date: "August 2024",
    readTime: "5 min read",
    category: "Commercial & ADR",
    excerpt: "An examination of the Arbitration and Conciliation Amendment Act, emergency arbitration enforceability, and the path to establishing India as a preferred global seat.",
    content: [
      "With international business contracts increasingly incorporating Indian jurisdictions, establishing resilient institutional arbitration centers has transitioned from an aspiration to an urgent priority.",
      "This analysis explores landmark decisions by the Supreme Court of India regarding the scope of judicial intervention under Section 11 and Section 34, affirming a robust pro-enforcement bias.",
      "SIL's ADR committee is actively organizing mediation workshops to help trial advocates pivot effectively towards non-adversarial resolution frameworks."
    ]
  },
  {
    id: "blog-3",
    slug: "ethics-at-the-indian-bar",
    title: "Professional Ethics and Collegiality: Preserving the Dignity of the Bar",
    author: "Advisory Council",
    authorTitle: "SIL Ethics & Standards Committee",
    date: "July 2024",
    readTime: "4 min read",
    category: "Legal Ethics",
    excerpt: "The foundational role of advocate independence, duty towards the court, and mentorship of first-generation legal professionals.",
    content: [
      "The legal profession is unique among vocations: advocates are first officers of the court, tasked with ensuring the truth prevails while fearlessly representing their clients.",
      "In an era of relentless media scrutiny and social media commentary, maintaining solemn dignity in pleadings and court conduct remains vital to public trust.",
      "SIL continues to conduct training sessions specifically for young litigators on drafting ethics, client confidentiality, and professional etiquette."
    ]
  },
  {
    id: "blog-4",
    slug: "pro-bono-legal-aid-reforms",
    title: "Reimagining Pro Bono Practice: From Charity to Institutional Duty",
    author: "Public Interest Cell",
    authorTitle: "SIL Pro Bono Initiative",
    date: "May 2024",
    readTime: "7 min read",
    category: "Public Interest Law",
    excerpt: "Building structured clinics and district-level mentorship to deliver high-quality legal representation to underrepresented citizens.",
    content: [
      "Access to justice must not depend upon financial capacity. Article 39A of the Constitution directs the State to provide free legal aid, yet the responsibility weighs equally on organized Bar associations.",
      "The Society of Indian Lawyers has established a pro bono volunteer network that matches senior practitioners with underserved litigants across consumer, labor, and civil appeals.",
      "Through institutional collaboration with university law faculties, law students gain practical clinical experience under the guidance of seasoned advocates."
    ]
  }
];

export const SIL_TEAM: TeamMember[] = [
  {
    id: "tm-1",
    name: "Senior Advocates & Patrons",
    role: "Patron-in-Chief & Founding Jurists",
    designation: "Senior Members of the Bar",
    courtChamber: "Supreme Court & Punjab and Haryana High Court",
    specialization: "Constitutional Law, Civil Appeals & Appellate Jurisprudence",
    bio: "Eminent advocates and veteran jurists who steered the establishment of the Society of Indian Lawyers to foster continuous learning, mentorship, and professional dignity across jurisdictions.",
    isLeadership: true
  },
  {
    id: "tm-2",
    name: "Executive Council & Office Bearers",
    role: "Executive Committee",
    designation: "President, Vice Presidents & Secretaries",
    courtChamber: "Chandigarh Headquarters",
    specialization: "Bar Administration, Legal Education & Inter-State Coordination",
    bio: "Elected and nominated governing body responsible for organizing national symposia, academic publications, regional chapters, and legal aid clinics under the Societies Registration Act, 1860.",
    isLeadership: true
  },
  {
    id: "tm-3",
    name: "Academic & Research Advisory Board",
    role: "Advisory Council",
    designation: "Legal Scholars, Deans & Professors of Law",
    courtChamber: "National Law Universities & Academic Institutes",
    specialization: "Comparative Law, Public Policy & Jurisprudential Studies",
    bio: "Distinguished legal academicians driving research initiatives, curriculum enhancements, and policy whitepapers on key legislative enactments.",
    isLeadership: false
  },
  {
    id: "tm-4",
    name: "Young Advocates & Student Chapters Cell",
    role: "Junior Bar & Research Fellows",
    designation: "Coordinators & Research Associates",
    courtChamber: "District Courts & Appellate Chambers",
    specialization: "Clinical Legal Aid, Mooting & Youth Mentorship",
    bio: "Dedicated legal associates and student delegates organizing moot court competitions, trial advocacy workshops, and community legal awareness camps.",
    isLeadership: false
  }
];
