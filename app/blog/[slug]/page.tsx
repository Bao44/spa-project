import { BlogPost } from "@/components/user/blog/Post";
import { RelatedPosts } from "@/components/user/blog/Related-post";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>; 
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  return (
    <main>
      <div className="pt-24 pb-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogPost slug={slug} />
          <RelatedPosts currentSlug={slug} />
        </div>
      </div>
    </main>
  );
}
