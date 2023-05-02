import { cardTypes } from "@/data";
import Card from "./components/card/Card";
import React from "react";
import Pagination from "@mui/material/Pagination";

import styles from "./cardscollection.module.scss";

const CardsCollection = ({ data }: { data: cardTypes[] }) => {
  return (
    <div className={styles.collections}>
      <div className={styles.cards_grid}>
        {data.map((item: cardTypes, index: number) => (
          <Card item={item} key={index} />
        ))}
      </div>
      <Pagination count={data.length} className={styles.pagination} />
    </div>
  );
};

export default CardsCollection;
