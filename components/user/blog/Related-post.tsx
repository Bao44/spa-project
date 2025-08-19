import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { getRelatedPosts } from "@/lib/blog-data"

interface RelatedPostsProps {
  currentSlug: string
}

export function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentSlug, 3)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-16">
      <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Bài viết liên quan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Card key={post.slug} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-4">
              <Badge variant="secondary" className="mb-2">
                {post.category}
              </Badge>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
