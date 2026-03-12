import { LandingNavbar } from "../components/landing/LandingNavbar.jsx";
import { HeroSection } from "../components/landing/HeroSection.jsx";
import { FeaturesSection } from "../components/landing/FeaturesSection.jsx";
import { UIPreviewSection } from "../components/landing/UIPreviewSection.jsx";
import { WorkflowSection } from "../components/landing/WorkflowSection.jsx";
import { PersonasSection } from "../components/landing/PersonasSection.jsx";
import { CTASection } from "../components/landing/CTASection.jsx";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-app text-primary">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <UIPreviewSection />
      <WorkflowSection />
      <PersonasSection />
      <CTASection />
    </div>
  );
}
