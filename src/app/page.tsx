import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { CallToAction } from "@/components/landing/CallToAction";
import { CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <FeaturesGrid />
      <CallToAction />
      
      {/* Telegram Bot Section */}
      <section className="py-20 px-6 bg-slate-950 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2AABEE] to-[#229ED9] mb-8 shadow-lg shadow-[#2AABEE]/20">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Наш Telegram Бот
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Зв&apos;яжіться з нами через Telegram-бот для швидкого доступу до клубу, оплати та підтримки.
          </p>
          
          <a
            href="https://t.me/insidebyinspire_bot"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2AABEE] to-[#229ED9] hover:from-[#229ED9] hover:to-[#1E8DC8] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#2AABEE]/20 hover:shadow-[#2AABEE]/40 text-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            @insidebyinspire_bot
          </a>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#2AABEE]" /> Швидкі відповіді</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#2AABEE]" /> 24/7 підтримка</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#2AABEE]" /> Безпечна оплата</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} INSPIRE CLUB. Всі права захищені.
        </div>
      </footer>
    </main>
  );
}
