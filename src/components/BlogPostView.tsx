import { BlogPost } from "@/lib/api";
import Image from "next/image";

const BlogPostView = ({ blogPost }: { blogPost: BlogPost }) => {
  // Format dates for display
  const formatDate = (dateString: string | number) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{blogPost.title}</h1>

      {blogPost.authors.map(author => (
        <div key={author.name} className="flex items-center mb-6">
          {author.image && (
            <div className="mr-3">
              <Image
                src={author.image}
                alt={author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          )}
          <div>
            <div className="font-medium">{author.name}</div>
            <div className="text-sm text-gray-500">
              {blogPost.publishedAt ? (
                <>Published on {formatDate(blogPost.publishedAt)}</>
              ) : (
                <>Last updated on {formatDate(blogPost.updatedAt)}</>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blogPost.html }} />
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p>Created: {formatDate(blogPost.createdAt)}</p>
        {blogPost.createdAt !== blogPost.updatedAt && (
          <p>Updated: {formatDate(blogPost.updatedAt)}</p>
        )}
      </div>
    </article>
  );
};

export default BlogPostView;
