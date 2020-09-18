import Post from 'models/Post';

const generateSitemapItem = (post: Post): string => `
  <url>
    <loc>https://emilioschepis.com/blog/${post.id}</loc>
    <lastmod>${new Date(post.date).toUTCString()}</lastmod>
    <changefreq>never</changefreq>
  </url>
`;

const generateSitemap = (posts: Post[]): string => `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://emilioschepis.com/</loc>
      <changefreq>monthly</changefreq>
    </url>
    <url>
      <loc>https://emilioschepis.com/blog</loc>
      <lastmod>${new Date(posts[0].date).toUTCString()}</lastmod>
      <changefreq>weekly</changefreq>
    </url>
    ${posts.map(generateSitemapItem).join('')}
  </urlset>
`;

export default generateSitemap;
