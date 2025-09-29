"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getBlogPost } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface BlogPostProps {
  slug: string;
}

export function BlogPost({ slug }: BlogPostProps) {
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-heading text-2xl font-bold text-foreground mb-4">
          Bài viết không tồn tại
        </h1>
        <Link href="/blog">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại blog
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <Link href="/blog">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại blog
            </Button>
          </motion.div>
        </Link>

        <motion.div
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Badge variant="secondary">{post.category}</Badge>
          {post.featured && (
            <Badge
              variant="default"
              className="bg-accent text-accent-foreground"
            >
              Nổi bật
            </Badge>
          )}
        </motion.div>

        <motion.h1
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {post.title}
        </motion.h1>

        <motion.div
          className="flex items-center gap-6 text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </motion.div>

        <motion.div
          className="aspect-[16/9] overflow-hidden rounded-lg mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="prose prose-lg max-w-none"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {post.excerpt}
        </div>
        <div
          className="text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/\n/g, "<br>"),
          }}
        />
      </motion.div>

      <motion.div
        className="mt-12 pt-8 border-t border-border"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <div className="flex flex-wrap gap-2">
          <span className="text-muted-foreground font-medium">Tags:</span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
      </motion.div>
    </article>
  );
}
