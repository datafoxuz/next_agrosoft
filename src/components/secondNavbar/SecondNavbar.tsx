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
  market = false,
  filter = false,
  state,
  setState,
}: {
  siteWay: sitewayProps[];
  title?: string;
  community?: boolean;
  market?: boolean;
  filter?: boolean;
  state: questionTypes;
  setState: (v: questionTypes) => void;
}) => {
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);

  function handleClick() {
    setState({
      ...state,
      active: !state.active,
    });
  }

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
            data-hidden={market}
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

        <button
          type="button"
          className={styles.add_button}
          onClick={handleClick}
          data-show={community}
        >
          Savol yozish
        </button>

        <button
          type="button"
          className={styles.add_button}
          onClick={handleClick}
          data-show={market}
        >
          Mahsulot qo’shish
        </button>
      </div>
    </div>
  );
};

export default SecondNavbar;
