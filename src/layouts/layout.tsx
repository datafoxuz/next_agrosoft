import { Footer, Navbar } from "@/components";
import React from "react";
import { LayoutProps } from "./props";
import { useRouter } from "next/router";

import styles from "./layout.module.scss";

const Layout = ({ children }: LayoutProps) => {
  const { asPath } = useRouter();

  return (
    <div className={styles.container}>
      <Navbar isStatic={asPath == "/login"} />
      <div>{children}</div>
      {asPath !== "/login" ? <Footer /> : null}
    </div>
  );
};

export default Layout;
