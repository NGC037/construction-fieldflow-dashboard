import { useEffect, useMemo, useState } from "react";
import { PROJECTS, PROJECT_STATUSES } from "../constants/projects.js";
import { ProjectCard } from "../components/ProjectCard.jsx";
import { Input } from "../ui/Input.jsx";
import { Select } from "../ui/Select.jsx";
import { Badge } from "../ui/Badge.jsx";
import { useDprs } from "../state/dpr/DprContext.jsx";

function statusTone(status) {
  if (status === "Active") return "emerald";
  if (status === "Completed") return "slate";
  return "rose";
}

export function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const { dprs } = useDprs();

  const summary = useMemo(() => {
    const active = PROJECTS.filter((p) => p.status === "Active").length;
    const delayed = PROJECTS.filter((p) => p.status === "Delayed").length;
    const completed = PROJECTS.filter((p) => p.status === "Completed").length;
    const totalDprs = dprs.length;
    return { active, delayed, completed, totalDprs };
  }, [dprs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const matchesQuery = !q || `${p.name} ${p.location} ${p.id}`.toLowerCase().includes(q);
      const matchesStatus = status === "All" || p.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 350);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-secondary">
              Projects
            </h2>
            <Badge tone="slate">{PROJECTS.length} total</Badge>
          </div>
          <p className="mt-2 text-sm text-secondary">
            Search, filter and open individual projects to issue DPRs.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-end">
          <div className="sm:w-72">
            <Input
              label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, location, or ID…"
            />
          </div>
          <div className="sm:w-52">
            <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All</option>
              {PROJECT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="card flex items-center justify-between p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
              Active
            </p>
            <p className="mt-1 text-2xl font-semibold text-primary">
              {summary.active}
            </p>
          </div>
        </div>
        <div className="card flex items-center justify-between p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
              Delayed
            </p>
            <p className="mt-1 text-2xl font-semibold text-primary">
              {summary.delayed}
            </p>
          </div>
        </div>
        <div className="card flex items-center justify-between p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
              Completed
            </p>
            <p className="mt-1 text-2xl font-semibold text-primary">
              {summary.completed}
            </p>
          </div>
        </div>
        <div className="card flex items-center justify-between p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
              Total DPRs
            </p>
            <p className="mt-1 text-2xl font-semibold text-primary">
              {summary.totalDprs}
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-pulse"
            >
              <div className="h-4 w-1/3 rounded bg-slate-200" />
              <div className="mt-3 h-3 w-1/2 rounded bg-slate-200" />
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="h-14 rounded bg-slate-100" />
                <div className="h-14 rounded bg-slate-100" />
              </div>
              <div className="mt-4 h-8 w-24 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-12 text-center text-sm text-gray-500">
              No projects found
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-secondary">
              <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
                Status
              </span>
              {PROJECT_STATUSES.map((s) => (
                <Badge key={s} tone={statusTone(s)}>
                  {s}
                </Badge>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

