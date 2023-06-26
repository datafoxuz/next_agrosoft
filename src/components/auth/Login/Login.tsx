import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { authProps } from "../data";
import { signIn, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import styles from "../auth.module.scss";

import passwordOn from "@/assets/icons/Auth/password_on.svg";
import passwordOff from "@/assets/icons/Auth/password_off.svg";

interface inpProps {
  username: string;
  password: string;
  prevState?: {};
}

const Login = ({ tabId, setTabId }: authProps) => {
  const { t } = useTranslation("common");
  //states===========================================
  const [user, setUser] = useState<inpProps>({
    username: "fayzulloevasadbek@gmail.com",
    password: "password",
  });
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
      const result = await signIn("credentials", {
        username: user.username,
        password: user.password,
        redirect: true,
        callbackUrl: "/",
      });

      if (result && !result.error) {
        setIsLoading(false);
        router.push("/");
      }
    } else {
      setIsError({
        username: username.length < 13,
        password: password.length < 4,
      });
    }
  };

  function handleChangeUserInp(value: string) {
    setUser((prevstate) => ({
      ...prevstate,
      username: value,
    }));

    if (user.username.length >= 13) {
      setIsError((prevstate) => ({
        ...prevstate,
        username: false,
      }));
    }
  }

  function handleChangePassInp(value: string) {
    setUser((prevstate) => ({
      ...prevstate,
      password: value,
    }));

    if (user.password.length >= 4) {
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
      <form onSubmit={(e) => handleLogin(e, user.username, user.password)}>
        <input
          name="username"
          type="text"
          placeholder={`${t("auth.username_inp")}`}
          className={`${styles.input} ${styles.username_inp}`}
          value={user.username}
          data-err={isError.username}
          onChange={(e) => handleChangeUserInp(e.target.value)}
          required
        />

        {isError.username ? (
          <p className={styles.error_msg}>{t("auth.username_er_msg")}</p>
        ) : null}

        {/* =========================================== */}
        <div className={styles.pass_input}>
          <input
            name="password"
            type={`${isShowPass ? "text" : "password"}`}
            placeholder={`${t("auth.pass_inp")}`}
            className={`${styles.input} ${styles.password_inp}`}
            value={user.password}
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
