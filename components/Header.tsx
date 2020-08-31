import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <a className={styles.name}>Emilio Schepis</a>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/">
                <a
                  className={classNames({
                    [styles.active]: pathname.match(/^\/$/),
                  })}
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a
                  className={classNames({
                    [styles.active]: pathname.match(/^\/blog(?:\/[^/]*\/?)?$/),
                  })}
                >
                  Blog
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
