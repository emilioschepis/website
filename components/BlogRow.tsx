import Link from 'next/link';
import { useMemo } from 'react';

import Post from '@/models/Post';

type BlogRowProps = {
  post: Post;
};

const BlogRow: React.FC<BlogRowProps> = ({ post }) => {
  const date = useMemo(() => new Date(post.date).toLocaleDateString(), [
    post.date,
  ]);

  return (
    <Link href={`/blog/${encodeURIComponent(post.id)}`}>
      <a className="space-y-1">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="text-gray-500">
          {post.tags.join(', ')} &mdash; {date}
        </p>
        <p className="text-gray-800">{post.description}</p>
      </a>
    </Link>
  );
};

export default BlogRow;
