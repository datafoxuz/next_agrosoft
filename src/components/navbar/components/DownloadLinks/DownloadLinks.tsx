import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import styles from "./download.module.scss";

import app_store from "@/assets/icons/NavbarIcons/app_store.svg";
import play_store from "@/assets/icons/NavbarIcons/play_store.svg";

const DownloadLinks = ({ classN = false }: { classN?: boolean }) => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.downloads} data-type={classN}>
      <Image
        src={app_store.src}
        alt="app store icon"
        className={styles.downloads_icon}
        width={30}
        height={30}
      />
      <Image
        src={play_store.src}
        alt="play store icon"
        className={styles.downloads_icon}
        width={30}
        height={30}
      />
      <p className={styles.text}>
        <span>{t("main.hero.download")}</span>
        Agrosoft
      </p>
    </div>
  );
};

export default DownloadLinks;
