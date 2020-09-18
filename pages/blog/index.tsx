import Blog from 'components/Blog';
import Layout from 'components/Layout';
import fs from 'fs';
import { getPosts } from 'lib/posts';
import generateRss from 'lib/rss';
import generateSitemap from 'lib/sitemap';
import Post from 'models/Post';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

type Props = {
  posts: Post[];
};

const BlogPage: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Blog &ndash; Emilio Schepis</title>
        <meta
          name="description"
          content="Emilio Schepis's home page and blog. Open source projects, development blog posts and my journey as a Software Developer."
        />
        <meta
          name="keywords"
          content="Emilio Schepis, Blog, Website, Open source, Development, Software"
        />
      </Head>
      <Layout>
        <Blog posts={posts} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
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
