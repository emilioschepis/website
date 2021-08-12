import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";

import client from "../lib/graphql/client";
import { Biography } from "../lib/graphql/generated";
import imageLoader from "../lib/utils/imageLoader";

export type HomeProps = {
  biography: Biography;
};

const Home: NextPage<HomeProps> = ({ biography }) => {
  return (
    <div className="max-w-5xl lg:mx-auto">
      <div className="flex flex-col space-y-4 m-4 lg:flex-row-reverse lg:justify-between lg:items-center">
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
        <div className="flex-1 prose prose-blue" dangerouslySetInnerHTML={{ __html: biography.description.html }} />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { biography } = await client.Biography();

  return {
    props: {
      biography,
    },
  };
};

export default Home;
