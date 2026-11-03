import React, { useState } from "react";
import styles from "./filterselect.module.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/router";

const FilterSelect = ({
  item,
  setItem,
  data = [],
  strData = [],
  mb = false,
  region = false,
}: {
  item: string;
  setItem: (v: any) => void;
  data?: [];
  strData?: string[];
  mb?: boolean;
  region?: boolean;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  function handleClickItem(
    name: string,
    id?: number,
    lat?: string,
    long?: string
  ) {
    setIsOpen(false);
    if (region) {
      setItem(name);
      router.replace(`${router.pathname}?regionId=${id}`);
    } else if (lat !== undefined || long !== undefined) {
      // district: keep coordinates for the weather request
      setItem({ districtName: name, lat, long });
    } else {
      setItem(name);
    }
  }

  return (
    <div className={styles.select_wrapper} data-type={mb}>
      <div className={styles.button} onClick={toggleList}>
        <p>{item}</p>
        <ArrowBackIosNewIcon className={styles.icon} data-open={isOpen} />
      </div>

      {isOpen && (
        <div className={styles.list}>
          {data.map(
            (
              e: { name: string; id: number; lat?: string; long?: string },
              index: number
            ) => (
              <p
                className={styles.item}
                key={index}
                onClick={() => handleClickItem(e.name, e.id, e.lat, e.long)}
              >
                {e.name}
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSelect;
