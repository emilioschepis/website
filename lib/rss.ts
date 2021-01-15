import Post from '@/models/Post';

const generateRssItem = (post: Post): string => `
  <item>
    <guid>https://emilioschepis.com/blog/${post.id}</guid>
    <title>${post.title}</title>
    <link>https://emilioschepis.com/blog/${post.id}</link>
    <description>${post.description}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  </item>
`;

const generateRss = (posts: Post[]): string => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Blog - Emilio Schepis</title>
      <link>https://emilioschepis.com/blog</link>
      <description>Emilio Schepis's home page and blog. Open source projects, development blog posts and my journey as a Software Developer.</description>
      <language>en</language>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="https://emilioschepis.com/rss.xml" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`;

export default generateRss;
