import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import Image from "next/image";
import SEO from "@/layouts/seo/seo";

import styles from "./404.module.scss";
import notfound from "@/assets/images/404.png";

const NotFound = () => {
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
          <h2 className={styles.title}>Sahifa topilmadi</h2>
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
