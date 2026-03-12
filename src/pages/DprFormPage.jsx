import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams, useParams } from "react-router-dom";
import { PROJECTS } from "../constants/projects.js";
import { WEATHER_OPTIONS } from "../constants/dpr.js";
import { Card } from "../ui/Card.jsx";
import { Badge } from "../ui/Badge.jsx";
import { Input } from "../ui/Input.jsx";
import { Select } from "../ui/Select.jsx";
import { Textarea } from "../ui/Textarea.jsx";
import { Button } from "../ui/Button.jsx";
import { useToast } from "../state/toast/ToastContext.jsx";
import { useDprs } from "../state/dpr/DprContext.jsx";
import { TodayTimeline } from "../components/dpr/TodayTimeline.jsx";

function buildErrors(values) {
  const next = {};
  if (!values.projectId) next.projectId = "Please select a project.";
  if (!values.date) next.date = "Please select a date.";
  if (!values.weather) next.weather = "Please choose weather.";
  if (!values.workDescription?.trim()) next.workDescription = "Work description is required.";
  const count = Number(values.workerCount);
  if (!Number.isFinite(count) || count <= 0) next.workerCount = "Worker count must be greater than 0.";
  if (values.images.length === 0) next.images = "Please attach at least one image (max 3).";
  if (values.images.length > 3) next.images = "You can upload up to 3 images.";
  return next;
}

export function DprFormPage() {
  const navigate = useNavigate();
  const { pushToast } = useToast();
  const { addDpr } = useDprs();
  const { projectId: routeProjectId } = useParams();
  const [searchParams] = useSearchParams();
  const preselectedProjectId = routeProjectId || searchParams.get("projectId") || "";

  const fileInputRef = useRef(null);
  const [values, setValues] = useState({
    projectId: preselectedProjectId,
    date: new Date().toISOString().slice(0, 10),
    weather: "Sunny",
    workDescription: "",
    workerCount: 1,
    images: [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const previews = useMemo(
    () =>
      values.images.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    [values.images],
  );

  useEffect(() => {
    return () => {
      for (const p of previews) URL.revokeObjectURL(p.url);
    };
  }, [previews]);

  function update(key, val) {
    setValues((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function onFilesSelected(filesList) {
    const incoming = Array.from(filesList || []);
    if (incoming.length === 0) return;
    const next = [...values.images, ...incoming].slice(0, 3);
    update("images", next);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeImage(idx) {
    const next = values.images.filter((_, i) => i !== idx);
    update("images", next);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const nextErrors = buildErrors(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const images = await Promise.all(
        values.images.map(
          (file) =>
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () =>
                resolve({
                  id: `${file.name}-${file.size}-${file.lastModified}`,
                  name: file.name,
                  dataUrl: reader.result,
                });
              reader.readAsDataURL(file);
            }),
        ),
      );

      const project = PROJECTS.find((p) => p.id === values.projectId);

      addDpr({
        id: `${values.projectId}-${values.date}-${Date.now()}`,
        projectId: values.projectId,
        projectName: project?.name ?? values.projectId,
        date: values.date,
        weather: values.weather,
        workerCount: Number(values.workerCount),
        description: values.workDescription.trim(),
        images,
      });

      pushToast({
        title: "DPR created",
        message: "Your daily progress report was saved successfully.",
        variant: "success",
      });
      // Do not navigate away: let the user see their new DPR in the timeline below
      // Reset form fields
      setValues({
        ...values,
        workDescription: "",
        workerCount: 1,
        images: [],
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Get currently selected project for header badge/title
  const selectedProject = useMemo(
    () => PROJECTS.find((p) => p.id === values.projectId),
    [values.projectId]
  );

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-12">
      {/* 1. Page Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Daily Progress Report
          </h1>
          {selectedProject ? (
            <div className="mt-2 flex items-center gap-3">
              <p className="text-sm font-medium text-secondary">
                Project: {selectedProject.name} – {selectedProject.location}
              </p>
              <Badge tone={selectedProject.status === "Active" ? "emerald" : "slate"}>
                {selectedProject.status}
              </Badge>
            </div>
          ) : (
            <p className="mt-2 text-sm text-secondary">
              Select a project to log today's activity.
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button as={Link} to="/projects" variant="subtle" size="sm">
            Back to Projects →
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => {
              document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Today ⬇
          </Button>
        </div>
      </div>

      {/* 2. Existing DPR Form (Restructured) */}
      <form onSubmit={onSubmit}>
        <Card className="p-6">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-sm font-semibold text-primary">Report Details</h2>
            <p className="text-xs text-secondary mt-1">All fields are strictly required before submission.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-5">
            <Select
              label="Project"
              value={values.projectId}
              onChange={(e) => update("projectId", e.target.value)}
              error={errors.projectId}
            >
              <option value="">Select a project…</option>
              {PROJECTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>

            <Input
              label="Date"
              type="date"
              value={values.date}
              onChange={(e) => update("date", e.target.value)}
              error={errors.date}
            />

            <Select
              label="Weather"
              value={values.weather}
              onChange={(e) => update("weather", e.target.value)}
              error={errors.weather}
            >
              {WEATHER_OPTIONS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </Select>

            <Input
              label="Worker count"
              type="number"
              min={1}
              value={values.workerCount}
              onChange={(e) => update("workerCount", e.target.value)}
              error={errors.workerCount}
            />
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <Textarea
                label="Work description"
                value={values.workDescription}
                onChange={(e) => update("workDescription", e.target.value)}
                placeholder="Describe work completed, blockers, materials used, inspections, etc."
                error={errors.workDescription}
                rows={4}
              />

              <div>
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-secondary">
                      Site images
                    </span>
                    <p className="mt-1 text-[11px] text-secondary">
                      Upload up to 3 images (PNG/JPG).
                    </p>
                  </div>
                  <Button type="button" variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
                    Add images
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  className="hidden"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => onFilesSelected(e.target.files)}
                />

                {errors.images ? (
                  <p className="mt-2 text-xs text-red-600">{errors.images}</p>
                ) : null}

                {/* Enhanced Photo Upload UX Grid */}
                {previews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {previews.map((p, idx) => (
                      <div key={p.url} className="group relative overflow-hidden rounded-lg border border-slate-200 bg-surface-alt outline outline-2 outline-transparent transition-all hover:outline-[color:var(--ff-accent-soft)]">
                        <img src={p.url} alt={p.name} className="h-24 w-full object-cover sm:h-28" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-slate-900/60 text-white backdrop-blur-sm transition hover:bg-red-500"
                          title="Remove image"
                          aria-label={`Remove ${p.name}`}
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <Button type="button" variant="subtle" onClick={() => navigate("/projects")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
              {isSubmitting ? "Submitting…" : "Submit DPR"}
            </Button>
          </div>
        </Card>
      </form>

      {/* 3. Today's Activity Timeline & 4. Empty State */}
      <div className="pt-6">
        <TodayTimeline projectId={values.projectId} date={values.date} />
      </div>

      {/* 5. Back Navigation */}
      <div className="flex justify-start border-t border-slate-200 pt-8">
        <Link
          to="/projects"
          className="text-sm font-medium text-slate-500 transition hover:text-primary"
        >
          ← Back to all projects
        </Link>
      </div>
    </div>
  );
}

