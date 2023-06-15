import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

import styles from "../auth.module.scss";

const Register = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <div className={styles.modal}>
      <h3>{t("auth.signup")}</h3>
      <form className={styles.form}>
        <div>
          <input
            type="text"
            placeholder={`${t("main_topics.default_name")}`}
            className={styles.input}
          />
          <input
            type="text"
            placeholder={`${t("auth.username_inp")}`}
            className={styles.input}
          />
        </div>

        <div className={styles.buttons_wrapper}>
          <button type="button">{t("buttons.continue")}</button>
          <button type="button" onClick={() => router.push("/login")}>
            {t("auth.login")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
