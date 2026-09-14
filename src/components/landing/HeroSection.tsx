"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-black text-white py-24 sm:py-32 flex items-center justify-center min-h-[90vh]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-600/30 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[100px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-zinc-300">
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            <span>The premier club for top creators</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400"
        >
          Elevate Your Growth. <br className="hidden md:block" />
          Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400">INSPIRE CLUB</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-6 text-lg md:text-xl leading-8 text-zinc-400 max-w-2xl mx-auto"
        >
          Unlock exclusive masterclasses, live Q&A sessions, personalized case studies, and partner perks designed to scale your brand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="https://t.me/Aviva_Agency_WebsiteLeadsbot"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-fuchsia-600 border border-transparent rounded-full hover:bg-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-600 focus:ring-offset-black w-full sm:w-auto overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Join the Club <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-zinc-300 transition-all duration-200 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20 focus:ring-offset-black backdrop-blur-sm w-full sm:w-auto"
          >
            Member Login
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
