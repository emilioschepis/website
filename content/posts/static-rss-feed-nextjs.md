---
title: Adding a statically-generated RSS feed to a Next.js 9.3+ Blog
description: Learn how to expose the required files to make your blog RSS-compatible while mantaining full static generation on Next.js 9.3+.
tags: RSS, feed, NextJS, Blog, static generation, javascript
date: "2020-09-12T00:00:00.000Z"
---
## Introduction

Today I updated my website to support RSS reader apps and services.

My goals were to:
* Completely support RSS readers as defined by the [W3C Feed Validation Service](https://validator.w3.org/feed/)
* Keep full static generation working
* Make this a fully automatic step without modifying the build and / or bundle configurations

## Generating the necessary XML

*Note: I already have a method that parses Markdown files to extract metadata about my blog posts. [Source](https://github.com/emilioschepis/website/blob/main/lib/posts.ts)*

To implement this feature I created two functions: `generateRssItem` and `generateRss`.

The first function generates the necessary XML to describe a single blog post according to the [specification](https://validator.w3.org/feed/docs/rss2.html#hrelementsOfLtitemgt):

```typescript
const generateRssItem = (post: Post): string => `
  <item>
    <guid>https://emilioschepis.com/blog/${post.id}</guid>
    <title>${post.title}</title>
    <link>https://emilioschepis.com/blog/${post.id}</link>
    <description>${post.description}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  </item>
`;
```

The second function generates the necessary XML to describe the whole "channel":

```typescript
const generateRss = (posts: Post[]): string => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Blog - Emilio Schepis</title>
      <link>https://emilioschepis.com/blog</link>
      <description>[...]</description>
      <language>en</language>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="https://emilioschepis.com/rss.xml" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`;
```

## Adding the generated XML to the website

While the previous step was fairly straightforward, I could not find a complete explanation on how to add the generated XML to the website's files.

Existing tutorials either exposed the feed as the result of an API call (which would recalculate the XML each time server-side) or modified Next.js's Webpack configuration or the build function itself.

My solution was to generate the XML in the `getStaticProps` method of my blog page.

Since this page is statically generated, the method is only executed while building the project itself. 
Another benefit of this choice is that the Markdown files are only parsed once, as the `getStaticProps` needs to extract metadata to build the page itself.

```typescript
export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getPosts().sort((a, b) => b.date.localeCompare(a.date));
  const rss = generateRss(posts);

  fs.writeFileSync('./public/rss.xml', rss);

  return {
    props: {
      posts,
    },
  };
};
```

*Note: the XML file can be named however you prefer, but it must be written in the `public` directory.*

The last step is to add a link to the RSS feed inside your `<head>` tag. I added mine in the `_document.tsx` file to make it available to all pages.

```html
<link
  rel="alternate"
  type="application/rss+xml"
  title="RSS feed for blog posts"
  href="https://emilioschepis.com/rss.xml"
/>
```

After deploying these changes to your hosting platform you should check that the resulting feed is valid. You can do so using W3C's [Feed Validation Service](https://validator.w3.org/feed/).

## Outcome and conclusion

You can find the RSS feed of my blog posts [here](https://emilioschepis.com/rss.xml). The commit for this feature can be found [here](https://github.com/emilioschepis/website/commit/7b31367ef8d3713b99f5e814fef4f077d3798d54).

I hope this post will be useful to developers trying to add this feature to their own Next.js websites.

Thank you for reading!
