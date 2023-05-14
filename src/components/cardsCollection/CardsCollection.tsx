import { cardTypes, questionTypes } from "@/data/interfaces";
import Card from "./components/card/Card";
import React from "react";
import Pagination from "@mui/material/Pagination";
import CommunityCard from "./components/communityCard/CommunityCard";

import styles from "./cardscollection.module.scss";
import FilterSection from "../filterSection/FilterSection";

const CardsCollection = ({
  data,
  community = false,
  account = false,
  product = false,
}: {
  data: cardTypes[];
  community?: boolean;
  account?: boolean;
  market?: boolean;
  product?: boolean;
}) => {
  console.log(product);

  return (
    <div
      className={styles.collections}
      data-account={account}
      data-community={community}
    >
      <div className={styles.cards_grid}>
        {data.map((item: cardTypes, index: number) =>
          community ? (
            <CommunityCard data={item} key={index} />
          ) : (
            <Card item={item} key={index} />
          )
        )}
      </div>
      <FilterSection active={product} />
      <Pagination count={data.length} className={styles.pagination} />
    </div>
  );
};

export default CardsCollection;
