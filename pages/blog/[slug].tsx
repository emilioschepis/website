import dayjs from "dayjs";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import PostLink, { PostLinkProps } from "../../components/PostLink";
import client from "../../lib/graphql/client";
import { PageQuery, PostQuery } from "../../lib/graphql/generated";

// eslint-disable-next-line react/display-name
const components = { a: (props: PostLinkProps) => <PostLink {...props} /> };

export type BlogPostProps = {
  page: NonNullable<PageQuery["page"]>;
  post: NonNullable<PostQuery["post"]>;
  source: MDXRemoteSerializeResult;
};

const BlogPost: NextPage<BlogPostProps> = ({ page, post, source }) => {
  return (
    <div className="max-w-5xl lg:mx-auto">
      <Head>
        <title>
          {post.title} &mdash; {page.title}
        </title>
        <meta name="description" content={post.title ?? page.description ?? undefined} />
        <meta name="keywords" content={post.keywords.concat(page.keywords).join(", ")} />
      </Head>
      <div className="m-4">
        {post.cover ? (
          <div className="flex justify-center items-center mb-4 rounded-lg overflow-hidden border-2">
            <Image
              src={post.cover.url}
              alt={post.cover.alt ?? undefined}
              width={post.cover.width ?? undefined}
              height={post.cover.height ?? undefined}
            />
          </div>
        ) : null}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-700 italic uppercase mb-2">{dayjs(post.writtenAt).format("LL")}</p>
        <div className="prose prose-blue max-w-none">
          <MDXRemote {...source} components={components} />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;

  const { page } = await client.Page({ slug: "blog" });
  const { post } = await client.Post({ slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  const source = await serialize(post.content);

  return {
    props: {
      page,
      post,
      source,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await client.PostSlugs();

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: "blocking",
  };
};

export default BlogPost;
