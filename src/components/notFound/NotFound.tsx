import React from "react";

import styles from "./notfound.module.scss";

import notfound from "@/assets/images/notfound.png";

const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <div className={styles.content_wrapper}>
        <img
          src={notfound.src}
          alt="not found image"
          className={styles.image}
        />
        <h3 className={styles.title}>Ma’lumot topilmadi</h3>
      </div>
    </div>
  );
};

export default NotFound;
