import React from "react";
import Link from "next/link";
import {
  routes,
  routeObj,
  languagesData,
  languagesObj,
  openObjTypes,
} from "../../data";
import { AnimatePresence, motion } from "framer-motion";
import { MOTION_CONFIGS } from "@/data";

import styles from "./burgermenu.module.scss";

const BurgerMenu = ({
  active,
  language = false,
  setOpen,
}: {
  active: boolean;
  language?: boolean;
  setOpen: (v: openObjTypes) => void;
}) => {
  function handleClick() {
    setOpen({
      weatherModal: false,
      burgerMenu: false,
      languagesModal: false,
    });
  }

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className={`${styles.menu} ${language ? styles.language_menu : ""}`}
          {...MOTION_CONFIGS}
        >
          {!language
            ? routes.map((item: routeObj, index: number) => (
                <Link
                  href={item.url}
                  className={styles.menu_item}
                  key={index}
                  onClick={() => handleClick()}
                >
                  {item.title}
                </Link>
              ))
            : languagesData.map((item: languagesObj, index: number) => (
                <p className={styles.menu_item} key={index}>
                  {item.title}
                </p>
              ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default BurgerMenu;
