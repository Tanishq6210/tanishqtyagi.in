export const profile = {
  name: "Tanishq Tyagi",
  title: "Software Engineer",
  tagline:
    "Software Engineer specializing in backend systems, big data pipelines, and applied ML/NLP.",
  summary:
    "I build scalable backend services and data platforms with a strong focus on performance, reliability, and secure data handling across distributed systems.",
  availabilityBadge: "Available for Work",
  location: "Bangalore, India",
  email: "mailoftanishqtyagi@gmail.com",
  phone: "9837885503",
  github: "https://github.com/git-tanishq-tyagi",
  linkedin: "https://www.linkedin.com/in/tanishq-tyagi",
  resumeUrl:
    "https://drive.google.com/file/d/1AtY1f-T3xbDK0oZlFNhrSE-Bck7ukF4e/view?usp=sharing",
};

export const skills = [
  {
    category: "Programming Languages",
    items: ["Java", "Python", "SQL", "C++", "Kotlin", "Solidity"],
  },
  {
    category: "Backend & APIs",
    items: [
      "Spring Boot",
      "JPA / Hibernate",
      "REST",
      "Microservices",
      "OAuth2",
      "SSL/TLS",
    ],
  },
  {
    category: "Big Data",
    items: [
      "Apache Hadoop",
      "Apache Spark (PySpark)",
      "Apache Hive",
      "Batch Processing",
      "Stream Processing",
    ],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "PolyBase"],
  },
  {
    category: "DevOps",
    items: ["Jenkins", "CI/CD", "Docker", "Kubernetes", "Git"],
  },
  {
    category: "ML / NLP",
    items: [
      "Named Entity Recognition (NER)",
      "Model Evaluation (Precision / Recall / F1)",
      "GPU Inference",
    ],
  },
  {
    category: "Core CS",
    items: [
      "Data Structures",
      "Algorithms",
      "Operating Systems",
      "OOP",
      "Unit Testing",
    ],
  },
];

export const experiences = [
  {
    role: "Data Engineer",
    company: "VISA",
    period: "Apr 2025 – Present",
    location: "Bangalore, Karnataka",
    bullets: [
      "Improved Named Entity Recognition (NER) model precision, recall, and F1-score by 30% by refining training strategies and automating evaluation workflows.",
      "Optimized large-scale Hadoop and PySpark ETL pipelines on multi-petabyte analytical clusters, accelerating distributed NER-based PII scans by 40%.",
      "Leveraged GPU-backed infrastructure to execute full-scale NER inference across a significant portion of the VISA dataset, reducing processing latency by 35%.",
      "Engineered a scalable backend data service integrating multiple external systems over secured SSL/TLS, improving throughput by 50% using streaming and batching strategies.",
    ],
    tags: [
      "PySpark",
      "Hadoop",
      "GPU",
      "NER",
      "ETL",
      "Distributed Systems",
      "SSL/TLS",
    ],
  },
  {
    role: "Software Engineer",
    company: "Societe Generale",
    period: "Feb 2024 – Apr 2025",
    location: "Bangalore, Karnataka",
    bullets: [
      "Automated XPath-driven XML workflows, reducing manual effort by 90% and saving 3 hours daily.",
      "Designed and developed high-performance RESTful APIs using Spring Boot, JPA, and PostgreSQL, integrating OAuth2 authentication for 2,000+ users.",
      "Led zero-downtime production deployments in an Agile environment, achieving 98% system uptime with secure and scalable backend solutions.",
    ],
    tags: [
      "Spring Boot",
      "PostgreSQL",
      "OAuth2",
      "REST APIs",
      "Agile",
      "CI/CD",
    ],
  },
];

export const projects = [
  {
    name: "ClearVote",
    period: "Feb 2023",
    description:
      "Secure, tamper-proof voting platform leveraging smart contracts and Web3 for end-to-end transparent elections.",
    bullets: [
      "Developed a secure Solidity smart contract to guarantee a tamper-proof voting process.",
      "Integrated the contract with a web interface using Web3.js for seamless on-chain interactions.",
      "Implemented authentication via Arcana, supporting multiple social login providers to streamline access.",
    ],
    tags: ["React", "Solidity", "Web3.js", "Arcana"],
    codeUrl: "",
    demoUrl: "",
  },
  {
    name: "Atlas",
    period: "Dec 2022",
    description:
      "Android application providing curated university resources and insights, helping students navigate academics more effectively.",
    bullets: [
      "Achieved 1,000+ downloads by 2025, assisting students with 100+ curated resources and university insights.",
      "Built using MVVM architecture in Kotlin, reducing code redundancy by 50% and improving maintainability.",
      "Integrated Retrofit for 10+ API endpoints and crafted a polished UI with Lottie animations and Chip Navigation.",
    ],
    tags: ["Kotlin", "Android", "MVVM", "Retrofit"],
    codeUrl: "",
    demoUrl: "",
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

