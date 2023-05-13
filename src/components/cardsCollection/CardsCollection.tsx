import { cardTypes } from "@/data/interfaces";
import Card from "./components/card/Card";
import React from "react";
import Pagination from "@mui/material/Pagination";
import CommunityCard from "./components/communityCard/CommunityCard";
import SortDrawer from "../sortDrawer/SortDrawer";

import styles from "./cardscollection.module.scss";
import SearchIcon from "@mui/icons-material/Search";

const CardsCollection = ({
  data,
  community = false,
  account = false,
}: {
  data: cardTypes[];
  community?: boolean;
  account?: boolean;
}) => {
  return (
    <div
      className={styles.collections}
      data-account={account}
      data-community={community}
    >
      <div className={styles.top_section}>
        <h3 className={styles.title}>Agro Products</h3>

        <div className={styles.buttons}>
          <button>
            <SearchIcon className={styles.icon} />
          </button>
          <SortDrawer />
        </div>
      </div>
      <div className={styles.cards_grid}>
        {data.map((item: cardTypes, index: number) =>
          community ? (
            <CommunityCard data={item} key={index} />
          ) : (
            <Card item={item} key={index} />
          )
        )}
      </div>
      <Pagination count={data.length} className={styles.pagination} />
    </div>
  );
};

export default CardsCollection;
