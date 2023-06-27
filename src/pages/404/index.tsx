import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import Image from "next/image";
import SEO from "@/layouts/seo/seo";
import { useTranslation } from "next-i18next";

import styles from "./404.module.scss";
import notfound from "@/assets/images/404.png";

const NotFound = () => {
  const {t} = useTranslation("common")
  return (
    <SEO metaTitle="404 - AgroSoft">
      <div className={styles.notFound}>
        <div className={styles.content}>
          <Image
            src={notfound.src}
            alt="404 not found image"
            width={300}
            height={100}
            className={styles.image}
          />
          <h2 className={styles.title}>{t("error.page_not_found")}</h2>
        </div>
      </div>
    </SEO>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default NotFound;
