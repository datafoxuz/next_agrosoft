import { Footer } from "@/components";
import React, { useEffect, useState } from "react";
import { LayoutProps } from "./props";
import { useRouter } from "next/router";

import styles from "./layout.module.scss";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();

  return (
    <div className={styles.container}>
      <Navbar
        isStatic={pathname !== "/"}
        auth={
          pathname == "/login" ||
          pathname == "/registration" ||
          pathname == "/new-password"
        }
      />
      <div>{children}</div>
      {pathname == "/login" ||
      pathname == "/registration" ||
      pathname == "/new-password" ? null : (
        <Footer />
      )}
    </div>
  );
};

export default Layout;
