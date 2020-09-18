import Layout from 'components/Layout';
import PostDetail from 'components/PostDetail';
import { getPostContentById, getPosts } from 'lib/posts';
import PostContent from 'models/PostContent';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

type Props = {
  post: PostContent;
};

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title} &ndash; Blog &ndash; Emilio Schepis</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.tags.join(', ')} />
      </Head>
      <Layout>
        <PostDetail post={post} />
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPosts().map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params.id as string;
  const post = getPostContentById(id);

  return {
    props: {
      post,
    },
  };
};

export default PostPage;
