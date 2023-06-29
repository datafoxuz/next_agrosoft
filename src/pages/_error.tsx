import SEO from "@/layouts/seo/seo";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import styles from "./404/404.module.scss"

const ErrorPage = ({ status }: { status: number }) => {
  const {t} = useTranslation("common")
  return <SEO metaTitle={`${status} - AgroSoft`}>
    <div className={styles.notFound}>
      <div className={styles.content}>
        <h1 className={styles.status_num}>{status}</h1>
        <h2 className={styles.title}>{t("error.server_error")}!</h2>
      </div>
    </div>
  </SEO>;
};


export async function getStaticProps({ locale }: { locale: string }) {

  return {
    props: {
      ...(await serverSideTranslations('uz', ["common"])),
    },
  };
}

export default ErrorPage;
