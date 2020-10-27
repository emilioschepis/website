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
      <Link href={`/blog/${encodeURIComponent(post.id)}`}>
        <a className={styles.title}>{post.title}</a>
      </Link>
      <p className={styles.meta}>
        {post.tags.join(', ')} &mdash; {date.toLocaleDateString()}
      </p>
      <p className={styles.description}>{post.description}</p>
      <Link passHref href={`/blog/${encodeURIComponent(post.id)}`}>
        <a>Read more</a>
      </Link>
    </article>
  );
};

export default PostItem;
