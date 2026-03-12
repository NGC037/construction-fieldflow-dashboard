import { Link } from "react-router-dom";
import { Card } from "../ui/Card.jsx";
import { Badge } from "../ui/Badge.jsx";
import { Button } from "../ui/Button.jsx";
import { formatDate } from "../utils/date.js";

function statusTone(status) {
  if (status === "Active") return "emerald";
  if (status === "Completed") return "slate";
  return "rose";
}

export function ProjectCard({ project }) {
  return (
    <Card className="group bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">
      <div className="grid grid-rows-[auto_1fr_auto] gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary">
              Project
            </p>
            <h3 className="mt-1 truncate text-sm font-semibold text-primary">
              {project.name}
            </h3>
            <p className="mt-1 text-[11px] text-secondary">
              {project.location}
            </p>
          </div>
          <Badge tone={statusTone(project.status)}>{project.status}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-lg bg-surface-alt p-2 text-secondary">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary">
              Start
            </p>
            <p className="mt-1 font-mono text-xs text-primary">
              {formatDate(project.startDate)}
            </p>
          </div>
          <div className="rounded-lg bg-surface-alt p-2 text-secondary">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary">
              ID
            </p>
            <p className="mt-1 font-mono text-xs text-primary">{project.id}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1 text-[11px]">
          <p className="text-secondary">Open detail view &amp; create DPR.</p>
          <Button
            as={Link}
            to={`/projects/${project.id}`}
            variant="secondary"
            size="sm"
          >
            View details
          </Button>
        </div>
      </div>
      <div className="h-1 w-full bg-[color:var(--ff-accent-soft)]/80" />
    </Card>
  );
}
