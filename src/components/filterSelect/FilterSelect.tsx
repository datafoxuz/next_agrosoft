import React from "react";

import styles from "./filterselect.module.scss";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const FilterSelect = ({
  item,
  setItem,
  data,
  mb = false,
}: {
  item: string;
  setItem: (v: string) => void;
  data: string[];
  mb?: boolean;
}) => {
  return (
    <div className={styles.select_wrapper} data-type={mb}>
      <div className={styles.button}>
        <p>{item}</p>
        <ArrowBackIosNewIcon className={styles.icon} />
      </div>

      {/* <div className={styles.list}>
        {data.map((e, index) => (
          <p className={styles.item} key={index}>
            {e}
          </p>
        ))}
      </div> */}
    </div>
  );
};

export default FilterSelect;
