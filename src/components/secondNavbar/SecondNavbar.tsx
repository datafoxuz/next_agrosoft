import { questionTypes, sitewayProps } from "@/data/interfaces";
import { FilterMenu } from "./components";
import React, { useState } from "react";
import SiteWay from "../siteWay/SiteWay";
import SortDrawer from "../sortDrawer/SortDrawer";
import Image from "next/image";
import { handleChange, handleClick, shortenString } from "./utils/navbarUtils";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {handleNavigate } from "@/utils/helperFunctions";

import styles from "./secondnavbar.module.scss";

import filterImage from "@/assets/icons/SecondNavbar/filter.svg";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

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
  create = false,
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
  create?: boolean;
}) => {
  const { data, status }: { data: any; status: string } = useSession();
  const { t } = useTranslation("common");
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
                  placeholder={`${t("second_navbar.big_inp_placeholder")}`}
                  className={styles.input}
                  value={searchVal}
                  onChange={(e) =>
                    handleChange(router, e.target.value, setSearchVal)
                  }
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
                    {t("second_navbar.sort_modal_2.title")}
                    <ArrowBackIosNewIcon className={styles.icon} />
                  </button>
                  {isOpen.buy ? <FilterMenu active={isOpen.buy} /> : null}
                </div>
                <div className={styles.filter_btn_wrapper}>
                  <button
                    type="button"
                    className={styles.filter_button}
                    onClick={() => handleClick(state, setState)}
                  >
                    {t("second_navbar.filter.title")}
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
                    {t("second_navbar.sort_modal.title")}
                    <Image
                      src={filterImage.src}
                      alt="filter black icon"
                      className={styles.icon}
                      width={18}
                      height={18}
                    />
                  </button>
                  {isOpen.filter2 ? (
                    <FilterMenu active={isOpen.filter2} />
                  ) : null}
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
                  {t("second_navbar.sort_modal.title")}
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
                onClick={() => handleNavigate(status, "/community/create", router)}
              >
                {t("buttons.write_question")}
              </button>
            )}

            {market && (
              <button
                type="button"
                className={styles.add_button}
                onClick={() => handleClick(state, setState)}
              >
                {t("buttons.add_product")}
              </button>
            )}

            {about && (
              <button
                type="button"
                className={styles.add_button}
                onClick={() => handleClick(state, setState)}
              >
                {t("buttons.contact")}
              </button>
            )}
          </div>
        </div>

        {!innerPage && !about && !account && !create && (
          <div className={styles.hidden_section}>
            <div className={styles.top_section}>
              <h3 className={styles.title}>{title}</h3>

              <div className={styles.buttons}>
                {community && (
                  <button>
                    <RateReviewIcon
                      className={styles.icon}
                      onClick={() => router.push("/community/create")}
                    />
                  </button>
                )}

                {market && (
                  <button>
                    <AddBoxIcon
                      className={styles.icon}
                      onClick={() => handleClick(state, setState)}
                    />
                  </button>
                )}

                {product && (
                  <button>
                    <FilterListIcon
                      className={styles.icon}
                      onClick={() => handleClick(state, setState)}
                    />
                  </button>
                )}

                <SortDrawer />
              </div>
            </div>

            {!create && (
              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  placeholder={`${t("second_navbar.small_inp_placeholder")}`}
                  className={styles.input}
                  value={searchVal}
                  onChange={(e) =>
                    handleChange(router, e.target.value, setSearchVal)
                  }
                />

                <SearchIcon className={styles.icon} />
              </div>
            )}
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
