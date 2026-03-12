/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Sign In",
    description:
      "Access the FieldFlow console with your team credentials. Roles and permissions are scoped per project.",
    icon: "🔑",
  },
  {
    number: "02",
    title: "Pick a Project",
    description:
      "Select from your active construction sites. View current status, location, and start date at a glance.",
    icon: "🏗️",
  },
  {
    number: "03",
    title: "Submit Your DPR",
    description:
      "Fill in weather, workforce, progress notes, and site photos. Validate and submit in under 2 minutes.",
    icon: "✅",
  },
];

const stepVariant = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.15 },
  }),
};

export function WorkflowSection() {
  return (
    <section id="how-it-works" className="bg-app py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--ff-accent-secondary)]">
            How It Works
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Up and running in 3 steps
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-secondary">
            No training required. Any field engineer can submit their first DPR on day one.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
          {/* Connector line (desktop only) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-px bg-[color:var(--ff-accent-soft)]/50 md:block"
            style={{ left: "calc(50%/3 + 24px)", right: "calc(50%/3 + 24px)" }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              custom={i}
              variants={stepVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="relative flex flex-col items-center text-center md:px-6"
            >
              {/* Step circle */}
              <div className="relative z-10 mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[color:var(--ff-accent-primary)] text-white shadow-soft">
                <span className="text-lg">{step.icon}</span>
              </div>

              {/* Step number badge */}
              <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[color:var(--ff-accent-primary)]">
                Step {step.number}
              </span>

              <h3 className="text-base font-semibold text-primary">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{step.description}</p>

              {/* Vertical connector (mobile only) */}
              {i < STEPS.length - 1 && (
                <div className="mt-6 h-6 w-px bg-[color:var(--ff-accent-soft)]/60 md:hidden" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
