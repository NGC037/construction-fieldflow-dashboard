import { cn } from "../utils/cn.js";

export function Input({ className, label, hint, error, ...props }) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-secondary">
          {label}
        </span>
      ) : null}
      <input
        className={cn(
          "input-field",
          error ? "border-red-400 focus:ring-red-300" : "",
          className,
        )}
        {...props}
      />
      {error ? (
        <span className="mt-1.5 block text-xs text-red-600">
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs text-secondary">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

