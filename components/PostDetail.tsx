import ReactMarkdown from 'react-markdown';
import styles from './PostDetail.module.scss';
import PostContent from 'models/PostContent';
import Code from './Code';

type Props = {
  post: PostContent;
};

const PostDetail: React.FC<Props> = ({ post }) => {
  return (
    <main className={styles.root}>
      <h1>{post.title}</h1>
      <article>
        <ReactMarkdown source={post.content} renderers={{ code: Code }} />
      </article>
    </main>
  );
};

export default PostDetail;
