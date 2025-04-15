export const runtime = 'edge';

import { redirect } from 'next/navigation';
import BlogPostView from '@/components/BlogPostView';
import { getBlogPost } from '@/lib/api';


const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ blogSlug: string }>
}) => {
  const { blogSlug } = await params;

  const blogPost = await getBlogPost(blogSlug);

  if (!blogPost) {
    redirect('/blog');
  }

  return (
    <>
      <BlogPostView blogPost={blogPost} />
    </>
  );
};

export default BlogPostPage;
