import "../styles/globals.css";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement } from "react";

import GlobalLayout from "../components/layouts/GlobalLayout";

dayjs.extend(LocalizedFormat);

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}

export default MyApp;
