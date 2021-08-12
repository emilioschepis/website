import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import PostPreview from "../../components/PostPreview";
import client from "../../lib/graphql/client";
import { PageQuery, PostsQuery } from "../../lib/graphql/generated";

export type BlogProps = {
  page: NonNullable<PageQuery["page"]>;
  posts: NonNullable<PostsQuery["posts"]>;
};

const Blog: NextPage<BlogProps> = ({ page, posts }) => {
  return (
    <div className="max-w-5xl lg:mx-auto">
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description ?? undefined} />
        <meta name="keywords" content={page.keywords.join(", ")} />
      </Head>
      <div className="m-4">
        <h1 className="text-4xl font-bold mb-4">Blog posts</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {posts.map((post) => (
            <PostPreview key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { page } = await client.Page({ slug: "blog" });
  const { posts } = await client.Posts();

  return {
    props: {
      page,
      posts,
    },
    revalidate: 3600,
  };
};

export default Blog;
