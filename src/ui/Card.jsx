import { cn } from "../utils/cn.js";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "card",
        className,
      )}
      {...props}
    />
  );
}

