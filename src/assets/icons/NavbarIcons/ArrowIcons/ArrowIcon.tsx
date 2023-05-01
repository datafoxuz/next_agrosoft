import React from "react";

import styles from "./arrowicon.module.scss";

const ArrowIcon = ({ active = false }: { active: boolean }) => {
  return (
    <svg
      width="16"
      height="8"
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={styles.line}
        d={`M15 ${active ? "7L8 1L1 7" : "1L8 7L1 1"}`}
        stroke="#B0DAC4"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowIcon;
