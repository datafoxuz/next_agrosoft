import React from "react";
import { languagesData, languagesObj, openObjTypes } from "../../../data";
import { AnimatePresence, motion } from "framer-motion";
import { MOTION_CONFIGS } from "@/data";
import { LangTypes } from "@/data/interfaces";
import { useRouter } from "next/router";

import styles from "./language.module.scss";

import Image from "next/image";

const LangModal = ({
  active,
  setValue,
  setOpen,
}: {
  active: boolean;
  setValue: (v: LangTypes) => void;
  setOpen: (v: openObjTypes) => void;
}) => {
  const router = useRouter();

  function handleClick(label: string, value: string, flagSt: string) {
    setValue({ value: label, flag: flagSt });
    setOpen({
      weatherModal: false,
      burgerMenu: false,
      languagesModal: false,
    });
    router.replace(router.route, router.asPath, {
      locale: value || "uz",
    });
  }

  return (
    <AnimatePresence>
      {active ? (
        <motion.div className={styles.language_menu} {...MOTION_CONFIGS}>
          {languagesData.map((item: languagesObj, index: number) => (
            <div
              key={index}
              className={styles.lang_item}
              onClick={() => handleClick(item.title, item.config, item.config)}
            >
              <Image
                src={item.icon}
                alt="flag icon"
                width={20}
                height={20}
                className={styles.icon}
              />
              <p className={styles.text} key={index}>
                {item.title}
              </p>
            </div>
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LangModal;
