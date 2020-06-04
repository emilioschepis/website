import styles from './Blog.module.scss';
import Post from 'models/Post';
import PostItem from './PostItem';

type Props = {
  posts: Post[];
};

const Blog: React.FC<Props> = ({ posts }) => {
  return (
    <section className={styles.root}>
      <h1>My Blog Posts ✏️</h1>
      <section className={styles.posts}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </section>
    </section>
  );
};

export default Blog;
