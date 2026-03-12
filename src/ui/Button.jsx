/* eslint-disable no-unused-vars */
import { cn } from "../utils/cn.js";

export function Button({
  as: Comp = "button",
  className,
  variant = "primary",
  size = "md",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-60";

  const variants = {
    primary:
      "btn-primary",
    secondary:
      "btn-secondary",
    subtle:
      "rounded-xl border border-transparent bg-surface-alt px-4 py-2 text-sm text-secondary hover:bg-surface",
    danger:
      "btn-primary bg-red-600 hover:bg-red-700",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-base",
  };

  return (
    <Comp
      className={cn(
        base,
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        className,
      )}
      {...props}
    />
  );
}

