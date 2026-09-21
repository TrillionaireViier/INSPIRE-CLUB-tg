import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { CallToAction } from "@/components/landing/CallToAction";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <FeaturesGrid />
      <CallToAction />
      
    <div className="min-h-screen bg-black text-slate-200 selection:bg-pink-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-tighter text-white">
            INSPIRE <span className="text-pink-500">CLUB</span>
          </div>
          <Link 
            href="/admin/login"
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            <LogIn size={16} /> Увійти
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-pink-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            Набір відкрито
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-tight">
            Твоє оточення для <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
              масштабного росту
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Закритий клуб для тих, хто хоче пробити фінансову стелю, отримати покрокові стратегії та знайти однодумців. Почни діяти вже сьогодні.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://t.me/insidebyinspire_bot"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-pink-600/20 flex items-center justify-center gap-2 text-lg"
            >
              Долучитися до клубу <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-950 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Що ви отримаєте?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Тільки практичні знання та інструменти, які приносять реальний результат.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-pink-500/30 transition-colors">
              <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-500 mb-6">
                <Video size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Щотижневі розбори</h3>
              <p className="text-slate-400">Прямі ефіри з розбором ваших ситуацій, помилок та побудовою стратегії на тиждень.</p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-yellow-500/30 transition-colors">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Сильне ком'юніті</h3>
              <p className="text-slate-400">Закритий чат учасників, де ви знайдете партнерів, клієнтів та підтримку однодумців.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">База знань</h3>
              <p className="text-slate-400">Доступ до бібліотеки матеріалів, записів майстер-класів та корисних гайдів.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[80px] pointer-events-none" />
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
            Готові вийти на новий рівень?
          </h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10">
            Кількість місць обмежена. Приєднуйтесь сьогодні, щоб не пропустити наступний закритий розбір.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <a 
              href="https://t.me/insidebyinspire_bot"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-white text-black hover:bg-slate-200 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-lg"
            >
              Оплатити підписку <ArrowRight size={20} />
            </a>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500 relative z-10">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-500" /> Миттєвий доступ</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-500" /> Скасування будь-коли</span>
          </div>
        </div>
      </section>

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

    </div>
  );
}
