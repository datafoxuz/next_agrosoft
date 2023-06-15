import { useRouter } from "next/router";
import React, { useState } from "react";
import { inputStates } from "../data";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import styles from "../auth.module.scss";

import passwordOn from "@/assets/icons/Auth/password_on.svg";
import passwordOff from "@/assets/icons/Auth/password_off.svg";

const NewPassword = () => {
  const { t } = useTranslation("common");
  const [isShowPass, setIsShowPass] = useState<inputStates>({
    first: false,
    second: false,
  });

  const router = useRouter();

  return (
    <div className={styles.modal}>
      <h3>{t("auth.new_pass")}</h3>
      <form className={styles.form}>
        <div>
          <div className={styles.pass_input}>
            <input
              type="password"
              placeholder={`${t("auth.enter_pass")}`}
              className={styles.input}
            />
            <Image
              onClick={() =>
                setIsShowPass((isShowPass) => ({
                  ...isShowPass,
                  first: !isShowPass.first,
                }))
              }
              src={`${isShowPass.first ? passwordOn.src : passwordOff.src}`}
              alt="password icon"
              className={styles.view_pass1}
              width={22}
              height={12}
            />
          </div>
          <div className={styles.pass_input}>
            <input
              type="password"
              placeholder={`${t("auth.enter_pass_again")}`}
              className={styles.input}
            />
            <Image
              onClick={() =>
                setIsShowPass((isShowPass) => ({
                  ...isShowPass,
                  second: !isShowPass.second,
                }))
              }
              src={`${isShowPass.second ? passwordOn.src : passwordOff.src}`}
              alt="password icon"
              className={styles.view_pass2}
              width={22}
              height={12}
            />
          </div>
        </div>

        <div className={styles.buttons_wrapper}>
          <button type="button">{t("auth.login")}</button>
          <button type="button" onClick={() => router.back()}>
            {t("buttons.back")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
