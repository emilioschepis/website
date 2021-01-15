import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/inter-v2-latin-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS feed for blog posts"
            href="https://emilioschepis.com/rss.xml"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
