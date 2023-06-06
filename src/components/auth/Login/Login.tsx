import React, { useState } from "react";
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

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    username: string,
    password: string
  ) => {
    if (username.length > 13 && password.length > 4) {
      e.preventDefault();
      setIsError({ username: false, password: false });
      // Sign in using the provided credentials
      const result = await signIn("credentials", {
        username: user.username,
        password: user.password,
        redirect: true,
        callbackUrl: "/",
      });

      if (result && !result.error) {
        router.push("/");
      }
    } else {
      if (username.length < 13) {
        setIsError((value) => ({
          ...value,
          username: true,
        }));
      } else {
        setIsError((value) => ({
          ...value,
          password: true,
        }));
      }
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

  return (
    <div className={styles.modal}>
      <h3 className={styles.title}>Kirish</h3>
      <form>
        <input
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
        <div className={styles.pass_input}>
          <input
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
        <p className={styles.reset_pass} onClick={() => setTabId(tabId + 1)}>
          Parolni unutdim
        </p>
        <div className={styles.buttons_wrapper}>
          <button
            type="button"
            onClick={(e) => handleLogin(e, user.username, user.password)}
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
