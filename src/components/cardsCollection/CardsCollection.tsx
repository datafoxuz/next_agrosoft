import { card, meta } from "@/data/interfaces";
import Card, { cardTitle } from "./components/card/Card";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Link from "next/link";
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




  return (
    <div
      className={styles.collections}
      data-account={!account == false}
      data-community={community}
      data-similar={similar}
    >
      <div className={styles.cards_grid}>
        {data.filter((item: card) => cardTitle(item)).map((item: card, index: number) =>
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
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              href={item.page && item.page > 1 ? `${router.pathname.includes("[") ? router.asPath.split("?")[0] : router.pathname}?page=${item.page}` : (router.pathname.includes("[") ? router.asPath.split("?")[0] : router.pathname)}
              {...item}
            />
          )}
          />
      )}
    </div>
  );
};

export default CardsCollection;
