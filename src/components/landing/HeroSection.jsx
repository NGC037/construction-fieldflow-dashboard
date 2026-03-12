import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

const ROLES = ["Site Engineers", "Project Managers", "Contractors", "Owners"];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-app py-24 md:py-36">
      {/* Decorative background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(var(--ff-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--ff-text-primary) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Floating background elements */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 animate-[float_28s_ease-in-out_infinite] rounded-full bg-[color:var(--ff-accent-primary)] opacity-5 blur-3xl md:h-96 md:w-96" />
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 animate-[float_32s_ease-in-out_infinite_reverse] rounded-full bg-[color:var(--ff-accent-secondary)] opacity-5 blur-3xl md:h-96 md:w-96" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 animate-[float_30s_ease-in-out_infinite_2s] rounded-full bg-[color:var(--ff-accent-primary)] opacity-5 blur-3xl md:h-[400px] md:w-[400px]" />

      <div className="relative mx-auto max-w-[1200px] px-4 text-center md:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--ff-accent-soft)] bg-[color:var(--ff-accent-soft)]/20 px-3 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--ff-accent-secondary)]" />
          <span className="text-xs font-semibold text-[color:var(--ff-accent-secondary)] uppercase tracking-wide">
            Construction Field Management
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl md:text-6xl"
        >
          Daily Progress Reports{" "}
          <span className="text-[color:var(--ff-accent-primary)]">built for</span>
        </motion.h1>

        {/* Rotating role text */}
        <div className="mt-2 flex h-14 items-center justify-center overflow-hidden md:h-16">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-4xl font-bold tracking-tight text-[color:var(--ff-accent-secondary)] sm:text-5xl md:text-6xl"
            >
              {ROLES[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-secondary sm:text-lg"
        >
          Log workforce, weather, and site progress — with photo evidence — in under 2 minutes.
          All your projects, one command console.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/login"
            className="btn-primary inline-flex h-11 items-center rounded-xl px-6 text-sm font-semibold shadow-soft duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            Get Started Free
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <a
            href="#how-it-works"
            className="btn-secondary inline-flex h-11 items-center rounded-xl px-6 text-sm font-semibold duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            See how it works
          </a>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-secondary"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-[color:var(--ff-accent-soft)]">✓</span> No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[color:var(--ff-accent-soft)]">✓</span> Works offline
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[color:var(--ff-accent-soft)]">✓</span> Instant setup
          </span>
        </motion.div>
      </div>
    </section>
  );
}
