import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from 'components/Layout';
import Index from 'components/Index';
import Repository from 'models/Repository';
import { getRepositories } from 'lib/repositories';

type Props = {
  repositories: Repository[];
};

const IndexPage: NextPage<Props> = ({ repositories }) => {
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
      <Layout>
        <Index repositories={repositories} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const repositories = (await getRepositories()).filter((r) => !r.fork);

  return {
    props: {
      repositories,
    },
  };
};

export default IndexPage;
