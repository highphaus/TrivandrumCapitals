import Header from "@/components/Header";
import TrialRegistrationForm from "@/components/TrialRegistrationForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Register | BLK Buddies League – Trivandrum Capitals",
  description: "Register your school for the BLK Buddies League – Trivandrum. Submit team details for U10 Boys, U10 Girls, U12 Boys, and U12 Girls categories.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <TrialRegistrationForm />
      </main>
      <Footer />
    </div>
  );
}
