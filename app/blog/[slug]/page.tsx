import { BlogPost } from "@/components/user/blog/Post";
import { RelatedPosts } from "@/components/user/blog/Related-post";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <main>
      <div className="pt-24 pb-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogPost slug={params.slug} />
          <RelatedPosts currentSlug={params.slug} />
        </div>
      </div>
    </main>
  );
}
