import React from "react";
import { authProps } from "../data";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import styles from "../auth.module.scss";

const ResetPass = ({ tabId, setTabId }: authProps) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <div className={styles.modal}>
      <h3>{t("auth.restore_pass")}</h3>
      <form className={styles.form}>
        <input
          type="text"
          placeholder={`${t("auth.username_inp")}`}
          className={styles.input}
        />
        <div className={styles.buttons_wrapper}>
          <button type="button" onClick={() => router.push("/new-password")}>
            {t("buttons.continue")}
          </button>
          <button type="button" onClick={() => setTabId(tabId - 1)}>
            {t("buttons.back")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPass;
