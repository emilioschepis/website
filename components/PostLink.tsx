import Link from "next/link";
import type { ReactNode } from "react";

export type PostLinkProps = {
  href: string;
  children: ReactNode;
};

const PostLink = ({ href, children }: PostLinkProps) => {
  if (href.startsWith("/")) {
    return (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    );
  } else {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
};

export default PostLink;
