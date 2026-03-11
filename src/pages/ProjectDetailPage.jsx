import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { PROJECTS } from "../constants/projects.js";
import { Badge } from "../ui/Badge.jsx";
import { Button } from "../ui/Button.jsx";
import { Card } from "../ui/Card.jsx";
import { formatDate } from "../utils/date.js";

function statusTone(status) {
  if (status === "Active") return "emerald";
  if (status === "Completed") return "slate";
  return "rose";
}

export function ProjectDetailPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-secondary">
              Project detail
            </h2>
            <Badge tone={statusTone(project.status)}>{project.status}</Badge>
          </div>
          <p className="mt-2 text-sm text-secondary">
            {project.location} · Start {formatDate(project.startDate)}
          </p>
          <p className="mt-3 text-xl font-semibold text-primary">
            {project.name}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button as={Link} to={`/dpr/new?projectId=${encodeURIComponent(project.id)}`}>
            Create DPR
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            Project overview
          </p>
          <p className="mt-3 text-sm text-secondary">
            Track daily progress, workforce, and site conditions in a consistent DPR format. This demo uses mock
            data, but the layout is ready for API integration.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-surface-alt p-3 text-xs text-secondary">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary">
                Project ID
              </p>
              <p className="mt-2 font-mono text-sm text-primary">{project.id}</p>
            </div>
            <div className="rounded-lg bg-surface-alt p-3 text-xs text-secondary">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary">
                Start date
              </p>
              <p className="mt-2 text-sm text-primary">{formatDate(project.startDate)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            Next actions
          </p>
          <p className="mt-3 text-sm text-secondary">
            Create a DPR entry for today’s work and attach up to 3 site images.
          </p>
          <Button as={Link} to={`/dpr/new?projectId=${encodeURIComponent(project.id)}`} className="mt-4 w-full">
            Create DPR
          </Button>
          <Button as={Link} to="/projects" variant="secondary" className="mt-2 w-full">
            View all projects
          </Button>
        </Card>
      </div>
    </div>
  );
}

