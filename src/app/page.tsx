"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";
import {
  profile,
  skills,
  experiences,
  projects,
  awards,
} from "@/data/content";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
      return;
    }

    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;
    const initial = prefersLight ? "light" : "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  // Persist theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-transparent">
        <div
          className="h-full bg-emerald-500/80 transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="section-container flex items-center justify-between py-3 md:py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-emerald-400/80 bg-emerald-500/20 shadow-lg shadow-emerald-500/40">
              <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-emerald-300">
                TT
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-100">
                {profile.name}
              </span>
              <span className="text-xs text-slate-400">
                {profile.title} · {profile.location}
              </span>
            </div>
          </div>
          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="nav-link"
              >
                {section.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 shadow-sm shadow-black/40 transition hover:border-emerald-400 hover:text-emerald-300"
              aria-label="Toggle color theme"
            >
              <span
                className="h-2.5 w-2.5 rounded-full border border-slate-500"
                style={{
                  background:
                    theme === "dark"
                      ? "radial-gradient(circle at 30% 30%, #22c55e, #020617)"
                      : "radial-gradient(circle at 30% 30%, #f97316, #f9fafb)",
                }}
              />
              <span className="hidden sm:inline">
                {theme === "dark" ? "Dark" : "Light"}
              </span>
            </button>
            {/* Mobile menu toggle */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/60 text-slate-200 shadow-sm shadow-black/40 transition hover:border-emerald-400 hover:text-emerald-300 md:hidden"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMobileNavOpen((open) => !open)}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="flex flex-col gap-0.5">
                <span className="block h-[2px] w-4 rounded-full bg-current" />
                <span className="block h-[2px] w-4 rounded-full bg-current" />
                <span className="block h-[2px] w-4 rounded-full bg-current" />
              </span>
            </button>
          </div>
        </div>
        {/* Mobile nav dropdown */}
        {isMobileNavOpen && (
          <div
            className={`border-t md:hidden ${
              theme === "light"
                ? "border-slate-200 bg-white"
                : "border-slate-800/80 bg-slate-950/95"
            }`}
          >
            <nav className="section-container flex flex-col gap-1 py-3">
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="nav-link py-1.5"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const fullName = profile.name;
  const roles = profile.roles;

  const [nameIndex, setNameIndex] = useState(
    prefersReducedMotion ? fullName.length : 0,
  );
  const [descriptionIndex, setDescriptionIndex] = useState(
    prefersReducedMotion ? profile.summary.length : 0,
  );
  const [roleIndex, setRoleIndex] = useState(
    prefersReducedMotion ? roles[0].length : 0,
  );
  const [roleIdx, setRoleIdx] = useState(0);
  const [nameDone, setNameDone] = useState(prefersReducedMotion);

  // Type the name once
  useEffect(() => {
    if (prefersReducedMotion || nameDone) return;

    const typingSpeed = 90;
    let timeoutId: number;

    if (nameIndex < fullName.length) {
      timeoutId = window.setTimeout(
        () => setNameIndex((value) => value + 1),
        typingSpeed,
      );
    } else {
      setNameDone(true);
    }

    return () => window.clearTimeout(timeoutId);
  }, [nameIndex, prefersReducedMotion, nameDone, fullName]);

  // Type description once, starting after name finishes
  useEffect(() => {
    if (prefersReducedMotion || !nameDone) return;

    const typingSpeed = 90;
    const fullDescription = profile.summary;
    let timeoutId: number;

    if (descriptionIndex < fullDescription.length) {
      timeoutId = window.setTimeout(
        () => setDescriptionIndex((value) => value + 1),
        typingSpeed,
      );
    }

    return () => window.clearTimeout(timeoutId);
  }, [descriptionIndex, prefersReducedMotion, nameDone]);

  // Continuously cycle through roles, starting after name finishes
  useEffect(() => {
    if (prefersReducedMotion || !nameDone) return;

    const typingSpeed = 90;
    const pauseBetweenRoles = 2200;
    let timeoutId: number;

    const currentRole = roles[roleIdx];

    if (roleIndex < currentRole.length) {
      timeoutId = window.setTimeout(
        () => setRoleIndex((value) => value + 1),
        typingSpeed,
      );
    } else {
      timeoutId = window.setTimeout(() => {
        setRoleIndex(0);
        setRoleIdx((idx) => (idx + 1) % roles.length);
      }, pauseBetweenRoles);
    }

    return () => window.clearTimeout(timeoutId);
  }, [roleIndex, roleIdx, prefersReducedMotion, nameDone, roles]);

  return (
    <motion.section
      id="home"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="section-container relative flex min-h-[calc(100vh-4rem)] flex-col gap-10 pb-24 pt-12 md:flex-row md:items-center md:justify-between md:pt-16"
    >
      <div className="max-w-xl space-y-6">
        <div className="flex items-center gap-3">
          <span className="badge-soft">{profile.availabilityBadge}</span>
          <span className="text-xs text-slate-400">
            {profile.location} · Open to roles
          </span>
        </div>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-400/90">
            Hello, I&apos;m
          </p>
          {prefersReducedMotion ? (
            <>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
                {fullName}
              </h1>
              <p className="text-lg font-medium text-slate-300 sm:text-xl">
                {profile.roles.join(" · ")}
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                {profile.summary}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
                {fullName.slice(0, nameIndex)}
                <span className="inline-block w-1.5 ml-1 h-5 align-middle bg-emerald-400/80 animate-pulse rounded-sm" />
              </h1>
            </>
          )}
        </div>
        {!prefersReducedMotion && (
          <div className="space-y-2 min-h-[4.5rem] sm:min-h-[5rem]">
            {/* Roles line: keep constant vertical space to avoid layout shift */}
            <p className="text-lg font-medium text-slate-300 sm:text-xl min-h-[1.75rem]">
              {roleIndex === 0
                ? "\u00A0"
                : roles[roleIdx].slice(0, roleIndex)}
            </p>
            {/* Description: types once, stays fixed below roles, with reserved space */}
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {descriptionIndex === 0
                ? "\u00A0"
                : profile.summary.slice(0, descriptionIndex || 0)}
            </p>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View Resume
          </a>
          <a href="#projects" className="btn-secondary">
            View My Work
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400"
          >
            GitHub
          </a>
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400"
          >
            LinkedIn
          </a>
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-emerald-400"
          >
            {profile.email}
          </a>
        </div>
      </div>

      <div className="mt-4 flex w-full justify-center md:mt-0 md:w-auto">
        <motion.div
          className="lottie-card relative h-52 w-52 overflow-hidden rounded-[2rem] border border-emerald-400/60 shadow-[0_0_60px_rgba(16,185,129,0.45)] md:h-56 md:w-56"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <DotLottieReact
              src="https://lottie.host/2010ce14-90ac-46e0-af1a-89a8a3f14b05/cEtK4fqvt8.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </motion.div>
      </div>
      <div className="pointer-events-auto absolute bottom-6 left-1/2 flex w-full -translate-x-1/2 justify-center">
        <motion.button
          type="button"
          className="flex flex-col items-center gap-1 text-xs font-medium text-slate-400"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => {
            if (typeof document === "undefined") return;
            const nextSection =
              document.querySelector<HTMLElement>("#experience") ||
              document.querySelector<HTMLElement>("#projects");
            nextSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span>Scroll to explore</span>
          <span className="text-lg">↓</span>
        </motion.button>
      </div>
    </motion.section>
  );
}

function SkillsSection() {
  return (
    <motion.section
      id="skills"
      className="section-container pb-16 scroll-mt-24 md:scroll-mt-28"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-emerald-500/80" />
          <div>
            <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
              Technical Skills
            </h2>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              A snapshot of the tools and technologies I work with.
            </p>
          </div>
        </div>
      </div>
      <motion.div
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        transition={{ staggerChildren: 0.08 }}
      >
        {skills.map((group) => (
          <motion.article
            key={group.category}
            className="card transition-transform hover:-translate-y-1"
            variants={cardVariants}
          >
            <h3 className="text-sm font-semibold text-slate-100">
              {group.category}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((skillItem) => (
                <span key={skillItem} className="tag-pill">
                  {skillItem}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}

function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      className="section-container pb-16 scroll-mt-24 md:scroll-mt-28"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-emerald-500/80" />
          <div>
            <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
              Experience
            </h2>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Roles where I&apos;ve built production systems at scale.
            </p>
          </div>
        </div>
      </div>
      <motion.div
        className="grid gap-4 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {experiences.map((exp) => (
          <motion.article
            key={exp.company}
            className="card flex flex-col gap-3 transition-transform hover:-translate-y-1"
            variants={cardVariants}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  {exp.role}
                </h3>
                <p className="text-xs text-slate-400">{exp.company}</p>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                <p>{exp.period}</p>
                <p>{exp.location}</p>
              </div>
            </div>
            <ul className="mt-1 space-y-1.5 text-xs text-slate-300">
              {exp.bullets.map((bullet) => (
                <li key={bullet} className="leading-relaxed">
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-2">
              {exp.tags?.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}

function ProjectsSection() {
  return (
    <motion.section
      id="projects"
      className="section-container pb-16 scroll-mt-24 md:scroll-mt-28"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-emerald-500/80" />
          <div>
            <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
              Projects
            </h2>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Selected work spanning Web3, backend, and mobile.
            </p>
          </div>
        </div>
      </div>
      <motion.div
        className="grid gap-4 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {projects.map((project) => (
          <motion.article
            key={project.name}
            className="card flex flex-col gap-3 transition-transform hover:-translate-y-1"
            variants={cardVariants}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  {project.name}
                </h3>
                <p className="text-[11px] text-slate-400">{project.period}</p>
              </div>
            </div>
            <p className="text-xs text-slate-300">{project.description}</p>
            <ul className="mt-1 space-y-1.5 text-xs text-slate-300">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="leading-relaxed">
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-xs">
              <button
                type="button"
                className="btn-primary px-3 py-1.5 text-xs"
              >
                Code
              </button>
              <button
                type="button"
                className="btn-secondary px-3 py-1.5 text-xs"
              >
                Demo
              </button>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}

function AwardsSection() {
  if (!awards?.length) return null;

  return (
    <motion.section
      id="awards"
      className="section-container pb-16 scroll-mt-24 md:scroll-mt-28"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-emerald-500/80" />
          <div>
            <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
              Awards & Bounties
            </h2>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Recognition for impact, innovation, and delivery.
            </p>
          </div>
        </div>
      </div>
      <motion.div
        className="grid gap-4 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        transition={{ staggerChildren: 0.08 }}
      >
        {awards.map((award) => (
          <motion.article
            key={award.title}
            className="card space-y-2 transition-transform hover:-translate-y-1"
            variants={cardVariants}
          >
            <h3 className="text-sm font-semibold text-slate-100">
              {award.title}
            </h3>
            <p className="text-[11px] text-emerald-300">{award.issuer}</p>
            <p className="text-xs text-slate-300">{award.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}

function ContactSection() {
  const [mode, setMode] = useState<"message" | "referral">("message");
  const [showJobIdToast, setShowJobIdToast] = useState(false);

  const isReferral = mode === "referral";

  return (
    <motion.section
      id="contact"
      className="section-container pb-20 scroll-mt-24 md:scroll-mt-28"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-emerald-500/80" />
          <div>
            <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
              Contact
            </h2>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Let&apos;s talk about building something impactful together.
            </p>
          </div>
        </div>
      </div>
      <motion.div
        className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.div className="card space-y-4" variants={cardVariants}>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">
              Contact Details
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              I typically respond within a day.
            </p>
          </div>
          <div className="space-y-3 text-xs text-slate-200">
            <div className="rounded-xl border border-slate-800/60 bg-slate-950/80 p-3">
              <p className="text-[11px] text-slate-400">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-0.5 block text-sm text-emerald-300 hover:text-emerald-200"
              >
                {profile.email}
              </a>
            </div>
            <div className="rounded-xl border border-slate-800/60 bg-slate-950/80 p-3">
              <p className="text-[11px] text-slate-400">Location</p>
              <p className="mt-0.5 text-sm text-slate-200">
                {profile.location}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.form
          className="card space-y-4"
          variants={cardVariants}
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const formData = new FormData(form);
            const name = formData.get("name");
            const email = formData.get("email");
            const subject = formData.get("subject");
            const message = formData.get("message");

            if (!name || !email || !subject || !message) {
              return;
            }

            if (isReferral) {
              const subjectStr = String(subject || "");
              const jobIdPattern = /^REF\d{6}W$/;
              const jobIds = subjectStr
                .split(",")
                .map((id) => id.trim())
                .filter((id) => id.length > 0);

              if (
                jobIds.length === 0 ||
                jobIds.some((id) => !jobIdPattern.test(id))
              ) {
                setShowJobIdToast(true);
                setTimeout(() => setShowJobIdToast(false), 3000);
                return;
              }
            }

            const targetEmail = isReferral
              ? profile.referralEmail
              : profile.email;

            const mailto = `mailto:${targetEmail}?subject=${encodeURIComponent(
              String(subject || `Portfolio contact from ${name || "Visitor"}`),
            )}&body=${encodeURIComponent(String(message || ""))}`;

            window.location.href = mailto;
          }}
        >
          {showJobIdToast && (
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 200, opacity: 0 }}
              className="mb-2 rounded-lg border border-red-500/60 bg-red-900/70 px-3 py-2 text-[11px] text-red-100 shadow-lg"
            >
              Job IDs are not of correct format.
            </motion.div>
          )}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  {isReferral ? "Ask for referral" : "Send a Message"}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  {isReferral ? (
                    <>
                      Get the relevant Job ID from this{" "}
                      <a
                        href="https://www.visa.co.uk/en_gb/jobs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
                      >
                        Visa careers page
                      </a>{" "}
                      and include it below.
                    </>
                  ) : (
                    "This uses your default email client to send the message."
                  )}
                </p>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/80 p-0.5 text-[10px]">
                <button
                  type="button"
                  className={`px-2 py-1 rounded-full transition ${
                    !isReferral
                      ? "bg-emerald-500/80 text-slate-950"
                      : "text-slate-300"
                  }`}
                  onClick={() => setMode("message")}
                >
                  Message
                </button>
                <button
                  type="button"
                  className={`px-2 py-1 rounded-full transition ${
                    isReferral
                      ? "bg-emerald-500/80 text-slate-950"
                      : "text-slate-300"
                  }`}
                  onClick={() => setMode("referral")}
                >
                  Referral
                </button>
              </div>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-xs font-medium text-slate-300"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="h-9 w-full rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 text-xs text-slate-100 outline-none ring-emerald-500/60 focus:border-emerald-500 focus:ring-1"
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-slate-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="h-9 w-full rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 text-xs text-slate-100 outline-none ring-emerald-500/60 focus:border-emerald-500 focus:ring-1"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="subject"
              className="text-xs font-medium text-slate-300"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              className="h-9 w-full rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 text-xs text-slate-100 outline-none ring-emerald-500/60 focus:border-emerald-500 focus:ring-1"
              placeholder={
                isReferral
                  ? "e.g. REF075148W, REF075149W"
                  : "Project opportunity, collaboration, etc."
              }
              required
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="text-xs font-medium text-slate-300"
            >
              Message
            </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                maxLength={700}
                className="w-full resize-none rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 outline-none ring-emerald-500/60 focus:border-emerald-500 focus:ring-1"
                placeholder={
                  isReferral
                    ? "Why are you a good fit for the role?\n\nWrite the response in a third-person narrative format (e.g., “Rohit has improved pipeline efficiency by X%”).\n\nNote: Add numerical values to make it more impactful 🚀"
                    : "Tell me a bit about what you have in mind..."
                }
                required
              />
          </div>
          <input id="resume" name="resume" type="file" className="hidden" />
          <div className="pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="btn-primary hover:-translate-y-0.5 transform transition"
              >
                {isReferral ? "Ask for referral" : "Send Message"}
              </button>
              <button
                type="button"
                className="btn-secondary px-3 py-1.5 text-xs"
                onClick={() => {
                  const input = document.getElementById(
                    "resume",
                  ) as HTMLInputElement | null;
                  input?.click();
                }}
              >
                Upload Document
              </button>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90">
      <div className="section-container flex flex-col items-center justify-between gap-3 py-4 text-[11px] text-slate-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="text-[11px] text-slate-500">
          {profile.roles.join(" · ")}
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <AwardsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
