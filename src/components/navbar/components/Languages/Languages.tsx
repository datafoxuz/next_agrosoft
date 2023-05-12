import React from "react";
import { languagesData, languagesObj, openObjTypes } from "../../data";
import { AnimatePresence, motion } from "framer-motion";
import { MOTION_CONFIGS } from "@/data";

import styles from "./language.module.scss";

const Languages = ({
  active,
  open,
  setOpen,
}: {
  active: boolean;
  open: openObjTypes;
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
        <motion.div className={styles.language_menu} {...MOTION_CONFIGS}>
          {languagesData.map((item: languagesObj, index: number) => (
            <p
              className={styles.menu_item}
              key={index}
              onClick={() => handleClick()}
            >
              {item.title}
            </p>
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Languages;
