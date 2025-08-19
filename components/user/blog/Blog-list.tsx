import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";

export function BlogList() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Bài viết mới nhất
        </h2>
        <span className="text-muted-foreground">
          {blogPosts.length} bài viết
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {blogPosts.map((post) => (
          <Card
            key={post.slug}
            className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-orange-50"
          >
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="aspect-[4/3] md:aspect-square overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="bg-amber-700">{post.category}</Badge>
                    {post.featured && (
                      <Badge
                        variant="default"
                        className="bg-accent text-accent-foreground"
                      >
                        Nổi bật
                      </Badge>
                    )}
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
