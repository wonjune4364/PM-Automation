"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <div className="relative mb-16">
      <div className="bg-gradient-to-r from-green-500/40 to-purple-500/40 py-12">
        <div className="space-y-6 max-w-4xl mx-auto container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-[1.2]"
          >
            Enjoy
            <br />
            Project Management
            <br />
            using AI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.4 }}
            className="md:text-lg text-black/60 max-w-xl"
          >
            PT Bank Jtrust Indonesia provide PM tools to use AI more effectively.
            <br />
            Experience a variety of tools that increase development productivity, from product planning to design.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
