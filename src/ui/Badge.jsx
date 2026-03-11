import { cn } from "../utils/cn.js";

export function Badge({ className, tone = "slate", ...props }) {
  const tones = {
    emerald: "bg-[color:var(--ff-accent-soft)] text-[color:var(--ff-text-primary)]",
    amber: "bg-yellow-100 text-yellow-800",
    rose: "bg-rose-100 text-rose-800",
    slate: "bg-surface-alt text-secondary",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium",
        tones[tone] ?? tones.slate,
        className,
      )}
      {...props}
    />
  );
}

