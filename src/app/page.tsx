import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { CallToAction } from "@/components/landing/CallToAction";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <FeaturesGrid />
      <CallToAction />
      
      {/* Footer */}
      <footer className="bg-black py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} INSPIRE CLUB. Всі права захищені.
        </div>
      </footer>
    </main>
  );
}
