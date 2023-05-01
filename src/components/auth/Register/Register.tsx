import { useRouter } from "next/router";
import React from "react";

import styles from "../auth.module.scss";

const Register = () => {
  const router = useRouter();

  return (
    <div className={styles.modal}>
      <h3>Ro’yxatdan o’tish</h3>
      <form className={styles.form}>
        <div>
          <input
            type="text"
            placeholder="Ism-sharifingiz"
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Login yoki telefon raqamingiz"
            className={styles.input}
          />
        </div>

        <div className={styles.buttons_wrapper}>
          <button type="button">Davom etish</button>
          <button type="button" onClick={() => router.push("/login")}>
            Tizimga kirish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
