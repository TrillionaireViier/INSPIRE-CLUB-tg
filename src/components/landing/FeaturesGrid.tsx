"use client";

import { motion } from "framer-motion";
import { Video, FileText, Search, Tag } from "lucide-react";

const features = [
  {
    name: "Живі майстер-класи",
    description:
      "Долучайтесь до інтерактивних відеосесій з експертами галузі. Вивчайте передові стратегії та ставте запитання в реальному часі.",
    icon: Video,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
  },
  {
    name: "Ексклюзивні ресурси",
    description:
      "Отримайте доступ до бібліотеки PDF-посібників, шаблонів та фреймворків, створених для прискорення вашого зростання.",
    icon: FileText,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/20",
  },
  {
    name: "Персоналізовані розбори",
    description:
      "Надішліть свій профіль Instagram або бізнес для персоналізованого розбору. Навчайтеся на реальних прикладах.",
    icon: Search,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  {
    name: "Бонуси від партнерів",
    description:
      "Отримайте ексклюзивні знижки та пропозиції від нашого списку перевірених партнерів (сервіси та програмне забезпечення).",
    icon: Tag,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
];

export function FeaturesGrid() {
  return (
    <div className="bg-black py-24 sm:py-32 relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-fuchsia-400">Все, що вам потрібно</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Все, що потрібно для успіху
          </p>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            INSPIRE CLUB — це більше, ніж просто спільнота. Це повноцінна екосистема, створена для того, щоб надати вам перевагу у вашій ніші.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col gap-6 rounded-2xl border ${feature.border} bg-white/5 p-8 backdrop-blur-sm transition-colors hover:bg-white/10`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold leading-7 text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
