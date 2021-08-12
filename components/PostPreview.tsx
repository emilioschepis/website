import Image from "next/image";
import Link from "next/link";

import { Language, PostsQuery } from "../lib/graphql/generated";
import imageLoader from "../lib/utils/imageLoader";
import placeholder from "../public/placeholder.jpg";

function flagByLanguage(language: Language): string {
  if (!language) return "";

  if (language === Language.English) {
    return "🇬🇧";
  } else if (language === Language.Italian) {
    return "🇮🇹";
  } else {
    return "";
  }
}

export type PostPreviewProps = {
  post: PostsQuery["posts"][number];
};

const PostPreview = ({ post }: PostPreviewProps) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <a>
        <article
          aria-labelledby={`${post.slug}-label`}
          className="overflow-hidden rounded-lg border-2 hover:border-blue-600"
        >
          <div aria-hidden className="h-32 flex justify-center items-center overflow-hidden border-b-2">
            {post.cover ? (
              <Image
                loader={imageLoader}
                src={post.cover.url}
                alt={post.cover.alt ?? undefined}
                width={post.cover.width ?? undefined}
                height={post.cover.height ?? undefined}
              />
            ) : (
              <Image src={placeholder} alt="Placeholder cover" />
            )}
          </div>
          <div className="m-4 space-y-2">
            <h2 id={`${post.slug}-label`} className="text-xl font-bold">
              {post.title}
            </h2>
            {post.subtitle ? <p className="text-gray-700 line-clamp-3">{post.subtitle}</p> : null}
            <div className="flex items-center space-x-2">
              <p className="text-xl" aria-label={post.language}>
                {flagByLanguage(post.language)}
              </p>
              <p className="text-sm uppercase text-gray-700 italic">{post.writtenAt}</p>
            </div>
          </div>
        </article>
      </a>
    </Link>
  );
};

export default PostPreview;