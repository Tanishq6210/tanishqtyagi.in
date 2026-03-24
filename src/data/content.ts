export const profile = {
  name: "Tanishq Tyagi",
  title: "Software Engineer",
  tagline: "Building scalable backend systems & data platforms",
  summary:
    "Building high-performance backend services, distributed data systems, and secure scalable infrastructure.",
  availableForWork: false,
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

If you have any questions, feel free to append the email thread.

Wishing you the very best for the opportunity — hope you make it big!

Warm regards,
Tanishq Tyagi`,
  messageSubjectTemplate: "Thanks for Reaching Out",
  messageBodyTemplate: `Hi {Name},

Thanks for reaching out — I’ve received your message.

Your Message: "{UserMessage}"

I’ll review it and get back to you shortly. Looking forward to connecting with you!

Warm regards,
Tanishq Tyagi`,
  github: "https://github.com/Tanishq6210",
  linkedin: "https://www.linkedin.com/in/tanishq-tyagi",
  /** Hosted under public/ — used for hero + contact resume download */
  resumePublicPath: "/Resume_Tanishq_Tyagi_2026.pdf",
  roles: ["Data Engineer", "Software Engineer", "Full Stack Developer"],
};

export const skills = [
  {
    category: "Programming Languages",
    items: [
      { name: "Java", isPrimary: true },
      { name: "C++", isPrimary: true },
      { name: "SQL", isPrimary: true },
      { name: "Python", isPrimary: false },
      { name: "Kotlin", isPrimary: false },
      { name: "Solidity", isPrimary: false},
      { name: "React JS", isPrimary: false},
      { name: "Next.js", isPrimary: false},
      { name: "Tailwind CSS", isPrimary: false},
      { name: "Ether.js", isPrimary: false}
    ],
  },
  {
    category: "API & Backend Architecture",
    items: [
      { name: "SpringBoot", isPrimary: true },
      { name: "REST APIs", isPrimary: true },
      { name: "Microservices", isPrimary: true },
      { name: "JPA/Hibernate", isPrimary: true },
      { name: "Mockito", isPrimary: true},
      { name: "JUnit", isPrimary: true},
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
      { name: "AWS S3 Bucket", isPrimary: false},
      { name: "MongoDB", isPrimary: false },
    ],
  },
  {
    category: "Computer Science Fundamentals",
    items: [
      { name: "Data Structures & Algorigthms", isPrimary: true },
      { name: "Object Oriented Programmig", isPrimary: true },
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
    "Improved NER model precision, recall, and F1-score by 30% via training pipeline optimization and automated evaluation workflows.",
    "Reduced large-scale NER inference latency by 35% using GPU-backed processing across 10% of Visa’s enterprise dataset",
    "Engineered a secure, scalable backend data service processing billions of records via streaming and batch integrations, improving throughput by 50%",
    "Built scalable backend services integrating external systems with secure (SSL/TLS) communication",
    "Integrated external Natural Language Query services and improved prompt logic to reduce hallucinations by 50%, resulting in consistently accurate outputs",
    "Implemented JDBC-based data access via Trino within Spring Boot APIs to retrieve millions of records efficiently, securing query execution using parameterized SQL to prevent injection vulnerabilities.",
    "Implemented resilient retry mechanisms using Spring Retry to handle transient network failures and ensure reliable data processing without loss"
  ],
  tags: ["Java", "Spring JDBC", "JPA / Hibernate", "SQL",  "NER", "Distributed Systems", "Jenkins CI/CD"],
},
  {
  role: "Software Engineer (6 month Intern + Fulltime)",
  company: "Societe Generale",
  period: "Feb 2024 – Apr 2025",
  location: "Bangalore, India",
  bullets: [
    "Automated XML workflows, reducing manual effort by 90%.",
    "Developed secure REST APIs (performing CRUD operations) optimised for handling concurrent users at the same time.",
    "Integrated OAuth-based authentication and authorization, increasing system security by 47% and enabling seamless access control",
    "Implemented scheduled cron jobs to automatically detect and process pending requests, eliminating manual intervention and improving workflow reliability",
    "Worked concurrently on 2 production projects within the same timeline, delivering both successfully while maintaining delivery milestones",
    "Delivered zero-downtime deployments with 98% system uptime",
    "Maintained 97% unit test coverage across the codebase, ensuring high reliability and preventing regressions during continuous feature development."
  ],
  tags: ["Java", "Spring Boot", "PostgreSQL", "AWS S3 Bucket", "OAuth2", "REST APIs", "XML", "Cron Jobs", "Swagger API", "Mockito", "Junit", "Docker", "Kubernetes"],
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
  period: "Dec 2022 - Dec 2025",
  description:
    "Android app helping students navigate university resources.",
  bullets: [
    "Reached 1,000+ downloads.",
    "Implemented MVVM architecture for scalable design.",
    "Integrated 10+ APIs using Retrofit.",
  ],
  tags: ["Kotlin", "Android", "MVVM"],
  codeUrl: "https://github.com/Tanishq6210/Atlas-Kotlin/tree/main/Atlas",
  // demoUrl: "https://drive.google.com/file/d/1KtB0_rDr4qmJFs5VlXNVZY0bjjTQDh_R/view?usp=sharing"
},
];

export const awards = [
  {
    title: "Aspiring Innovator Award",
    issuer: "Societe Generale",
    date: "Jan 2024",
    description:
      "Recognized for delivering 30% more effective solutions through strong requirement analysis and on-time delivery across multiple projects",
  },
  {
    title: "Bounties @ Scaling Ethereum, ETH Global",
    issuer: "Polybase & Scroll Network",
    date: "Feb 2023",
    description: "Awarded ETHGlobal Scaling Ethereum bounty for building Donate4Change on Polybase and Scroll Network",
  },
  {
    title: "Bounties @ EthForAll, Devfolio",
    issuer: "Arcana Network",
    date: "April 2023",
    description: "Awarded Devfolio EthForAll bounty for building ClearVote using Arcana Network authentication infrastructure",
  },
];

