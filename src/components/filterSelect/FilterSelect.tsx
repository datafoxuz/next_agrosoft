import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.select_wrapper} data-type={mb}>
      <div className={styles.button} onClick={toggleList}>
        <p>{item}</p>
        <ArrowBackIosNewIcon className={styles.icon} data-open={isOpen} />
      </div>

      {isOpen && (
        <div className={styles.list}>
          {data.map((e, index) => (
            <p
              className={styles.item}
              key={index}
              onClick={() => {
                setItem(e);
                setIsOpen(false);
              }}
            >
              {e}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSelect;
