import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { PROJECTS } from "../constants/projects.js";
import { WEATHER_OPTIONS } from "../constants/dpr.js";
import { Card } from "../ui/Card.jsx";
import { Input } from "../ui/Input.jsx";
import { Select } from "../ui/Select.jsx";
import { Textarea } from "../ui/Textarea.jsx";
import { Button } from "../ui/Button.jsx";
import { useToast } from "../state/toast/ToastContext.jsx";

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
  const [searchParams] = useSearchParams();
  const preselectedProjectId = searchParams.get("projectId") || "";

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
      await new Promise((r) => setTimeout(r, 450));
      pushToast({
        title: "DPR created",
        message: "Your daily progress report was saved successfully.",
        variant: "success",
      });
      navigate("/projects", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-secondary">
            Create DPR
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Log progress with weather, workforce, and photos. All fields are required.
          </p>
        </div>
        <div className="flex gap-2">
          <Button as={Link} to="/projects" variant="secondary">
            Cancel
          </Button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

          <div className="mt-4">
            <Textarea
              label="Work description"
              value={values.workDescription}
              onChange={(e) => update("workDescription", e.target.value)}
              placeholder="Describe work completed, blockers, materials used, inspections, etc."
              error={errors.workDescription}
            />
          </div>

          <div className="mt-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary">
                  Site images
                </p>
                <p className="mt-1 text-[11px] text-secondary">
                  Upload up to 3 images. PNG/JPG recommended.
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

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {previews.map((p, idx) => (
                <div key={p.url} className="group relative overflow-hidden rounded-lg border border-slate-200 bg-surface-alt">
                  <img src={p.url} alt={p.name} className="h-28 w-full object-cover transition group-hover:scale-[1.02] sm:h-32" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute right-2 top-2 rounded-md bg-surface px-2 py-1 text-[11px] font-medium text-secondary shadow-sm transition group-hover:bg-surface-alt"
                    aria-label={`Remove ${p.name}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            Validation rules
          </p>
          <ul className="mt-3 space-y-2 text-xs text-secondary">
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--ff-accent-soft)]" />
              All fields are required.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--ff-accent-soft)]" />
              Worker count must be greater than 0.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--ff-accent-soft)]" />
              Maximum 3 images.
            </li>
          </ul>

          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting…" : "Submit DPR"}
          </Button>
          <Button type="button" variant="secondary" className="mt-2 w-full" onClick={() => navigate("/projects")}>
            Back to projects
          </Button>
        </Card>
      </form>
    </div>
  );
}

