import fs from 'fs';
import matter from 'gray-matter';
import Post from 'models/Post';
import path from 'path';

import PostContent from '@/models/PostContent';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export const getPostIds = (): string[] =>
  fs.readdirSync(postsDirectory).map((fileName) => fileName.replace(/\.md$/, ''));

export const getPostById = (id: string): Post => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    title: matterResult.data.title,
    description: matterResult.data.description,
    date: matterResult.data.date,
    tags: matterResult.data.tags.split(/\s?,/),
  };
};

export const getPostContentById = (id: string): PostContent => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    title: matterResult.data.title,
    description: matterResult.data.description,
    date: matterResult.data.date,
    tags: matterResult.data.tags.split(/\s?,/),
    content: matterResult.content,
  };
};

export const getPosts = (): Post[] => getPostIds().map(getPostById);
