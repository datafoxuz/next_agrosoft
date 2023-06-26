import React, { FormEvent, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { authProps } from "../data";
import { request } from "@/lib/request";
import { useTranslation } from "next-i18next";
import { setCookie } from 'nookies';


import styles from "../auth.module.scss";

import passwordOn from "@/assets/icons/Auth/password_on.svg";
import passwordOff from "@/assets/icons/Auth/password_off.svg";
import { useMyContext } from "@/hooks/useMyContext";

interface inpProps {
  username: string;
  password: string;
  prevState?: {};
}

const Login = ({ tabId, setTabId }: authProps) => {
  const { t } = useTranslation("common");
  //states===========================================
  const [username, setUsername] = useState<string>("fayzulloevasadbek@gmail.com")
  const [password, setPassword] = useState<string>("password")
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [isError, setIsError] = useState<{
    username: boolean;
    password: boolean;
  }>({
    username: false,
    password: false,
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setUser } = useMyContext();
  //functions===================================================

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>,
    username: string,
    password: string
  ) => {
    e.preventDefault();

    if (username.length > 13 && password.length > 4) {
      setIsLoading(true);
      setIsError({ username: false, password: false });
      // Sign in using the provided credentials
      const {data, response} = await request(`/auth/login`, "POST", JSON.stringify({username, password}), false)


      if (response && response.status === 200) {
        setIsLoading(false);
        router.push("/");
        setUser(data)
        localStorage.setItem("userToken", data.data.token)
        setCookie(null, 'userToken', data.data.token, {
          maxAge: 30 * 24 * 60 * 60, // Cookie expiration time in seconds (e.g., 30 days)
          path: '/', // The path where the cookie is valid (e.g., the root path)
        });
      }else{

      }
    } else {
      setIsError({
        username: username.length < 13,
        password: password.length < 4,
      });
    }
  };

  function handleChangeUserInp(value: string) {
    setUsername(value)

    if (username.length >= 13) {
      setIsError((prevstate) => ({
        ...prevstate,
        username: false,
      }));
    }
  }

  function handleChangePassInp(value: string) {
    setPassword(value)

    if (password.length >= 4) {
      setIsError((prevstate) => ({
        ...prevstate,
        password: false,
      }));
    }
  }

  //JSX=========================================

  return (
    <div className={styles.modal}>
      <h3 className={styles.title}>{t("auth.login")}</h3>
      <form onSubmit={(e) => handleLogin(e, username, password)}>
        <input
          name="username"
          type="text"
          placeholder={`${t("auth.username_inp")}`}
          className={`${styles.input} ${styles.username_inp}`}
          value={username}
          data-err={isError.username}
          onChange={(e) => handleChangeUserInp(e.target.value)}
          required
        />

        {isError.username ? (
          <p className={styles.error_msg}>{t("auth.username_err_msg")}</p>
        ) : null}

        {/* =========================================== */}
        <div className={styles.pass_input}>
          <input
            name="password"
            type={`${isShowPass ? "text" : "password"}`}
            placeholder={`${t("auth.pass_inp")}`}
            className={`${styles.input} ${styles.password_inp}`}
            value={password}
            data-err={isError.password}
            onChange={(e) => handleChangePassInp(e.target.value)}
            required
          />
          <Image
            onClick={() => setIsShowPass(!isShowPass)}
            src={`${isShowPass ? passwordOn.src : passwordOff.src}`}
            alt="password icon"
            width={22}
            height={22}
          />
        </div>

        {isError.password ? (
          <p className={styles.error_msg}>{t("auth.pass_err_msg")}</p>
        ) : null}

        {/* =========================================== */}

        <p className={styles.reset_pass} onClick={() => setTabId(tabId + 1)}>
          {t("auth.forgot_pass")}
        </p>

        <div className={styles.buttons_wrapper}>
          {isLoading ? (
            <>
              <button type="button" className={styles.load_button}>
                {t("auth.login")}
              </button>

              <button type="button" className={styles.load_button}>
                {t("auth.signup")}
              </button>
            </>
          ) : (
            <>
              <button type="submit">{t("auth.login")}</button>
              <button
                type="button"
                onClick={() => router.push("/registration")}
              >
                {t("auth.signup")}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
