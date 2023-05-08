import { questionTypes, sitewayProps } from "@/data/interfaces";
import { FilterMenu } from "./components";
import React, { useState } from "react";
import SiteWay from "../siteWay/SiteWay";

import styles from "./secondnavbar.module.scss";

import filterImage from "@/assets/icons/SecondNavbar/filter.svg";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const SecondNavbar = ({
  siteWay,
  title,
  state,
  setState,
  article = false,
  community = false,
  market = false,
  filter = false,
  product = false,
  diseases = false,
  innerPage = false,
}: {
  siteWay: sitewayProps[];
  state?: questionTypes;
  setState?: (v: questionTypes) => void;
  title?: string;
  article?: boolean;
  community?: boolean;
  market?: boolean;
  filter?: boolean;
  product?: boolean;
  diseases?: boolean;
  innerPage?: boolean;
}) => {
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);

  function handleClick() {
    if (setState && state) {
      setState({
        ...state,
        active: !state.active,
      });
    }
  }

  return (
    <div className={styles.s_navbar} data-type={innerPage}>
      <div className={styles.title_wrapper}>
        <SiteWay siteWay={siteWay} />
        <h3 className={styles.title}>{title}</h3>
      </div>

      <div className={styles.filter_wrapper}>
        {filter && (
          <div className={styles.input_wrapper}>
            <input
              type="text"
              placeholder="Kalit so’zni yozing"
              className={styles.input}
            />
          </div>
        )}

        {product && (
          <>
            <button className={styles.filter_button}>
              Sotib olish <ArrowBackIosNewIcon className={styles.icon} />
            </button>
            <div className={styles.filter_btn_wrapper}>
              <button
                type="button"
                className={styles.filter_button}
                onClick={() => setIsShowFilter(!isShowFilter)}
              >
                Filter
                <img
                  src={filterImage.src}
                  alt="filter black icon"
                  className={styles.icon}
                />
              </button>
              {isShowFilter ? <FilterMenu active={isShowFilter} /> : null}
            </div>
          </>
        )}

        {product ||
          article ||
          (community && (
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
          ))}

        {diseases ||
          (product && (
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
          ))}

        {community && (
          <button
            type="button"
            className={styles.add_button}
            onClick={handleClick}
          >
            Savol yozish
          </button>
        )}

        {market && (
          <button
            type="button"
            className={styles.add_button}
            onClick={handleClick}
            data-show={market}
          >
            Mahsulot qo’shish
          </button>
        )}
      </div>
    </div>
  );
};

export default SecondNavbar;
