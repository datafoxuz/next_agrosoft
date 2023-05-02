import { MOTION_CONFIGS } from "@/data";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import styles from "./filtermenu.module.scss";

const FilterMenu = ({ active }: { active: boolean }) => {
  const filters = [
    {
      title: "Eng so`ngilari",
    },
    {
      title: "Eng yaxshilar",
    },
    {
      title: "Eng mashhurlari",
    },
  ];

  return (
    <AnimatePresence>
      {active ? (
        <motion.div className={styles.menu} {...MOTION_CONFIGS}>
          {filters.map((item: { title: string }, index: number) => (
            <p className={styles.menu_item} key={index}>
              {item.title}
            </p>
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default FilterMenu;
