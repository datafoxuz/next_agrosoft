import React from "react";
import { authProps } from "../data";
import { useRouter } from "next/router";

import styles from "../auth.module.scss";

const ResetPass = ({ tabId, setTabId }: authProps) => {
  const router = useRouter();

  return (
    <div className={styles.modal}>
      <h3>Parolni tiklash</h3>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Login yoki telefon raqamingiz"
          className={styles.input}
        />
        <div className={styles.buttons_wrapper}>
          <button type="button" onClick={() => router.push("/new-password")}>
            Davom etish
          </button>
          <button type="button" onClick={() => setTabId(tabId - 1)}>
            Orqaga qaytish
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPass;
