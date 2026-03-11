import { useMemo, useState } from "react";
import { PROJECTS, PROJECT_STATUSES } from "../constants/projects.js";
import { ProjectCard } from "../components/ProjectCard.jsx";
import { Input } from "../ui/Input.jsx";
import { Select } from "../ui/Select.jsx";
import { Badge } from "../ui/Badge.jsx";

function statusTone(status) {
  if (status === "Active") return "emerald";
  if (status === "Completed") return "slate";
  return "rose";
}

export function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const matchesQuery = !q || `${p.name} ${p.location} ${p.id}`.toLowerCase().includes(q);
      const matchesStatus = status === "All" || p.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <div className="space-y-5">
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card mt-4 bg-surface-alt p-6 text-center">
          <p className="text-sm font-semibold text-primary">No projects match</p>
          <p className="mt-2 text-sm text-secondary">
            Try a different search term or clear the status filter.
          </p>
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
    </div>
  );
}

