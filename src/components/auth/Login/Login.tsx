import React, { FormEvent, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { authProps } from "../data";
import { request, ApiError } from "@/lib/request";
import { parseValidationErrors } from "@/lib/errorHandler";
import { useTranslation } from "next-i18next";
import { setCookie } from "nookies";

import styles from "../auth.module.scss";

import passwordOn from "@/assets/icons/Auth/password_on.svg";
import passwordOff from "@/assets/icons/Auth/password_off.svg";
import { useMyContext } from "@/hooks/useMyContext";
import { toast } from "react-toastify";

interface inpProps {
  username: string;
  password: string;
  prevState?: {};
}

const Login = ({ tabId, setTabId }: authProps) => {
  const { t } = useTranslation("common");
  //states===========================================
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [isError, setIsError] = useState<{
    username: { hasError: boolean; message: string };
    password: { hasError: boolean; message: string };
  }>({
    username: { hasError: false, message: "" },
    password: { hasError: false, message: "" },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const { setUser } = useMyContext();

  //functions===================================================

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>,
    username: string | undefined,
    password: string | undefined
  ) => {
    e.preventDefault();

    if (username && password) {
      if (username.length > 13 && password.length > 4) {
        setIsLoading(true);
        setIsError({
          username: { hasError: false, message: "" },
          password: { hasError: false, message: "" },
        });
        
        try {
          // Sign in using the provided credentials
          const { data, response } = await request(
            `/auth/login`,
            "POST",
            JSON.stringify({ username, password }),
            {}
          );

          if (response && response.status === 200) {
            router.push("/");
            setUser(data);
            localStorage.setItem("userToken", data.data.token);
            localStorage.setItem("userData", JSON.stringify(data));
            setCookie(null, "userToken", data.data.token, {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });
          }
        } catch (error) {
          if (error instanceof ApiError) {
            toast.error(error.message);
            
            // Handle validation errors
            if (error.validationErrors) {
              const fieldErrors = parseValidationErrors(error.validationErrors);
              setIsError({
                username: {
                  hasError: !!fieldErrors.username,
                  message: fieldErrors.username || "",
                },
                password: {
                  hasError: !!fieldErrors.password,
                  message: fieldErrors.password || "",
                },
              });
            }
          } else if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("An unexpected error occurred");
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsError({
          username: {
            hasError: username.length < 13,
            message: username.length < 13 ? "Username too short" : "",
          },
          password: {
            hasError: password.length < 4,
            message: password.length < 4 ? "Password too short" : "",
          },
        });
      }
    }
  };

  function handleChangeUserInp(value: string) {
    setUsername(value);
    setIsError((prevstate) => ({
      ...prevstate,
      username: { hasError: false, message: "" },
    }));
  }

  function handleChangePassInp(value: string) {
    setPassword(value);
    setIsError((prevstate) => ({
      ...prevstate,
      password: { hasError: false, message: "" },
    }));
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
          data-err={isError.username.hasError}
          onChange={(e) => handleChangeUserInp(e.target.value)}
          required
        />

        {isError.username.hasError ? (
          <p className={styles.error_msg}>{isError.username.message || t("auth.username_err_msg")}</p>
        ) : null}

        {/* =========================================== */}
        <div className={styles.pass_input}>
          <input
            name="password"
            type={`${isShowPass ? "text" : "password"}`}
            placeholder={`${t("auth.pass_inp")}`}
            className={`${styles.input} ${styles.password_inp}`}
            value={password}
            data-err={isError.password.hasError}
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

        {isError.password.hasError ? (
          <p className={styles.error_msg}>{isError.password.message || t("auth.pass_err_msg")}</p>
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
