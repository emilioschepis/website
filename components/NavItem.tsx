import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

export type NavItemProps = {
  href: string;
  children: ReactNode;
};

const NavItem = ({ href, children }: NavItemProps) => {
  const router = useRouter();
  const isActive = (() => {
    if (href === "/") {
      // Links to the home are only active on the home.
      return router.pathname === "/";
    }

    return router.pathname.toLowerCase().includes(href.toLowerCase());
  })();

  const anchorStyle = (() => {
    const base = "uppercase text-sm tracking-wide font-bold";

    if (isActive) {
      return `${base} text-blue-600`;
    } else {
      return `${base} text-gray-700 hover:text-black`;
    }
  })();

  return (
    <li>
      <Link href={href}>
        <a className={anchorStyle}>{children}</a>
      </Link>
    </li>
  );
};

export default NavItem;
