import { questionTypes, sitewayProps } from "@/data/interfaces";
import { FilterMenu } from "./components";
import React, { useState } from "react";
import SiteWay from "../siteWay/SiteWay";
import SortDrawer from "../sortDrawer/SortDrawer";
import Image from "next/image";

import styles from "./secondnavbar.module.scss";

import filterImage from "@/assets/icons/SecondNavbar/filter.svg";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

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
  account = false,
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
  account?: boolean;
}) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<{
    buy: boolean;
    filter1: boolean;
    filter2: boolean;
  }>({
    buy: false,
    filter1: false,
    filter2: false,
  });
  const [searchVal, setSearchVal] = useState<string>("");

  function handleClick() {
    if (setState && state) {
      setState({
        ...state,
        active: !state.active,
      });
    }
  }

  function shortenString(str: string | undefined, maxLength: number) {
    if (str) {
      if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
      } else {
        return str;
      }
    }
  }

  function handleChange(str: string) {
    setSearchVal(str);
    if (!router.query.page) {
      router.replace(`${router.pathname}?search=${str}`, undefined, {
        shallow: false,
      });
    } else {
      router.push(
        `${router.pathname}?page=${router.query.page}&search=${str}`,
        undefined,
        { shallow: false }
      );
    }
  }

  return (
    <>
      <div
        className={styles.s_navbar}
        data-type={innerPage}
        data-product={product}
      >
        <SiteWay siteWay={siteWay} product />
        <div className={styles.s_navbar_wrapper}>
          <div className={styles.title_wrapper}>
            <h3 className={styles.title} data-type={product}>
              {shortenString(title, 20)}
            </h3>
          </div>

          <div className={styles.filter_wrapper} data-type={product}>
            {filter && (
              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  placeholder="Kalit so’zni yozing"
                  className={styles.input}
                  value={searchVal}
                  onChange={(e) => handleChange(e.target.value)}
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
                    onClick={handleClick}
                  >
                    Filter
                    <Image
                      src={filterImage.src}
                      alt="filter black icon"
                      className={styles.icon}
                      width={18}
                      height={18}
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
                    <Image
                      src={filterImage.src}
                      alt="filter black icon"
                      className={styles.icon}
                      width={18}
                      height={18}
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
                  <Image
                    src={filterImage.src}
                    alt="filter black icon"
                    className={styles.icon}
                    width={18}
                    height={18}
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

        {!innerPage && !about && !account && (
          <div className={styles.hidden_section}>
            <div className={styles.top_section}>
              <h3 className={styles.title}>{title}</h3>

              <div className={styles.buttons}>
                {community && (
                  <button>
                    <RateReviewIcon
                      className={styles.icon}
                      onClick={() => handleClick()}
                    />
                  </button>
                )}

                {market && (
                  <button>
                    <AddBoxIcon
                      className={styles.icon}
                      onClick={() => handleClick()}
                    />
                  </button>
                )}

                {product && (
                  <button>
                    <FilterListIcon
                      className={styles.icon}
                      onClick={() => handleClick()}
                    />
                  </button>
                )}
                <SortDrawer />
              </div>
            </div>

            <div className={styles.input_wrapper}>
              <input
                type="text"
                placeholder="Qidirish"
                className={styles.input}
              />

              <SearchIcon className={styles.icon} />
            </div>
          </div>
        )}

        {account && (
          <div className={styles.hidden_section}>
            <div className={styles.top_section}>
              <h3 className={styles.title}>{title}</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SecondNavbar;
