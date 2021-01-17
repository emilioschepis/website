import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="preload" href="/fonts/karla.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS feed for blog posts"
            href="https://emilioschepis.com/rss.xml"
          />
          <meta
            name="description"
            content="Emilio Schepis's home page and blog. Open source projects, development blog posts and my journey as a Software Developer."
          />
          <meta name="keywords" content="Emilio Schepis, Blog, Website, Open source, Development, Software" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
