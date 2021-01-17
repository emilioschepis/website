import fs from 'fs';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import BlogRow from '@/components/BlogRow';
import Layout from '@/components/Layout';
import { getPosts } from '@/lib/posts';
import generateRss from '@/lib/rss';
import generateSitemap from '@/lib/sitemap';
import Post from '@/models/Post';

type BlogPageProps = {
  posts: Post[];
};

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Blog &ndash; Emilio Schepis</title>
      </Head>
      <Layout>
        <section className="max-w-prose mx-auto">
          <div className="prose mb-8">
            <h1>My blog posts ✏</h1>
          </div>
          <div className="flex flex-col space-y-8">
            {posts.map((post) => (
              <BlogRow key={post.id} post={post} />
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const posts = getPosts().sort((a, b) => b.date.localeCompare(a.date));
  const rss = generateRss(posts);
  const sitemap = generateSitemap(posts);

  fs.writeFileSync('./public/rss.xml', rss);
  fs.writeFileSync('./public/sitemap.xml', sitemap);

  return {
    props: {
      posts,
    },
  };
};

export default BlogPage;
