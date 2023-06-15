import { Footer, Navbar } from "@/components";
import React, { useEffect, useState } from "react";
import { LayoutProps } from "./props";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

import styles from "./layout.module.scss";

const Layout = ({ children, session }: LayoutProps) => {
  const { pathname } = useRouter();

  return (
    <div className={styles.container}>
      <SessionProvider session={session}>
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
      </SessionProvider>
    </div>
  );
};

export default Layout;
