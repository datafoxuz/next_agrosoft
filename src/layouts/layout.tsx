import { Footer, Navbar } from "@/components";
import React, { useEffect, useState } from "react";
import { LayoutProps } from "./props";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

import styles from "./layout.module.scss";

const Layout = ({ children, session }: LayoutProps) => {
  const { asPath } = useRouter();
  const [isShowFooter, setIsShowFooter] = useState<boolean>(true);

  useEffect(() => {
    if (asPath == "/login") {
      setIsShowFooter(false);
    }

    if (asPath == "/registration") {
      setIsShowFooter(false);
    }
  }, [asPath]);

  return (
    <div className={styles.container}>
      <SessionProvider session={session}>
        <Navbar
          isStatic={asPath !== "/"}
          auth={asPath == "/login" || asPath == "/registration"}
        />
        <div>{children}</div>
        {isShowFooter ? <Footer /> : null}
      </SessionProvider>
    </div>
  );
};

export default Layout;
