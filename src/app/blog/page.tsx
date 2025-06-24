import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SingleBlogCard from './SingleBlogCard';

export const revalidate = 10;

const BlogPage = async () => {
  const req = await fetch(
    `https://dashboard.geranosgetaways.com/wp-json/wp/v2/posts?acf_format=standard&_fields=id,title,slug,date,excerpt,acf`,
    { cache: 'no-store' }
  );
  const blogs = await req.json();

  return (
    <div>
      {/* Banner Section */}
      <div
        className="bg-center min-h-[320px] md:min-h-[420px] xl:min-h-[420px] bg-slate-50"
        style={{
          backgroundImage: "url('/global/banners/blog-main-final.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="bg-[rgba(0,0,0,0.3)] flex items-center justify-center gap-4 md:gap-6 text-center flex-col min-h-[320px] md:min-h-[420px] xl:min-h-[420px] px-4 py-12">
          <h1 className="text-white text-[2.5rem] sm:text-5xl md:text-6xl xl:text-6xl font-EduVICWANTBeginner mb-[-8px] md:mb-[0px]">
            Our Blogs
          </h1>
          <p className="text-white text-xl">Read experiences and stories</p>

          <Link href="#cstmContId" id="cstmContId" className="max-w-min mx-auto">
            <Button className="max-w-min mx-auto font-normal text-xl md:text-xl bg-transparent hover:bg-transparent border-2 border-white text-white p-4 md:p-6 rounded-full">
              Read Blog ↓
            </Button>
          </Link>
        </div>
      </div>

      {/* Blog Cards Section */}
      <div id="cstmContId" className="container mx-auto px-4 py-12">
        {blogs?.length > 0 ? (
          blogs.map((blog: any) => (
            <div key={blog.id} className="mb-8">
              <SingleBlogCard
                title={blog.title?.rendered || 'Untitled'}
                date={blog.date}
                excerpt={blog.excerpt?.rendered || ''}
                slug={blog.slug}
                image={blog.acf?.mobile_featured_image ?? ''}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No blog posts found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
