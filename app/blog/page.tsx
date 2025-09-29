"use client";

import { BlogList } from "@/components/user/blog/Blog-list";
import { BlogCategories } from "@/components/user/blog/Category";
import { BlogHero } from "@/components/user/blog/Hero";
import { BlogNewsletter } from "@/components/user/blog/New-letter";
import { Footer } from "@/components/user/Footer";
import { Header } from "@/components/user/Header";
import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <BlogHero />
        <motion.div
          className="py-20 bg-background"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <BlogList />
              </motion.div>
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <BlogCategories />
                <BlogNewsletter />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <Footer />
      </motion.div>
    </>
  );
}
