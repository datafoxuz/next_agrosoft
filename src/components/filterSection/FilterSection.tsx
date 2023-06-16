import React, { useState } from "react";
import FilterSelect from "../filterSelect/FilterSelect";
import { useTranslation } from "next-i18next";

import styles from "./filtersection.module.scss";

import ClearIcon from "@mui/icons-material/Clear";

const FilterSection = ({ active = false }: { active?: boolean }) => {
  const { t } = useTranslation("common");
  const [item, setItem] = useState<string>("bir");

  const data = ["bir", "ikki", "uch"];

  return (
    <div className={styles.filter_section} data-type={active}>
      <div className={styles.section}>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>{t("second_navbar.filter.category")}</h3>
          <FilterSelect item={item} setItem={setItem} strData={data} />
        </div>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>{t("second_navbar.filter.location")}</h3>
          <div className={styles.selects}>
            <FilterSelect item={item} setItem={setItem} strData={data} />
            <FilterSelect item={item} setItem={setItem} strData={data} />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>{t("second_navbar.filter.price")}</h3>
          <div className={styles.inputs}>
            <input
              type="number"
              placeholder={`${t("second_navbar.filter.min_price")}`}
              className={styles.input}
            />
            <input
              type="number"
              placeholder={`${t("second_navbar.filter.max_price")}`}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>
            {t("second_navbar.filter.weight")} (Kg)
          </h3>
          <div className={styles.inputs}>
            <input
              type="number"
              placeholder={`${t("second_navbar.filter.min_weight")}`}
              className={styles.input}
            />
            <input
              type="number"
              placeholder={`${t("second_navbar.filter.max_weight")}`}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      <div className={styles.checkbox_wrapper}>
        <input type="checkbox" id="price" name="price" />
        <label htmlFor="price">
          {t("second_navbar.filter.price_is_negotiable")}
        </label>
      </div>

      <button type="button" className={styles.clear_button}>
        <ClearIcon className={styles.icon} /> {t("second_navbar.filter.clear")}
      </button>

      <div className={styles.buttons}>
        <button type="button">{t("buttons.filter")}</button>
        <button type="button" className={styles.cancel_button}>
          {t("buttons.cancel")}
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
