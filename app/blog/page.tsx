import { BlogList } from "@/components/user/blog/Blog-list";
import { BlogCategories } from "@/components/user/blog/Category";
import { BlogHero } from "@/components/user/blog/Hero";
import { BlogNewsletter } from "@/components/user/blog/New-letter";
import { Footer } from "@/components/user/Footer";
import { Header } from "@/components/user/Header";

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <BlogHero />
        <div className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-3">
                <BlogList />
              </div>
              <div className="lg:col-span-1">
                <BlogCategories />
                <BlogNewsletter />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
