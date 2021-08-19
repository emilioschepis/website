import NavItem from "./NavItem";

const Header = () => {
  return (
    <header className="flex-none h-16 border-b-2">
      <div className="max-w-5xl h-full lg:mx-auto">
        <div className="flex h-full mx-4 justify-between items-center">
          <p className="text-xl font-bold">Emilio Schepis</p>
          <nav>
            <ul className="flex space-x-4">
              <NavItem href="/">Home</NavItem>
              <NavItem href="https://es.hashnode.dev/">Blog</NavItem>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
