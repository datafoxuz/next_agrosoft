import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

import styles from "./market.module.scss";

const Market = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  function handleNavigate(path: string) {
    router.push(path);
  }

  return (
    <div className={styles.main_market}>
      <div className={styles.main_desc}>
        <h2 className={styles.market_title}>{t("market.title")}</h2>
        <p className={styles.market_text}>{t("market.small_text")}</p>
      </div>
      <div className={styles.market_section}>
        <h2 className={styles.section_title}>yirik Ulgurji sotuvchilar</h2>
      </div>

      <button
        type="button"
        className={styles.market_button}
        onClick={() => handleNavigate("/market")}
      >
        {t("buttons.enter_market")}
      </button>
    </div>
  );
};

export default Market;
