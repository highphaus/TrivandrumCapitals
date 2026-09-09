import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrialStatusBar from "@/components/TrialStatusBar";
import ClubSection from "@/components/ClubSection";
import RecruitmentFeature from "@/components/RecruitmentFeature";
import TrialRegistrationForm from "@/components/TrialRegistrationForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col selection:bg-brand-orange selection:text-brand-cream">
      {/* Header */}
      <Header />

      {/* Main Content Flow */}
      <main className="flex-grow">
        {/* Fullscreen Hero */}
        <Hero />

        {/* Trial Status Bar */}
        <TrialStatusBar />

        {/* The Club Editorial Split Section */}
        <ClubSection />

        {/* Player Recruitment Feature */}
        <RecruitmentFeature />

        {/* Player Trial Registration Form & DB Integration */}
        <TrialRegistrationForm />
      </main>

      {/* Footer & Contact */}
      <Footer />
    </div>
  );
}
