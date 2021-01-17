import { NextPage } from 'next';
import Head from 'next/head';

import Layout from '@/components/Layout';

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home &ndash; Emilio Schepis</title>
      </Head>
      <Layout>
        <section className="prose mx-auto">
          <h1>Hi, I&apos;m Emilio 👋🏻</h1>
          <p>
            I am a Software Engineer working in Monza, Italy. I am currently studying Systems and Networks Security at
            Università degli Studi di Milano.
          </p>
          <p>
            In late 2016 I published my first open source Android application, and since then I&apos;ve developed
            Android and iOS apps, cross-platform apps with React Native and Flutter, websites, Telegram bots, Alexa
            skills and serverless backends on Google Cloud Platform and Amazon Web Services.
          </p>
          <p>
            I think that learning is a never ending process, and I&apos;d like to share interesting bits and helpful
            tutorials through this platform.
          </p>
          <p>
            If you&apos;d like to keep in touch you can find me on{' '}
            <a href="https://twitter.com/emilioschepis" target="_blank" rel="noreferrer">
              Twitter
            </a>{' '}
            and on{' '}
            <a href="https://github.com/emilioschepis" target="_blank" rel="noreferrer">
              GitHub
            </a>
            .
          </p>
        </section>
      </Layout>
    </>
  );
};

export default IndexPage;
