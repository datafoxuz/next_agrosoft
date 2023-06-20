import SEO from "@/layouts/seo/seo";
import React from "react";

import styles from "./404/404.module.scss"

const ErrorPage = ({ status }: { status: number }) => {
  return <SEO metaTitle={`${status} - AgroSoft`}>
    <div className={styles.notFound}>
      <div className={styles.content}>
        <h1 className={styles.status_num}>{status}</h1>
        <h2 className={styles.title}>Serverda xatolik yuz berdi!</h2>
      </div>
    </div>
  </SEO>;
};

export default ErrorPage;
