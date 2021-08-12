import type { ReactElement } from "react";

import Footer from "../Footer";
import Header from "../Header";

export type GlobalLayoutProps = {
  children: ReactElement;
};

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
