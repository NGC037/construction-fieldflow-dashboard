import { cn } from "../utils/cn.js";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "card transition-all duration-200 ease-out",
        className,
      )}
      {...props}
    />
  );
}

