import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrialStatusBar from "@/components/TrialStatusBar";
import ClubSection from "@/components/ClubSection";
import RecruitmentFeature from "@/components/RecruitmentFeature";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col selection:bg-brand-orange selection:text-brand-cream">
      <Header />
      <main className="flex-grow">
        <Hero />
        <TrialStatusBar />
        <ClubSection />
        <RecruitmentFeature />
      </main>
      <Footer />
    </div>
  );
}
