import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getBlogPost } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";

interface BlogPostProps {
  slug: string;
}

export function BlogPost({ slug }: BlogPostProps) {
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-4">
          Bài viết không tồn tại
        </h1>
        <Link href="/blog">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại blog
          </Button>
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">{post.category}</Badge>
          {post.featured && (
            <Badge
              variant="default"
              className="bg-accent text-accent-foreground"
            >
              Nổi bật
            </Badge>
          )}
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-6 text-muted-foreground mb-8">
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
        </div>

        <div className="aspect-[16/9] overflow-hidden rounded-lg mb-8">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
          {post.excerpt}
        </div>
        <div
          className="text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/\n/g, "<br>"),
          }}
        />
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <span className="text-muted-foreground font-medium">Tags:</span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
