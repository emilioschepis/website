import Header from '@/components/Header';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
