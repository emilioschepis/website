import cn from 'classnames';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

const Header: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <header className="sticky top-0 h-16 z-50 bg-gray-50 border-b-2 flex justify-between items-center">
      <p className="text-xl">Emilio Schepis</p>
      <nav>
        <ul className="space-x-4">
          <li className="inline">
            <Link href="/">
              <a
                className={cn('text-blue-500', {
                  'font-bold': pathname.match(/^\/$/),
                })}
              >
                Home
              </a>
            </Link>
          </li>
          <li className="inline">
            <Link href="/blog">
              <a
                className={cn('text-blue-500', {
                  'font-bold': pathname.match(/^\/blog(?:\/[^/]*\/?)?$/),
                })}
              >
                Blog
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
