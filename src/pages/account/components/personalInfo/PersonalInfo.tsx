import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import styles from "../../profile.module.scss";

import defaultImg from "@/assets/images/default_image.png";

const PersonalInfo = () => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{t("account.personal_info.title")}</h3>

      <div className={styles.image_container}>
        <div className={styles.account_image}>
          <Image
            src={defaultImg.src}
            alt="default image"
            className={styles.image}
            width={84}
            height={84}
          />
        </div>
        <label className={styles.image_label} htmlFor="imageUpload">
          {t("buttons.add_img")}
        </label>
        <input
          id="imageUpload"
          accept="image/png, image/gif, image/jpeg"
          type="file"
        />
      </div>

      <form className={styles.form}>
        <div className={styles.input_label}>
          <label>{t("main_topics.default_name")}</label>
          <input type="text" placeholder="Raxmatov Shoxrux" />
        </div>
        <div className={styles.input_label}>
          <label>{t("account.personal_info.phone")}</label>
          <input type="text" placeholder="+99897 888 99 33" />
        </div>
        <div className={styles.input_label}>
          <label>{t("account.personal_info.email")}</label>
          <input type="text" placeholder="mygmail@gmail.com" />
        </div>

        <div className={styles.button_wrapper}>
          <button type="button">{t("buttons.save_changes")}</button>
          <button type="button" className={styles.cancel_button}>
            {t("buttons.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
