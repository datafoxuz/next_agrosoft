import { card, deceaseItem, meta } from "@/data/interfaces";
import React, { ChangeEvent, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
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
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default DeceasesCollection;
