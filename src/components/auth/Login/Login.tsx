import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { authProps } from "../data";
import { signIn, useSession } from "next-auth/react";

import styles from "../auth.module.scss";

import passwordOn from "@/assets/icons/Auth/password_on.svg";
import passwordOff from "@/assets/icons/Auth/password_off.svg";

interface inpProps {
  username: string;
  password: string;
  prevState?: {};
}

const Login = ({ tabId, setTabId }: authProps) => {
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
        password: password.length < 13,
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
      <h3 className={styles.title}>Kirish</h3>
      <form onSubmit={(e) => handleLogin(e, user.username, user.password)}>
        <input
          name="username"
          type="text"
          placeholder="Login yoki telefon raqamingiz"
          className={`${styles.input} ${styles.username_inp}`}
          value={user.username}
          data-err={isError.username}
          onChange={(e) => handleChangeUserInp(e.target.value)}
        />

        {isError.username ? (
          <p className={styles.error_msg}>
            Username kamida 13 ta harfdan iborat bo'lishi kerak
          </p>
        ) : null}

        {/* =========================================== */}
        <div className={styles.pass_input}>
          <input
            name="password"
            type={`${isShowPass ? "text" : "password"}`}
            placeholder="Parol"
            className={`${styles.input} ${styles.password_inp}`}
            value={user.password}
            data-err={isError.password}
            onChange={(e) => handleChangePassInp(e.target.value)}
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
          <p className={styles.error_msg}>
            Password kamida 4 ta harfdan iborat bo'lishi kerak
          </p>
        ) : null}

        {/* =========================================== */}

        <p className={styles.reset_pass} onClick={() => setTabId(tabId + 1)}>
          Parolni unutdim
        </p>

        <div className={styles.buttons_wrapper}>
          {isLoading ? (
            <>
              <button type="button" className={styles.load_button}>
                Tizimga kirish
              </button>

              <button type="button" className={styles.load_button}>
                Ro’yxatdan o’tish
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                // onClick={(e) => handleLogin(user.username, user.password)}
              >
                Tizimga kirish
              </button>
              <button
                type="button"
                onClick={() => router.push("/registration")}
              >
                Ro’yxatdan o’tish
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
