import Footer from './Footer';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container mx-auto px-4 space-y-4">
      <Header />
      <main className="max-w-prose mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
