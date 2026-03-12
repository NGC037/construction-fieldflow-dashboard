/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

export function PageTransition({ routeKey, children }) {
  const [key, setKey] = useState(routeKey);
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    setKey(routeKey);
    setPhase("enter");
    const t = window.setTimeout(() => setPhase("idle"), 240);
    return () => window.clearTimeout(t);
  }, [routeKey]);

  return (
    <div
      key={key}
      className={phase === "enter" ? "animate-fade-in-up" : ""}
    >
      {children}
    </div>
  );
}
