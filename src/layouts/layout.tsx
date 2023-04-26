import { Navbar } from "@/components";
import React from "react";
import { LayoutProps } from "./props";

import styles from "./layout.module.scss";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
