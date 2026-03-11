import { useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Card } from "../ui/Card.jsx";
import { Input } from "../ui/Input.jsx";
import { Button } from "../ui/Button.jsx";
import { useAuth } from "../state/auth/AuthContext.jsx";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthed, login } = useAuth();

  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = useMemo(() => location.state?.from ?? "/projects", [location.state]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const res = login({ email: email.trim(), password });
      if (!res.ok) {
        setError(res.message ?? "Login failed.");
        return;
      }
      navigate(from, { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isAuthed) return <Navigate to="/projects" replace />;

  return (
    <div className="min-h-screen bg-app text-primary">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                Access
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-primary">
                Sign in to FieldFlow
              </h1>
              <p className="mt-1 text-sm text-secondary">
                Authenticate to enter the construction command console.
              </p>
            </div>
            <div className="card grid h-12 w-24 place-items-center text-[11px] font-semibold uppercase tracking-wide text-secondary">
              <span>CF · DPR</span>
            </div>
          </div>

          <Card className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-4 p-5">
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@site.control"
              />
              <Input
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
              />

              {error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  {error}
                </div>
              ) : null}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Authorizing…" : "Sign in"}
              </Button>
            </form>

            <div className="card relative flex flex-col justify-between gap-3 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                Mock credentials
              </p>
              <div className="space-y-2 text-xs text-secondary">
                <p>
                  Email <span className="ml-2 font-mono text-primary">test@test.com</span>
                </p>
                <p>
                  Password <span className="ml-2 font-mono text-primary">123456</span>
                </p>
              </div>
              <p className="mt-2 text-[11px] text-secondary">
                Demo-only authentication. Replace with your real identity provider for production.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

