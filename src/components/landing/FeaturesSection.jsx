/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "📋",
    title: "Daily Progress Reports",
    description:
      "Log every field activity with structured forms. Weather, workforce, materials — all captured in one place, every single day.",
  },
  {
    icon: "📸",
    title: "Site Photo Evidence",
    description:
      "Attach up to 3 site images per DPR. Visual documentation that proves progress and protects your team during disputes.",
  },
  {
    icon: "🏗️",
    title: "Multi-Project Tracking",
    description:
      "Manage Active, Delayed, and Completed projects from a single dashboard. Instant status at a glance, no spreadsheets needed.",
  },
  {
    icon: "⚡",
    title: "Instant Submission",
    description:
      "Submit reports in under 2 minutes. Validation ensures completeness before the report ever gets saved.",
  },
  {
    icon: "☁️",
    title: "Works Offline-First",
    description:
      "All data is stored locally and syncs when you're back online. Field sites with poor connectivity are not a problem.",
  },
  {
    icon: "🔒",
    title: "Secure & Auditable",
    description:
      "Every DPR is timestamped and tied to a project. A clean audit trail your site managers and clients can trust.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function FeaturesSection() {
  return (
    <section id="features" className="bg-app py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--ff-accent-secondary)]">
            Features
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Everything field teams need
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-secondary">
            Designed around the real daily workflow of construction professionals.
            No bloat, no complexity — just the tools you actually use.
          </p>
        </div>

        {/* Feature cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="card group flex flex-col gap-3 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--ff-accent-soft)]/30 text-xl">
                {f.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">{f.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-secondary">{f.description}</p>
              </div>
              {/* Accent bottom bar */}
              <div className="mt-auto h-0.5 w-8 rounded-full bg-[color:var(--ff-accent-primary)] opacity-0 transition-all duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
