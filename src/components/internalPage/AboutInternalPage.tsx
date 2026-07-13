import React from "react";
import { useTranslation } from "next-i18next";

import styles from "./internalPage.module.scss";

const AboutInternalPage = () => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.internal}>
      <div className={`${styles.internal_top} ${styles.section}`}>
        <h3 className={styles.hidden_title}>{t("inner_page.about_us")}</h3>
        <button type="button" className={styles.top_button}>
          {t("buttons.contact")}
        </button>
      </div>
    </div>
  );
};

export default AboutInternalPage;