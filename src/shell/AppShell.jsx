import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/Button.jsx";
import { cn } from "../utils/cn.js";
import { useAuth } from "../state/auth/AuthContext.jsx";
import { getInitialTheme, setTheme } from "./theme.js";

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition",
          "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50",
          isActive ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50" : "",
        )
      }
      end
    >
      <span>{label}</span>
    </NavLink>
  );
}

export function AppShell() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [theme, setThemeState] = useState(() => getInitialTheme());

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const initials = useMemo(() => {
    const name = user?.name || user?.email || "U";
    const parts = name.trim().split(/\s+/);
    return (parts[0]?.[0] || "U").toUpperCase() + (parts[1]?.[0] ? parts[1][0].toUpperCase() : "");
  }, [user]);

  function onLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-app text-primary">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 md:grid-cols-[260px,minmax(0,1fr)] md:gap-8 lg:px-8">
        <aside className="card flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between gap-3">
            <Link to="/projects" className="group flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-[color:var(--ff-accent-primary)] text-white shadow-soft group-hover:scale-105 group-active:scale-95 transition">
                <span className="text-xs font-bold tracking-wide">CF</span>
              </div>
              <div className="leading-tight">
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                  FieldFlow
                </p>
                <p className="text-sm font-semibold text-primary">Construction DPR</p>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setThemeState((t) => (t === "dark" ? "light" : "dark"))}
              className="rounded-lg border border-slate-200 bg-surface-alt px-3 py-1 text-xs font-medium text-secondary shadow-sm transition hover:bg-surface"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? "Dark" : "Light"}
            </button>
          </div>

          <div className="rounded-lg bg-surface-alt p-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-surface text-primary shadow-sm">
                <span className="text-sm font-semibold">{initials}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-primary">
                  {user?.name ?? "User"}
                </p>
                <p className="truncate text-xs text-secondary">{user?.email}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="secondary" size="sm" className="w-full" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>

          <nav className="space-y-1">
            <NavItem to="/projects" label="Projects" />
            <NavItem to="/dpr/new" label="Create DPR" />
          </nav>

          <div className="mt-auto rounded-lg bg-surface-alt p-3 text-xs text-secondary">
            <p className="font-semibold text-primary">Daily Progress Reporting</p>
            <p className="mt-1">
              Capture work, workforce, and weather across all active projects.
            </p>
          </div>
        </aside>

        <main className="min-w-0 space-y-4">
          <div className="flex flex-col justify-between gap-3 rounded-xl bg-surface-alt px-4 py-3 text-sm text-secondary sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                FieldFlow Console
              </p>
              <p className="mt-1 text-sm">
                Navigate projects, issue DPRs, and monitor field activity.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-[color:var(--ff-accent-soft)] px-3 py-1 font-medium text-[color:var(--ff-text-primary)]">
                Shift · {new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
              </span>
              <span className="rounded-full border border-slate-200 px-3 py-1 text-secondary">
                © {new Date().getFullYear()} Field Ops
              </span>
            </div>
          </div>

          <div className="card p-4 sm:p-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

