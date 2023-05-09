import { questionTypes, sitewayProps } from "@/data/interfaces";
import { FilterMenu } from "./components";
import React, { useState } from "react";
import SiteWay from "../siteWay/SiteWay";

import styles from "./secondnavbar.module.scss";

import filterImage from "@/assets/icons/SecondNavbar/filter.svg";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FilterSection from "../filterSection/FilterSection";

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
  innerPage = false,
  about = false,
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
  innerPage?: boolean;
  about?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<{
    buy: boolean;
    filter1: boolean;
    filter2: boolean;
  }>({
    buy: false,
    filter1: false,
    filter2: false,
  });

  function handleClick() {
    if (setState && state) {
      setState({
        ...state,
        active: !state.active,
      });
    }
  }

  return (
    <>
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
              <div className={styles.filter_btn_wrapper}>
                <button
                  type="button"
                  className={styles.filter_button}
                  onClick={() =>
                    setIsOpen((prevState) => ({
                      ...prevState,
                      buy: !prevState.buy,
                    }))
                  }
                >
                  Sotib olish
                  <ArrowBackIosNewIcon className={styles.icon} />
                </button>
                {isOpen.buy ? <FilterMenu active={isOpen.buy} /> : null}
              </div>
              <div className={styles.filter_btn_wrapper}>
                <button
                  type="button"
                  className={styles.filter_button}
                  onClick={() =>
                    setIsOpen((prevState) => ({
                      ...prevState,
                      filter1: !prevState.filter1,
                    }))
                  }
                >
                  Filter
                  <img
                    src={filterImage.src}
                    alt="filter black icon"
                    className={styles.icon}
                  />
                </button>
              </div>
            </>
          )}

          {product ||
            (community && (
              <div className={styles.filter_btn_wrapper}>
                <button
                  type="button"
                  className={styles.filter_button}
                  onClick={() =>
                    setIsOpen((prevState) => ({
                      ...prevState,
                      filter2: !prevState.filter2,
                    }))
                  }
                >
                  Saralash
                  <img
                    src={filterImage.src}
                    alt="filter black icon"
                    className={styles.icon}
                  />
                </button>
                {isOpen ? <FilterMenu active={isOpen.filter2} /> : null}
              </div>
            ))}

          {article && (
            <div className={styles.filter_btn_wrapper}>
              <button
                type="button"
                className={styles.filter_button}
                onClick={() =>
                  setIsOpen((prevState) => ({
                    ...prevState,
                    filter2: !prevState.filter2,
                  }))
                }
              >
                Saralash
                <img
                  src={filterImage.src}
                  alt="filter black icon"
                  className={styles.icon}
                />
              </button>
              {isOpen.filter2 ? <FilterMenu active={isOpen.filter2} /> : null}
            </div>
          )}

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
            >
              Mahsulot qo’shish
            </button>
          )}

          {about && (
            <button
              type="button"
              className={styles.add_button}
              onClick={handleClick}
            >
              Biz bilan bog’laning
            </button>
          )}
        </div>
      </div>
      {product && <FilterSection active={isOpen.filter1} />}
    </>
  );
};

export default SecondNavbar;
