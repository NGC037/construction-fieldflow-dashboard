import { useMemo } from "react";
import { Link } from "react-router-dom";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useDprs } from "../../state/dpr/DprContext.jsx";
import { Card } from "../../ui/Card.jsx";
import { Badge } from "../../ui/Badge.jsx";

const cardVariant = {
  hidden: { opacity: 0, x: 20, scale: 0.95 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const weatherTokens = {
  Sunny: "amber",
  Cloudy: "slate",
  Rainy: "emerald", // or blue if we had a blue token, but these match Badge tones
};

// Extracted timeline item
function TimelineCard({ dpr }) {
  const timeLabel = new Date(dpr.date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      layout
      variants={cardVariant}
      initial="hidden"
      animate="show"
      className="relative pl-8 sm:pl-10"
    >
      {/* Timeline Node */}
      <div className="absolute left-[3px] top-5 h-3 w-3 -translate-x-[50%] rounded-full border-2 border-[color:var(--ff-surface)] bg-[color:var(--ff-accent-secondary)] shadow-sm sm:left-[5px] sm:h-4 sm:w-4" />

      {/* Card Content */}
      <Card className="group transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--ff-accent-secondary)] hover:shadow-md">
        <div className="p-4 sm:p-5">
          {/* Top Row: Time & Weather */}
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              {timeLabel}
            </span>
            <Badge tone={weatherTokens[dpr.weather] || "slate"}>
              {dpr.weather}
            </Badge>
          </div>

          {/* Middle: Description */}
          <p className="mb-4 text-sm leading-relaxed text-primary">
            {dpr.description.length > 80
              ? `${dpr.description.slice(0, 80)}…`
              : dpr.description}
          </p>

          {/* Tags Row */}
          <div className="mb-4 flex flex-wrap gap-2 text-[11px] font-medium">
            <span className="inline-flex items-center rounded-md bg-surface-alt px-2 py-1 text-secondary">
              {dpr.workerCount} workers
            </span>
            {dpr.images?.length > 0 && (
              <span className="inline-flex items-center rounded-md bg-surface-alt px-2 py-1 text-secondary">
                {dpr.images.length} photo{dpr.images.length === 1 ? "" : "s"}
              </span>
            )}
          </div>

          {/* Bottom: Thumbnails */}
          {dpr.images && dpr.images.length > 0 && (
            <div className="flex gap-2">
              {dpr.images.map((img) => (
                <div
                  key={img.id}
                  className="h-10 w-10 overflow-hidden rounded-md border border-slate-200 sm:h-12 sm:w-12"
                >
                  <img
                    src={img.dataUrl}
                    alt={img.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

export function TodayTimeline({ projectId, date }) {
  const { dprs } = useDprs();

  // Filter DPRs for the selected project AND the currently selected form date
  const todaysDprs = useMemo(() => {
    if (!projectId) return [];
    const targetDateStr = date || new Date().toISOString().slice(0, 10);
    return dprs
      .filter((d) => d.projectId === projectId && d.date.startsWith(targetDateStr))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [dprs, projectId, date]);

  if (!projectId) return null;

  return (
    <section id="timeline" className="scroll-mt-24 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-primary">Today's Activity</h3>
        <p className="mt-1 text-sm text-secondary">
          All DPR entries submitted for this date.
        </p>
      </div>

      <div className="relative">
        {todaysDprs.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-surface-alt py-16 text-center shadow-sm"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-soft text-2xl">
              📋
            </div>
            <h4 className="text-base font-semibold text-primary">
              No DPRs recorded yet.
            </h4>
            <p className="mt-2 max-w-sm text-sm text-secondary">
              Fill in the form above to create the first daily report for this
              project today.
            </p>
          </motion.div>
        ) : (
          /* Populated Timeline */
          <div className="relative py-2">
            {/* The vertical connector line */}
            <div className="absolute bottom-0 left-[3px] top-6 w-[2px] -translate-x-[50%] bg-[color:var(--ff-accent-soft)]/60 sm:left-[5px]" />

            <div className="flex flex-col gap-6">
              <AnimatePresence initial={false}>
                {todaysDprs.map((dpr) => (
                  <TimelineCard key={dpr.id} dpr={dpr} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
