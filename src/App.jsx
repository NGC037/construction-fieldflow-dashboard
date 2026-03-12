import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute.jsx";
import { AppShell } from "./shell/AppShell.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { ProjectsPage } from "./pages/ProjectsPage.jsx";
import { ProjectDetailPage } from "./pages/ProjectDetailPage.jsx";
import { DprFormPage } from "./pages/DprFormPage.jsx";
import { DprListPage } from "./pages/DprListPage.jsx";
import { DprDetailPage } from "./pages/DprDetailPage.jsx";
import { PageTransition } from "./ui/PageTransition.jsx";

export default function App() {
  const location = useLocation();

  return (
    <PageTransition routeKey={location.pathname}>
      <Routes location={location}>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/dpr/new" element={<DprFormPage />} />
          <Route path="/dprs" element={<DprListPage />} />
          <Route path="/dprs/:id" element={<DprDetailPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/projects" replace />} />
      </Routes>
    </PageTransition>
  );
}