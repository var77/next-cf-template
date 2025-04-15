export const runtime = 'edge';

import Link from 'next/link';
import { format, toDate } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getBlogPosts } from '@/lib/api';

const formatDate = (date: string | number | undefined | null) =>
  date ? format(toDate(date), 'MMMM d, yyyy') : '-';

export default async function BlogsPage() {

  const blogs = await getBlogPosts();

  return (
    <div>
      {blogs.length === 0 && (
        <p className="text-muted-foreground italic">No blog posts created yet.</p>
      )}
      {blogs.length > 0 && (
        <div className="bg-background rounded-md border overflow-hidden">
          <Table className="text-base">
            <TableHeader>
              <TableRow className="hover:bg-background">
                <TableHead>Name</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="w-64">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map(blog => {
                const href = `/blog/${blog.slug}`;
                return (
                  <TableRow key={blog.id} className="hover:bg-background">
                    <TableCell>
                      <Link href={href} className="block">
                        <span className="font-medium">{blog.title}</span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={href} className="block">
                        <span className="font-medium">{blog.author.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <Link href={href} className="block">
                        <span>Published · {formatDate(blog.publishedAt)}</span>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
