import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { authProps } from "../data";
import { request } from "@/lib/request";

import styles from "../auth.module.scss";

import passwordOn from "@/assets/icons/Auth/password_on.svg";
import passwordOff from "@/assets/icons/Auth/password_off.svg";

const Login = ({ tabId, setTabId }: authProps) => {
  const [user, setUser] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const router = useRouter();

  function handleLogin(email: string, password: string) {
    request(`/auth/register`, "POST", JSON.stringify({ email, password })).then(
      (result) => console.log(result)
    );
  }

  return (
    <div className={styles.modal}>
      <h3 className={styles.title}>Kirish</h3>
      <form>
        <input
          type="text"
          placeholder="Login yoki telefon raqamingiz"
          className={styles.input}
          value={user.username}
          onChange={(e) =>
            setUser((prevState) => ({
              ...prevState,
              username: e.target.value,
            }))
          }
        />
        <div className={styles.pass_input}>
          <input
            type={`${isShowPass ? "text" : "password"}`}
            placeholder="Parol"
            className={styles.input}
            onChange={(e) =>
              setUser((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
          />
          <Image
            onClick={() => setIsShowPass(!isShowPass)}
            src={`${isShowPass ? passwordOn.src : passwordOff.src}`}
            alt="password icon"
            width={22}
            height={22}
          />
        </div>
        <p className={styles.reset_pass} onClick={() => setTabId(tabId + 1)}>
          Parolni unutdim
        </p>

        <div className={styles.buttons_wrapper}>
          <button
            type="button"
            onClick={() => handleLogin(user.email, user.password)}
          >
            Tizimga kirish
          </button>
          <button type="button" onClick={() => router.push("/registration")}>
            Ro’yxatdan o’tish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
