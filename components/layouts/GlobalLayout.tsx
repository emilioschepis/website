import type { ReactElement } from "react";

import Header from "../Header";

export type GlobalLayoutProps = {
  children: ReactElement;
};

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default GlobalLayout;
