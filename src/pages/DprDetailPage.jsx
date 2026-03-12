import { Link, Navigate, useParams } from "react-router-dom";
import { useDprs } from "../state/dpr/DprContext.jsx";
import { Button } from "../ui/Button.jsx";

export function DprDetailPage() {
  const { id } = useParams();
  const { getDprById } = useDprs();
  const dpr = getDprById(id);

  if (!dpr) {
    return <Navigate to="/dprs" replace />;
  }

  const dateLabel = new Date(dpr.date).toLocaleDateString();

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-secondary">
            DPR report
          </h2>
          <p className="mt-2 text-xl font-semibold text-primary">{dpr.projectName}</p>
          <p className="mt-1 text-sm text-secondary">
            {dateLabel} · {dpr.weather} · {dpr.workerCount} workers
          </p>
        </div>
        <div className="flex gap-2">
          <Button as={Link} to="/dprs" variant="secondary" size="sm">
            Back to history
          </Button>
          <Button as={Link} to="/projects" variant="secondary" size="sm">
            Projects
          </Button>
        </div>
      </div>

      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-sm font-semibold text-primary">Report header</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm text-secondary">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
              Project
            </p>
            <p className="mt-1 text-primary">{dpr.projectName}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
              Date
            </p>
            <p className="mt-1 text-primary">{dateLabel}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
              Weather
            </p>
            <p className="mt-1 text-primary">{dpr.weather}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
              Worker count
            </p>
            <p className="mt-1 text-primary">{dpr.workerCount}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-sm font-semibold text-primary">Work summary</h3>
        </div>
        <p className="text-sm leading-relaxed text-secondary whitespace-pre-wrap">
          {dpr.description}
        </p>
      </section>

      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-sm font-semibold text-primary">Site images</h3>
        </div>
        {dpr.images && dpr.images.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {dpr.images.map((img) => (
              <div
                key={img.id}
                className="overflow-hidden rounded-lg border border-slate-200 bg-surface-alt"
              >
                <img
                  src={img.dataUrl}
                  alt={img.name}
                  className="h-40 w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-secondary">No images were attached to this report.</p>
        )}
      </section>
    </div>
  );
}

