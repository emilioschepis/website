import { NextPage } from 'next';
import Head from 'next/head';

import Layout from '@/layouts/Layout';

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home &ndash; Emilio Schepis</title>
        <meta
          name="description"
          content="Emilio Schepis's home page and blog. Open source projects, development blog posts and my journey as a Software Developer."
        />
        <meta
          name="keywords"
          content="Emilio Schepis, Blog, Website, Open source, Development, Software"
        />
      </Head>
      <Layout />
    </>
  );
};

export default IndexPage;
