"use client";

import { motion } from "framer-motion";

export function BlogHero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          Blog <span className="text-primary">Làm đẹp</span>
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Khám phá những bí quyết làm đẹp, chăm sóc sức khỏe và xu hướng spa mới
          nhất từ các chuyên gia hàng đầu
        </motion.p>
      </div>
    </section>
  );
}
