import { card, meta } from "@/data/interfaces";
import Card from "./components/card/Card";
import React, { ChangeEvent, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import CommunityCard from "./components/communityCard/CommunityCard";
import { useRouter } from "next/router";

import styles from "./cardscollection.module.scss";
import FilterSection from "../filterSection/FilterSection";

const CardsCollection = ({
  data,
  meta,
  community = false,
  account = "",
  product = false,
  similar = false

}: {
  data: any[];
  meta?: meta;
  community?: boolean;
  account?: string;
  market?: boolean;
  product?: boolean;
  similar?: boolean
}) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const currentPageValue = router.query.page ? Number(router.query.page) : 1;
    setCurrentPage(currentPageValue);
  }, [router.query.page]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    router.push(`?page=${value}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  return (
    <div
      className={styles.collections}
      data-account={!account == false}
      data-community={community}
      data-similar={similar}
    >
      <div className={styles.cards_grid}>
        {data.map((item: card, index: number) =>
          community ? (
            <CommunityCard data={item} key={index} />
          ) : (
            <Card item={item} key={index} similar account={account} />
          )
        )}
      </div>
      {router.pathname.includes("/market") && (
        <FilterSection active={product} />
      )}

      {meta && (
        <Pagination
          count={meta.pageCount}
          page={meta.currentPage}
          className={styles.pagination}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default CardsCollection;
