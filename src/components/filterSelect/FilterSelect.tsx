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
  data: [];
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
          {data.map((e: { name: string; id: number }, index: number) => (
            <p
              className={styles.item}
              key={index}
              onClick={() => {
                setItem(e.name);
                setIsOpen(false);
              }}
            >
              {e.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSelect;
