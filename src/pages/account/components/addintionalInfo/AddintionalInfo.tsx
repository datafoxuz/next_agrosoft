import React, { useState } from "react";
import { FilterSelect } from "@/components";
import { useTranslation } from "next-i18next";

import styles from "../../profile.module.scss";

const AddintionalInfo = () => {
  const { t } = useTranslation("common");
  const [item, setItem] = useState<string>("bir");

  const data = ["bir", "ikki", "uch"];

  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{t("account.other_info.title")}</h3>
      <form className={styles.form}>
        <div className={styles.input_label}>
          <label htmlFor="prof">{t("account.other_info.profession")}</label>
          <input type="text" id="prof" placeholder="Agronom" />
        </div>
        <div className={styles.input_label}>
          <label htmlFor="farm">
            {t("account.other_info.farms_territory")}
          </label>
          <input type="text" id="farm" placeholder="23" />
        </div>

        <div className={styles.input_label}>
          <label htmlFor="farm">{t("second_navbar.filter.location")}</label>

          <div className={styles.selects}>
            <FilterSelect item={item} setItem={setItem} strData={data} />
            <FilterSelect item={item} setItem={setItem} strData={data} />
          </div>
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

export default AddintionalInfo;
