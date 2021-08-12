import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import client from "../lib/graphql/client";
import { BiographyQuery, PageQuery } from "../lib/graphql/generated";
import imageLoader from "../lib/utils/imageLoader";

export type HomeProps = {
  page: NonNullable<PageQuery["page"]>;
  biography: NonNullable<BiographyQuery["biography"]>;
};

const Home: NextPage<HomeProps> = ({ page, biography }) => {
  return (
    <div className="max-w-5xl lg:mx-auto">
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description ?? undefined} />
        <meta name="keywords" content={page.keywords.join(", ")} />
      </Head>
      <div className="flex flex-col space-y-4 m-4 lg:flex-row-reverse lg:space-y-0 lg:justify-between lg:items-center">
        <div className="flex-none w-full lg:w-1/3">
          <Image
            loader={imageLoader}
            src={biography.image.url}
            alt={biography.image.alt ?? undefined}
            width={biography.image.width ?? undefined}
            height={biography.image.height ?? undefined}
            className="rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">About me</h1>
          <div className="prose prose-blue" dangerouslySetInnerHTML={{ __html: biography.description.html }} />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { page } = await client.Home();
  const { biography } = await client.Biography();

  return {
    props: {
      page,
      biography,
    },
    revalidate: 3600,
  };
};

export default Home;
