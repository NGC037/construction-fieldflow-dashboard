import { Link } from "react-router-dom";
import { useDprs } from "../state/dpr/DprContext.jsx";
import { Card } from "../ui/Card.jsx";
import { Button } from "../ui/Button.jsx";

export function DprListPage() {
  const { dprs } = useDprs();

  if (!dprs.length) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-secondary">
              DPR history
            </h2>
            <p className="mt-2 text-sm text-secondary">
              Submitted daily progress reports will appear here.
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          No DPRs have been recorded yet.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-secondary">
            DPR history
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Review previously submitted daily progress reports.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {dprs
          .slice()
          .reverse()
          .map((dpr) => (
            <Card
              key={dpr.id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    {dpr.projectName}
                  </p>
                  <p className="mt-1 text-sm text-secondary">
                    {new Date(dpr.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right text-xs text-secondary">
                  <p>{dpr.weather}</p>
                  <p className="mt-1">
                    Workers: <span className="font-semibold text-primary">{dpr.workerCount}</span>
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-secondary">
                {dpr.description.length > 140
                  ? `${dpr.description.slice(0, 140)}…`
                  : dpr.description}
              </p>

              {dpr.images?.length ? (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {dpr.images.slice(0, 3).map((img) => (
                    <div
                      key={img.id}
                      className="overflow-hidden rounded-lg border border-slate-200 bg-surface-alt"
                    >
                      <img
                        src={img.dataUrl}
                        alt={img.name}
                        className="h-20 w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-4 flex justify-end">
                <Button
                  as={Link}
                  to={`/dprs/${encodeURIComponent(dpr.id)}`}
                  variant="secondary"
                  size="sm"
                >
                  View report
                </Button>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}

