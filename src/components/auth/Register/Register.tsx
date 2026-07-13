import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "next-i18next";
import styles from "../auth.module.scss";
import { request, ApiError } from "@/lib/request";
import { parseValidationErrors } from "@/lib/errorHandler";
import { toast } from "react-toastify";



const Register = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [username, setUsername] = useState<string>();
  const [firstname, setFirstname] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isError, setIsError] = useState<{
    username: { hasError: boolean; message: string };
    firstname: { hasError: boolean; message: string };
    password: { hasError: boolean; message: string };
  }>({
    username: { hasError: false, message: "" },
    firstname: { hasError: false, message: "" },
    password: { hasError: false, message: "" },
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
    setIsError({
      username: { hasError: false, message: "" },
      firstname: { hasError: false, message: "" },
      password: { hasError: false, message: "" },
    });

    try {
      const { data, response } = await request(
        `/auth/register`,
        "POST",
        JSON.stringify({ "username": username, "firstname": firstname, "password": password }),
        {}
      );

      if (response && response.status === 200) {
        toast.success("Registration successful!");
        router.push("/");
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
            firstname: {
              hasError: !!fieldErrors.firstname,
              message: fieldErrors.firstname || "",
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
  };
  function handleChangeUserInp(value: string) {
    setUsername(value);
    setIsError((prevstate) => ({
      ...prevstate,
      username: { hasError: false, message: "" },
    }));
  }

  function handleChangeFirstnameInp(value: string) {
    setFirstname(value);
    setIsError((prevstate) => ({
      ...prevstate,
      firstname: { hasError: false, message: "" },
    }));
  }

  function handleChangePasswordInp(value: string) {
    setPassword(value);
    setIsError((prevstate) => ({
      ...prevstate,
      password: { hasError: false, message: "" },
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
            data-err={isError.firstname.hasError}
            onChange={(e) => handleChangeFirstnameInp(e.target.value)}
            className={styles.input}
          />
          {isError.firstname.hasError && (
            <p className={styles.error_msg}>{isError.firstname.message}</p>
          )}
          
          <input
            name="username"
            type="text"
            value={username}
            data-err={isError.username.hasError}
            placeholder={`${t("auth.username_inp")}`}
            onChange={(e) => handleChangeUserInp(e.target.value)}
            className={styles.input}
          />
          {isError.username.hasError && (
            <p className={styles.error_msg}>{isError.username.message}</p>
          )}
          
          <input
            name="password"
            type="text"
            value={password}
            data-err={isError.password.hasError}
            placeholder={`${t("auth.pass_inp")}`}
            onChange={(e) => handleChangePasswordInp(e.target.value)}
            className={styles.input}
          />
          {isError.password.hasError && (
            <p className={styles.error_msg}>{isError.password.message}</p>
          )}
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
