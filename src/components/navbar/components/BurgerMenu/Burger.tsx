import React, { useEffect, useRef } from "react";
import { openObjTypes } from "../../data";
import BurgerMenu from "./Menu/BurgerMenu";
import { useTranslation } from "next-i18next";

import styles from "../../navbar.module.scss";

import HamburgerIcon from "@/assets/icons/HamburgerIcon/HamburgerIcon";

const Burger = ({
  open,
  setOpen,
}: {
  open: openObjTypes;
  setOpen: (v: openObjTypes) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.modal_wrapper}>
      <div
        className={styles.burger_menu}
        onClick={() =>
          setOpen({
            weatherModal: false,
            burgerMenu: !open.burgerMenu,
            languagesModal: false,
          })
        }
      >
        <HamburgerIcon active={open.burgerMenu} />
        <p>{t("main.menu")}</p>
      </div>

      {open.burgerMenu && (
        <BurgerMenu active={open.burgerMenu} setOpen={setOpen} open={open} />
      )}
    </div>
  );
};

export default Burger;
