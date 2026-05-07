//* @type Page
//* @context Landing
//* @utility Vista raiz publica. Compone todas las secciones de venta de SwitchPay.

import LandingNav from "@/application/landing/components/LandingNav";
import HeroSection from "@/application/landing/components/HeroSection";
import ProblemSection from "@/application/landing/components/ProblemSection";
import SolutionSection from "@/application/landing/components/SolutionSection";
import HowItWorksSection from "@/application/landing/components/HowItWorksSection";
import FeaturesSection from "@/application/landing/components/FeaturesSection";
import ForEmployeesSection from "@/application/landing/components/ForEmployeesSection";
import ForCompaniesSection from "@/application/landing/components/ForCompaniesSection";
import CategoriesSection from "@/application/landing/components/CategoriesSection";
import CtaSection from "@/application/landing/components/CtaSection";
import FaqSection from "@/application/landing/components/FaqSection";
import LandingFooter from "@/application/landing/components/LandingFooter";

export default function LandingPage() {
   return (
      <main className="relative min-h-screen overflow-x-hidden bg-canvas text-text-hi">
         <LandingNav />

         {/* @region landing/hero */}
         <HeroSection />

         {/* @region landing/problem */}
         <ProblemSection />

         {/* @region landing/solution */}
         <SolutionSection />

         {/* @region landing/how */}
         <HowItWorksSection />

         {/* @region landing/features */}
         <FeaturesSection />

         {/* @region landing/employees */}
         <ForEmployeesSection />

         {/* @region landing/companies */}
         <ForCompaniesSection />

         {/* @region landing/categories */}
         <CategoriesSection />

         {/* @region landing/cta */}
         <CtaSection />

         {/* @region landing/faq */}
         <FaqSection />

         {/* @region landing/footer */}
         <LandingFooter />
      </main>
   );
}
