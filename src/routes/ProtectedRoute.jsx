import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../state/auth/AuthContext.jsx";

export function ProtectedRoute({ children }) {
  const { isAuthed, isHydrating } = useAuth();
  const location = useLocation();

  if (isHydrating) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-6 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        <div className="w-full max-w-sm rounded-2xl bg-white p-5 text-center shadow-soft ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
          <div className="mx-auto h-10 w-10 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <p className="mt-3 text-sm font-medium">Loading…</p>
        </div>
      </div>
    );
  }

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

