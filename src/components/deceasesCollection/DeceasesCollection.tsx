import { card, deceaseItem, meta } from "@/data/interfaces";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./cardscollection.module.scss";
import FilterSection from "../filterSection/FilterSection";
import DeceaseCard from "./components/deceases/DeceaseCard";

const DeceasesCollection = ({
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
        {data.map((item: deceaseItem, index: number) =>
           (
            <DeceaseCard data={item} key={index} />
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

export default DeceasesCollection;
