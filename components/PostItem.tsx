import Link from 'next/link';
import styles from './PostItem.module.scss';
import Post from 'models/Post';

type Props = {
  post: Post;
};

const PostItem: React.FC<Props> = ({ post }) => {
  const date = new Date(post.date);

  return (
    <article className={styles.root}>
      <Link href="/blog/[id]" as={`/blog/${post.id}`}>
        <h2>{post.title}</h2>
      </Link>
      <p className={styles.meta}>
        {post.tags.join(', ')} &mdash; {date.toLocaleDateString()}
      </p>
      <p className={styles.description}>{post.description}</p>
      <Link passHref href="/blog/[id]" as={`/blog/${post.id}`}>
        <a>Read more</a>
      </Link>
    </article>
  );
};

export default PostItem;
