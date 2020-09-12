import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Fugaz+One&family=Montserrat:wght@400;700&display=swap"
            rel="stylesheet"
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
