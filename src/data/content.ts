export const profile = {
  name: "Tanishq Tyagi",
  title: "Software Engineer",
  tagline: "Building scalable backend systems & data platforms",
  summary:
    "Software Engineer building high-performance backend services, distributed data systems, and secure scalable infrastructure.",
  availabilityBadge: "Open to Opportunities",
  location: "Bangalore, India",
  email: "mailoftanishqtyagi@gmail.com",
  referralEmail: "tanishq.referrals@gmail.com",
  referralSubjectTemplate: "Referral Request: {Name} | Job IDs: {JobIds}",
  referralBodyTemplate: `Hi {Name},

Thanks for reaching out. I’ve received your referral request.

"Why you are a good fit for the role?"
Your response: "{candidate_response}"

I’ll review it and try to submit the referral within the next 2 days. Once done, you’ll receive a confirmation email from VISA.

If you have any questions, feel free to append the email thread ✌️

Wishing you the very best for the opportunity — hope you make it big 🚀

Warm regards,
Tanishq Tyagi`,
  messageSubjectTemplate: "Thanks for Reaching Out",
  messageBodyTemplate: `Hi {Name},

Thanks for reaching out — I’ve received your message.

Your Message:
"{UserMessage}"

I’ll review it and get back to you shortly ✌️

Looking forward to connecting with you 🤝

Warm regards,
Tanishq Tyagi`,
  github: "https://github.com/Tanishq6210",
  linkedin: "https://www.linkedin.com/in/tanishq-tyagi",
  /** Hosted under public/ — used for hero + contact resume download */
  resumePublicPath: "/Resume_Tanishq_2026.pdf",
  roles: ["Software Engineer", "Data Engineer", "Full Stack Developer"],
};

export const skills = [
  {
    category: "Programming Languages",
    items: [
      { name: "Java", isPrimary: true },
      { name: "C++", isPrimary: true },
      { name: "SQL", isPrimary: true },
      { name: "React JS", isPrimary: true},
      { name: "Python", isPrimary: false },
      { name: "Kotlin", isPrimary: false },
      { name: "Solidity", isPrimary: false},
      { name: "Next.js", isPrimary: false},
      { name: "Tailwind CSS", isPrimary: false}
    ],
  },
  {
    category: "API & Backend Architecture",
    items: [
      { name: "SpringBoot", isPrimary: true },
      { name: "REST APIs", isPrimary: true },
      { name: "Microservices", isPrimary: true },
      { name: "JPA/Hibernate", isPrimary: true },
      { name: "OAuth", isPrimary: false},
      { name: "Authentication (JWT / OAuth)", isPrimary: false},
      { name: "Redis", isPrimary: false},
      { name: "GraphQL", isPrimary: false}
    ],
  },
  {
    category: "Deployment & Infrastructure",
    items: [
      { name: "Docker", isPrimary: true },
      { name: "Jenkins", isPrimary: true },
      { name: "CI/CD pipelines", isPrimary: true },
      { name: "Kubernetes", isPrimary: false },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "postgres", isPrimary: true },
      { name: "mySQL", isPrimary: true },
      { name: "MongoDB", isPrimary: false },
    ],
  },
  {
    category: "Computer Science Fundamentals",
    items: [
      { name: "Data Structures & Algorigthms", isPrimary: true },
      { name: "Object Oriented Programmign", isPrimary: true },
      { name: "Database Management Systems", isPrimary: true },
      { name: "Operating Systems", isPrimary: false },
    ],
  },
    {
    category: "ML/NLP",
    items: [
      { name: "Named Entity Recognition Model (NER)", isPrimary: false },
      { name: "Model Evaluation", isPrimary: false },
      { name: "GPU Inference", isPrimary: false },
    ],
  },
];

export const experiences = [
  {
  role: "Data Engineer",
  company: "VISA",
  period: "Apr 2025 – Present",
  location: "Bangalore, India",
  bullets: [
    "Improved NER model performance by 30% through optimized training and evaluation pipelines.",
    "Accelerated large-scale PySpark ETL pipelines by 40% on multi-petabyte datasets.",
    "Reduced inference latency by 35% using GPU-backed processing.",
    "Built scalable backend services integrating external systems with secure (SSL/TLS) communication.",
  ],
  tags: ["PySpark", "Hadoop", "NER", "ETL", "Distributed Systems"],
},
  {
  role: "Software Engineer",
  company: "Societe Generale",
  period: "Feb 2024 – Apr 2025",
  location: "Bangalore, India",
  bullets: [
    "Automated XML workflows, reducing manual effort by 90%.",
    "Developed secure REST APIs (Spring Boot, PostgreSQL) for 2,000+ users.",
    "Delivered zero-downtime deployments with 98% system uptime.",
  ],
  tags: ["Spring Boot", "PostgreSQL", "OAuth2", "REST"],
},
];

export const projects = [
    {
  name: "Portfolio Website",
  period: "March 2026",
  description:
    "This portfolio is a modern, single-page personal website showcasing my experience, projects, skills, and achievements, with smooth animations and a responsive UI. It also includes a secure contact/referral form with bot protection, validation, and rate limiting so recruiters or collaborators can reach out safely.",
  bullets: [
    "Cloudflare Turnstile verification in frontend and server-side token validation",
    "IP-based fixed-window rate limiting",
    "Zod schema for name/email/message and referral mode checks",
    "Implemented Anti-spam honeypot method",
  ],
  tags: ["Next.js", "React", "Tailwind CSS", "Resend", "Upstash Redis", "Zod", "Cloudfair Turnstile", "Framer Motion", "Vercel"],
  codeUrl: "https://github.com/Tanishq6210/tanishqtyagi.in",
  demoUrl: "https://tanishqtyagi.in"
},
  {
  name: "Donate4Change",
  period: "April 2023",
  description:
    "Decentralized NGO donation platform ensuring transparent, tamper-proof contributions using blockchain.",
  bullets: [
    "Built smart contract-based donation system enabling direct, trustless transfers to NGOs.",
    "Enabled real-time transaction tracking with full on-chain transparency.",
    "Integrated Push Protocol for instant donation notifications.",
    "Used Polybase as a decentralized database for NGO data management.",
  ],
  tags: ["React", "Solidity", "Ethers.js", "Scroll", "Polybase", "Web3"],
  codeUrl: "https://github.com/Tanishq6210/Donate4Change",
  demoUrl: "https://ethglobal.com/showcase/donate4change-jnnje"
},
{
  name: "ClearVote",
  period: "Feb 2023",
  description:
    "Blockchain-based voting platform ensuring transparency and tamper-proof elections.",
  bullets: [
    "Built secure smart contracts using Solidity.",
    "Integrated Web3.js for seamless blockchain interaction.",
    "Enabled social authentication via Arcana.",
  ],
  tags: ["React", "Solidity", "Web3"],
  codeUrl: "https://github.com/Tanishq6210/Voting_Dapp",
  demoUrl: "https://devfolio.co/projects/clearvote-89db"
},
{
  name: "Atlas",
  period: "Dec 2022",
  description:
    "Android app helping students navigate university resources.",
  bullets: [
    "Reached 1,000+ downloads with curated academic resources.",
    "Implemented MVVM architecture for scalable design.",
    "Integrated 10+ APIs using Retrofit.",
  ],
  tags: ["Kotlin", "Android", "MVVM"],
  codeUrl: "https://github.com/Tanishq6210/Atlas-Kotlin/tree/main/Atlas",
  demoUrl: "https://github.com/Tanishq6210/Atlas-Kotlin/tree/main/Atlas"
},
];

export const awards = [
  {
    title: "Aspiring Innovator Award",
    issuer: "Societe Generale",
    description:
      "Recognized for delivering 30% more effective solutions by deeply understanding user requirements and ensuring on-time delivery across multiple projects.",
  },
  {
    title: "Bounties @ Scaling Ethereum, ETH Global",
    issuer: "Polybase & Scroll Network",
    description: "Won bounties for the Donate4Change project.",
  },
  {
    title: "Bounties @ EthForAll, Devfolio",
    issuer: "Arcana Network",
    description: "Won bounty for the ClearVote project.",
  },
];

