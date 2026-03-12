/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export function UIPreviewSection() {
  return (
    <section className="bg-[color:var(--ff-surface-alt)] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--ff-accent-secondary)]">
            Live Preview
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            See it before you sign up
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-secondary">
            A real look at the FieldFlow console — clean, fast, and purpose-built for construction.
          </p>
        </div>

        {/* Browser frame wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_32px_72px_rgba(15,23,42,0.14)]"
        >
          {/* Fake browser chrome */}
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <div className="ml-2 flex-1 rounded-md bg-white px-3 py-1 text-[11px] text-slate-400 border border-slate-200">
              app.fieldflow.construction/projects
            </div>
          </div>

          {/* Mock app UI */}
          <div className="bg-app p-5">
            {/* Mock header */}
            <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-[color:var(--ff-accent-primary)] grid place-items-center">
                  <span className="text-[9px] font-bold text-white">CF</span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-800">FieldFlow</p>
                  <p className="text-[9px] text-slate-400">Construction DPR</p>
                </div>
              </div>
              <div className="flex gap-2 text-[10px]">
                <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600 font-medium">Projects</span>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600 font-medium">Create DPR</span>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600 font-medium">DPR History</span>
              </div>
              <div className="h-6 w-6 rounded-full bg-[color:var(--ff-surface-alt)] text-[10px] grid place-items-center font-semibold text-primary border border-slate-200">
                TU
              </div>
            </div>

            {/* Stats row */}
            <div className="mb-4 grid grid-cols-4 gap-3">
              {[
                { label: "ACTIVE", value: "3" },
                { label: "DELAYED", value: "1" },
                { label: "COMPLETED", value: "1" },
                { label: "TOTAL DPRS", value: "7" },
              ].map(({ label, value }) => (
                <div key={label} className="card p-3">
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-secondary">{label}</p>
                  <p className="mt-1 text-xl font-semibold text-primary">{value}</p>
                </div>
              ))}
            </div>

            {/* Project cards row */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { name: "Riverside Tower Expansion", location: "Pune, MH", status: "Active", tone: "emerald", id: "p-001" },
                { name: "Metro Station Concourse", location: "Mumbai, MH", status: "Delayed", tone: "rose", id: "p-002" },
                { name: "Logistics Park Phase 2", location: "Navi Mumbai, MH", status: "Active", tone: "emerald", id: "p-003" },
              ].map((p) => (
                <div key={p.id} className="card overflow-hidden p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-secondary">Project</p>
                      <p className="mt-0.5 truncate text-[11px] font-semibold text-primary">{p.name}</p>
                      <p className="text-[9px] text-secondary">{p.location}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                        p.tone === "emerald"
                          ? "bg-[color:var(--ff-accent-soft)] text-[color:var(--ff-text-primary)]"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div className="mt-2 h-0.5 w-full bg-[color:var(--ff-accent-soft)]/80 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
