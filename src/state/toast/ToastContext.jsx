import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

function randomId() {
  return Math.random().toString(16).slice(2);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    ({ title, message, variant = "success", durationMs = 2600 }) => {
      const id = randomId();
      const toast = { id, title, message, variant };
      setToasts((prev) => [...prev, toast]);
      window.setTimeout(() => removeToast(id), durationMs);
      return id;
    },
    [removeToast],
  );

  const value = useMemo(() => ({ toasts, pushToast, removeToast }), [toasts, pushToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function ToastViewport() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="pointer-events-auto w-full max-w-md space-y-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </div>
  );
}

function ToastItem({ toast, onClose }) {
  const ring =
    toast.variant === "success"
      ? "border-green-200 shadow-soft"
      : toast.variant === "error"
        ? "border-red-200 shadow-soft"
        : "border-slate-200 shadow-soft";

  const dot =
    toast.variant === "success"
      ? "bg-green-500"
      : toast.variant === "error"
        ? "bg-red-500"
        : "bg-slate-500";

  return (
    <div className={`animate-fade-in-up card bg-surface p-4 ${ring}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${dot}`} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="truncate text-sm font-semibold text-primary">
              {toast.title}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-200 bg-surface-alt px-2 py-1 text-xs font-medium text-secondary shadow-sm transition hover:bg-surface"
              aria-label="Dismiss toast"
            >
              <span aria-hidden>×</span>
            </button>
          </div>
          {toast.message ? (
            <p className="mt-2 text-xs text-secondary">{toast.message}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

