import React from "react";

import styles from "./download.module.scss";

import app_store from "@/assets/icons/NavbarIcons/app_store.svg";
import play_store from "@/assets/icons/NavbarIcons/play_store.svg";

const DownloadLinks = ({ classN = false }: { classN?: boolean }) => {
  return (
    <div className={styles.downloads} data-type={classN}>
      <img
        src={app_store.src}
        alt="app store icon"
        className={styles.downloads_icon}
      />
      <img
        src={play_store.src}
        alt="play store icon"
        className={styles.downloads_icon}
      />
      <p className={styles.text}>
        <span>Yuklab oling</span>
        Agrosoft
      </p>
    </div>
  );
};

export default DownloadLinks;
