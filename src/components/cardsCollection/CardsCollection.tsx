import { cardTypes } from "@/data/interfaces";
import Card from "./components/card/Card";
import React from "react";
import Pagination from "@mui/material/Pagination";

import styles from "./cardscollection.module.scss";
import CommunityCard from "./components/communityCard/CommunityCard";

const CardsCollection = ({
  data,
  community = false,
}: {
  data: cardTypes[];
  community?: boolean;
}) => {
  return (
    <div className={styles.collections}>
      <div className={styles.cards_grid} data-community={community}>
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
