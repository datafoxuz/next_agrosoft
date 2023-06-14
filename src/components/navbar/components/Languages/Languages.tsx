import React, { useState } from "react";
import { openObjTypes } from "../../data";
import ArrowIcon from "@/assets/icons/NavbarIcons/ArrowIcons/ArrowIcon";
import LangModal from "./LangModal/LangModal";
import { useRouter } from "next/router";

import styles from "../../navbar.module.scss";
import { LangTypes } from "@/data/interfaces";

const Languages = () => {
  const { locale } = useRouter();
  const [lang, setLang] = useState<LangTypes>({
    active: false,
    value: locale == "ru" ? "Рус" : locale == "en" ? "Eng" : "Uzb",
  });

  return (
    <div className={styles.modal_wrapper}>
      <div
        className={styles.languages}
        onClick={() =>
          setLang((prevState) => ({
            ...prevState,
            active: !prevState.active,
          }))
        }
      >
        <p className={styles.text}>{lang.value}</p>
        <ArrowIcon active={lang.active} />
      </div>

      {lang.active && <LangModal active={lang.active} setValue={setLang} />}
    </div>
  );
};

export default Languages;
