import { useState } from "react";
import { Link } from "react-router-dom";

export function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-[color:var(--ff-accent-primary)] text-white shadow-soft">
            <span className="text-xs font-bold tracking-wide">CF</span>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900">FieldFlow</p>
            <p className="text-xs text-slate-500">Construction DPR</p>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            How It Works
          </a>
          <a
            href="#personas"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Who It's For
          </a>
        </nav>

        {/* Desktop Sign In */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="btn-secondary inline-flex h-9 items-center gap-2 rounded-xl border border-[color:var(--ff-accent-secondary)] bg-white px-4 text-sm font-semibold text-[color:var(--ff-accent-secondary)] shadow-soft transition"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-surface-alt text-slate-600 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-3">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
              onClick={() => setMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#personas"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
              onClick={() => setMenuOpen(false)}
            >
              Who It's For
            </a>
            <Link
              to="/login"
              className="btn-secondary mt-1 inline-flex h-9 w-full items-center justify-center rounded-xl text-sm font-semibold"
            >
              Sign in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
