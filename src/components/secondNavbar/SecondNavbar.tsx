import { questionTypes, sitewayProps } from "@/data/interfaces";
import React, { useState } from "react";
import SiteWay from "../siteWay/SiteWay";

import styles from "./secondnavbar.module.scss";

import filterImage from "@/assets/icons/SecondNavbar/filter.svg";
import { FilterMenu } from "./components";

const SecondNavbar = ({
  siteWay,
  title,
  community = false,
  filter = false,
  handleClick = undefined,
}: {
  siteWay: sitewayProps[];
  title?: string;
  community?: boolean;
  filter?: boolean;
  handleClick?: () => void | undefined;
}) => {
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);
  return (
    <div className={styles.s_navbar} data-filter={filter}>
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
              src={filterImage.src}
              alt="filter black icon"
              className={styles.icon}
            />
          </button>
          {isShowFilter ? <FilterMenu active={isShowFilter} /> : null}
        </div>
        {community && handleClick ? (
          <button type="button" onClick={handleClick}>
            Savol yozish
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default SecondNavbar;
