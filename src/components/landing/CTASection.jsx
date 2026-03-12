/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 md:py-28">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[color:var(--ff-accent-primary)] opacity-15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-80 w-80 translate-x-1/3 rounded-full bg-[color:var(--ff-accent-secondary)] opacity-15 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-4 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--ff-accent-soft)]/30 bg-[color:var(--ff-accent-soft)]/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--ff-accent-soft)]" />
            <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--ff-accent-soft)]">
              Free to use
            </span>
          </span>

          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Start tracking field progress{" "}
            <span className="text-[color:var(--ff-accent-primary)]">today</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400">
            FieldFlow gives your team one place to log, review, and prove daily construction progress.
            No setup cost. No learning curve. Just results.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/login"
              className="btn-primary inline-flex h-12 items-center rounded-xl px-8 text-sm font-semibold shadow-soft"
            >
              Get Started Free
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#features"
              className="inline-flex h-12 items-center rounded-xl border border-slate-700 px-8 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Explore features
            </a>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="mt-20 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-[color:var(--ff-accent-primary)]">
                <span className="text-[10px] font-bold text-white">CF</span>
              </div>
              <span className="text-sm font-semibold text-slate-400">FieldFlow</span>
            </div>
            <p className="text-xs text-slate-600">
              © 2026 FieldFlow Construction DPR · Built for field teams
            </p>
            <div className="flex gap-4 text-xs text-slate-600">
              <span>Privacy</span>
              <span>Terms</span>
              <a href="#features" className="hover:text-slate-400 transition">Features</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
