import React from "react";
import { useTranslation } from "next-i18next";

import styles from "./about.module.scss";

const About = () => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.container}>
      <div className={styles.main_about}>
        <h2 className={styles.about_title}>{t("about.title")}</h2>
        <p className={styles.about_text}>{t("about.desc")}</p>
      </div>
    </div>
  );
};

export default About;
