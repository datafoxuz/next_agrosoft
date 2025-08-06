import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "next-i18next";
import styles from "../auth.module.scss";
import { request } from "@/lib/request";
import { toast } from "react-toastify";



const Register = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [username, setUsername] = useState<string>();
  const [firstname, setFirstname] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isError, setIsError] = useState<{
    username: boolean;
    firstname: boolean;
    password: boolean;
  }>({
    username: false,
    firstname: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleRegister = async (
    e: FormEvent<HTMLFormElement>,
    username: string | undefined,
    firstname: string | undefined,
    password: string | undefined
  ) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError({ username: false, firstname: false, password: false });

    const { data, response } = await request(
      `/auth/register`,
      "POST",
      JSON.stringify({ "username": username, "firstname": firstname, "password": password }),
      false
    );

    setIsLoading(false);
    if (response && response.status === 200) {
      router.push("/");

    } else {
      toast.error(`Error status: ${response.status}`);
    }
  };
  function handleChangeUserInp(value: string) {
    setUsername(value);

    
      setIsError((prevstate) => ({
        ...prevstate,
        username: false,
      }));
    
  }

  function handleChangeFirstnameInp(value: string) {
    setFirstname(value);

    setIsError((prevstate) => ({
      ...prevstate,
      firstname: false,
    }));
  }
  function handleChangePasswordInp(value: string) {
    setPassword(value);

    setIsError((prevstate) => ({
      ...prevstate,
      password: false,
    }));
  }
  return (
    <div className={styles.modal}>
      <h3>{t("auth.signup")}</h3>
      <form onSubmit={(e) => handleRegister(e, username, firstname, password)} className={styles.form}>
        <div>
          <input
            name="firstname"
            type="text"
            placeholder={`${t("main_topics.default_name")}`}
            value={firstname}
            data-err={isError.firstname}
            onChange={(e) => handleChangeFirstnameInp(e.target.value)}
            className={styles.input}
          />
          <input
            name="username"
            type="text"
            value={username}
            data-err={isError.username}
            placeholder={`${t("auth.username_inp")}`}
            onChange={(e) => handleChangeUserInp(e.target.value)}
            className={styles.input}
          />
          <input
            name="password"
            type="text"
            value={password}
            data-err={isError.password}
            placeholder={`${t("auth.pass_inp")}`}
            onChange={(e) => handleChangePasswordInp(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.buttons_wrapper}>
          {isLoading ? (
            <>
              <button type="button" className={styles.load_button}>{t("buttons.continue")}</button>
              <button type="button" className={styles.load_button} onClick={() => router.push("/login")}>
                {t("auth.login")}
              </button>
            </>
          ) :
            (
              <>
                <button type="submit">{t("buttons.continue")}</button>
                <button type="button" onClick={() => router.push("/login")}>
                  {t("auth.login")}
                </button>
              </>
            )}
        </div>
      </form>
    </div>
  );
};

export default Register;
