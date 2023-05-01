import React from "react";
import { LayoutProps } from "../props";

import styles from "./layout.module.scss";

const AuthLayout = ({ children }: LayoutProps) => {
  return <div className={styles.auth}>{children}</div>;
};

export default AuthLayout;
