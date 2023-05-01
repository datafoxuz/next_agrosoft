import React, { useState } from "react";
import Link from "next/link";

import styles from "./login.module.scss";

import passwordOn from "@/assets/icons/password_on.svg";
import passwordOff from "@/assets/icons/password_off.svg";

const Login = () => {
  const [isShowPass, setIsShowPass] = useState<boolean>(false);

  return (
    <div className={styles.login}>
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
        <Link href="/">Parolni unutdim</Link>

        <div className={styles.buttons_wrapper}>
          <button type="button">Tizimga kirish</button>
          <button type="button">Ro’yxatdan o’tish</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
