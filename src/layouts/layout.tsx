import { Footer, Navbar } from "@/components";
import React, { useEffect, useState } from "react";
import { LayoutProps } from "./props";
import { useRouter } from "next/router";

import styles from "./layout.module.scss";

const Layout = ({ children }: LayoutProps) => {
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
      <Navbar isStatic={asPath !== "/"} />
      <div>{children}</div>
      {isShowFooter ? <Footer /> : null}
    </div>
  );
};

export default Layout;
