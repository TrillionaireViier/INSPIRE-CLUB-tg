"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <div className="bg-black py-24 sm:py-32 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-[100px]" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to scale your impact?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            Join the community of driven creators. Connect via our exclusive Telegram bot to get instant access to masterclasses, resources, and more.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="https://t.me/Aviva_Agency_WebsiteLeadsbot"
              className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-black shadow-sm hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 text-fuchsia-600" />
              Connect via Telegram
            </Link>
            <Link
              href="/admin"
              className="group flex items-center justify-center gap-2 text-base font-semibold leading-6 text-white hover:text-fuchsia-400 transition-colors"
            >
              Log in to Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
