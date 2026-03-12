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
          "inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium text-secondary transition-all duration-200 ease-out hover:bg-surface-alt hover:text-primary",
          isActive ? "bg-surface-alt text-primary" : "",
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
    return (
      (parts[0]?.[0] || "U").toUpperCase() +
      (parts[1]?.[0] ? parts[1][0].toUpperCase() : "")
    );
  }, [user]);

  function onLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-app text-primary">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-8">
          <Link to="/projects" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[color:var(--ff-accent-primary)] text-white shadow-soft">
              <span className="text-xs font-bold tracking-wide">CF</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-900">FieldFlow</p>
              <p className="text-xs text-slate-500">Construction DPR</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden text-sm text-secondary sm:block">
              Company Name
            </div>
            <button
              type="button"
              onClick={() =>
                setThemeState((t) => (t === "dark" ? "light" : "dark"))
              }
              className="rounded-full border border-slate-200 bg-surface-alt p-2 text-slate-500 shadow-sm transition-all duration-200 ease-out hover:bg-surface hover:text-slate-700"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
            <div className="flex items-center gap-2">
              <div className="hidden text-right text-xs sm:block">
                <p className="font-semibold text-primary">
                  {user?.name ?? "User"}
                </p>
                <p className="text-secondary">{user?.email}</p>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="grid h-9 w-9 place-items-center rounded-full bg-surface-alt text-sm font-semibold text-primary shadow-sm"
                aria-label="Logout"
              >
                {initials}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="bg-app">
        <div className="mx-auto max-w-[1200px] px-6 py-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-secondary">
              <span className="font-semibold uppercase tracking-wide">
                FieldFlow Console
              </span>
              <span className="ml-2 text-secondary">
                Navigate projects, issue DPRs, and monitor field activity.
              </span>
            </div>
            <nav className="flex flex-wrap items-center gap-1.5 text-sm">
              <NavItem to="/projects" label="Projects" />
              <NavItem to="/dpr/new" label="Create DPR" />
              <NavItem to="/dprs" label="DPR history" />
            </nav>
          </div>

          <div className="space-y-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
