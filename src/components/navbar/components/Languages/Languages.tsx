import React, { useState } from "react";
import { openObjTypes } from "../../data";
import ArrowIcon from "@/assets/icons/NavbarIcons/ArrowIcons/ArrowIcon";
import LangModal from "./LangModal/LangModal";
import { useRouter } from "next/router";

import styles from "../../navbar.module.scss";
import { LangTypes } from "@/data/interfaces";

const Languages = ({
  open,
  setOpen,
}: {
  open: openObjTypes;
  setOpen: (v: openObjTypes) => void;
}) => {
  const { locale } = useRouter();
  const [lang, setLang] = useState<LangTypes>({
    value: locale == "ru" ? "Рус" : locale == "en" ? "Eng" : "Uzb",
  });

  return (
    <div className={styles.modal_wrapper}>
      <div
        className={styles.languages}
        onClick={() =>
          setOpen({
            weatherModal: false,
            burgerMenu: false,
            languagesModal: !open.languagesModal,
          })
        }
      >
        <p className={styles.text}>{lang.value}</p>
        <ArrowIcon active={open.languagesModal} />
      </div>

      {open.languagesModal && (
        <LangModal
          active={open.languagesModal}
          setValue={setLang}
          setOpen={setOpen}
          open={open}
        />
      )}
    </div>
  );
};

export default Languages;
