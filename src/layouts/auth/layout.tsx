import React from "react";
import { LayoutProps } from "../props";

import styles from "./layout.module.scss";

import auth from "@/assets/images/auth_bg.png";

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.auth}>
      <img src={auth.src} alt="auth bg image" className={styles.bg_image} />
      {children}
    </div>
  );
};

export default AuthLayout;
