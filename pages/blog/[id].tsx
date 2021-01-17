import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';

import Code from '@/components/Code';
import Layout from '@/components/Layout';
import { getPostContentById, getPosts } from '@/lib/posts';
import PostContent from '@/models/PostContent';

type BlogPostPageProps = {
  post: PostContent;
};

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title} &ndash; Blog &ndash; Emilio Schepis</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.tags.join(', ')} />
      </Head>
      <Layout>
        <article className="prose mx-auto">
          <h1>{post.title}</h1>
          <ReactMarkdown source={post.content} renderers={{ code: Code }} />
        </article>
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

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
}) => {
  const id = params.id as string;
  const post = getPostContentById(id);

  return {
    props: {
      post,
    },
  };
};

export default BlogPostPage;
