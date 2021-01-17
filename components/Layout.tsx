import Footer from './Footer';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container mx-auto px-4 space-y-4">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
