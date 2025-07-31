import React from 'react';
import Link from 'next/link';

interface Blog {
  id: number;
  title: { rendered: string };
  slug: string;
  excerpt: { rendered: string };
  acf?: {
    mobile_featured_image?: string;
  };
}

async function fetchLatestBlogs(): Promise<Blog[]> {
  const res = await fetch(
    `https://dashboard.geranosgetaways.com/wp-json/wp/v2/posts?acf_format=standard&_fields=id,title,slug,excerpt,acf&per_page=3&orderby=date&order=desc`,
    { cache: 'no-store' }
  );
  return res.json();
}

export default async function LatestBlogs() {
  const blogs = await fetchLatestBlogs();

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs</h2>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="flex-1 max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.acf?.mobile_featured_image || '/global/default.jpg'}
                  alt={blog.title.rendered}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3
                  className="text-xl font-semibold mb-2"
                  dangerouslySetInnerHTML={{ __html: blog.title.rendered }}
                />
                <div
                  className="text-gray-600 text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
