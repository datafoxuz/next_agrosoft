import { sitewayProps } from "@/data";
import React, { useState } from "react";
import SiteWay from "../siteWay/SiteWay";

import styles from "./secondnavbar.module.scss";

import filter from "@/assets/icons/SecondNavbar/filter.svg";
import { FilterMenu } from "./components";

const SecondNavbar = ({
  siteWay,
  title,
  community = false,
}: {
  siteWay: sitewayProps[];
  title: string;
  community?: boolean;
}) => {
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);
  return (
    <div className={styles.s_navbar}>
      <div className={styles.title_wrapper}>
        <SiteWay siteWay={siteWay} />
        <h3 className={styles.title}>{title}</h3>
      </div>

      <div className={styles.filter_wrapper}>
        <div className={styles.input_wrapper}>
          <input
            type="text"
            placeholder="Kalit so’zni yozing"
            className={styles.input}
          />
        </div>
        <div className={styles.filter_btn_wrapper}>
          <button
            type="button"
            className={styles.filter_button}
            onClick={() => setIsShowFilter(!isShowFilter)}
          >
            Saralash
            <img
              src={filter.src}
              alt="filter black icon"
              className={styles.icon}
            />
          </button>
          {isShowFilter ? <FilterMenu active={isShowFilter} /> : null}
        </div>
        {community ? <button>Savol yozish</button> : null}
      </div>
    </div>
  );
};

export default SecondNavbar;
