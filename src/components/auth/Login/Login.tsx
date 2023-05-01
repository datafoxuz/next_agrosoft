import React, { useState } from "react";
import Link from "next/link";

import styles from "../auth.module.scss";

import passwordOn from "@/assets/icons/password_on.svg";
import passwordOff from "@/assets/icons/password_off.svg";
import { useRouter } from "next/router";
import { authProps } from "../data";

const Login = ({ tabId, setTabId }: authProps) => {
  const [isShowPass, setIsShowPass] = useState<boolean>(false);

  const router = useRouter();

  return (
    <div className={styles.modal}>
      <h3 className={styles.title}>Kirish</h3>
      <form>
        <input
          type="text"
          placeholder="Login yoki telefon raqamingiz"
          className={styles.input}
        />
        <div className={styles.pass_input}>
          <input type="password" placeholder="Parol" className={styles.input} />

          <img
            onClick={() => setIsShowPass(!isShowPass)}
            src={`${isShowPass ? passwordOn.src : passwordOff.src}`}
            alt="password icon"
          />
        </div>
        <p className={styles.reset_pass} onClick={() => setTabId(tabId + 1)}>
          Parolni unutdim
        </p>

        <div className={styles.buttons_wrapper}>
          <button type="button">Tizimga kirish</button>
          <button type="button" onClick={() => router.push("/registration")}>
            Ro’yxatdan o’tish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
