/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const PERSONAS = [
  {
    avatar: "👷",
    role: "Site Engineer",
    quote: "I submit my DPR while still on-site. It takes less time than a WhatsApp message.",
    points: [
      "Log daily workforce and weather",
      "Attach site photos directly from mobile",
      "Track multiple sites simultaneously",
    ],
    accent: "var(--ff-accent-primary)",
  },
  {
    avatar: "📊",
    role: "Project Manager",
    quote: "I can review any project's daily reports from HQ without a single phone call.",
    points: [
      "Dashboard overview across all projects",
      "Filter by status: Active, Delayed, Completed",
      "Audit trail for every submitted DPR",
    ],
    accent: "var(--ff-accent-secondary)",
  },
  {
    avatar: "🦺",
    role: "Field Supervisor",
    quote: "No more lost paper forms. Everything is recorded, timestamped, and searchable.",
    points: [
      "Quick form with validations built-in",
      "Offline-first — no signal, no problem",
      "Instant success toast on submission",
    ],
    accent: "var(--ff-accent-soft)",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.13 },
  }),
};

export function PersonasSection() {
  return (
    <section id="personas" className="bg-[color:var(--ff-surface-alt)] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--ff-accent-secondary)]">
            Who It's For
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Built for every role on the job site
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-secondary">
            Whether you're boots-on-ground or behind a desk, FieldFlow fits how you work.
          </p>
        </div>

        {/* Persona cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PERSONAS.map((p, i) => (
            <motion.div
              key={p.role}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="card flex flex-col gap-4 overflow-hidden p-6"
              style={{ borderTop: `3px solid ${p.accent}` }}
            >
              {/* Avatar + role */}
              <div className="flex items-center gap-3">
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-2xl"
                  style={{ backgroundColor: `color-mix(in srgb, ${p.accent} 18%, transparent)` }}
                >
                  {p.avatar}
                </div>
                <p className="font-semibold text-primary">{p.role}</p>
              </div>

              {/* Quote */}
              <blockquote className="text-sm italic leading-relaxed text-secondary">
                "{p.quote}"
              </blockquote>

              {/* Bullet points */}
              <ul className="mt-auto space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-xs text-secondary">
                    <span
                      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: p.accent }}
                    />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
