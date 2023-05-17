import { Collections, SNavbar } from "@/components";
import React from "react";
import SEO from "@/layouts/seo/seo";
import { clearCachedData, fetchCachedData } from "@/lib/fetchData";
import { card, siteWayTypes } from "@/data/interfaces";
import { ParsedUrlQuery } from "querystring";

import styles from "./articles.module.scss";

const siteWay: siteWayTypes[] = [
  {
    title: "Bosh sahifa",
    url: "/",
  },
  {
    title: "Agro maqolalar",
    url: "/articles",
  },
];

const index = ({ articles }: { articles: card[] }) => {
  return (
    <SEO metaTitle="Articles">
      <div className={styles.articles}>
        <SNavbar siteWay={siteWay} title="Agro maqolalar" filter article />
        <Collections data={articles} />
      </div>
    </SEO>
  );
};

export async function getServerSideProps({ query }: { query: ParsedUrlQuery }) {
  const page = query.page || 1;
  const articlesData = await fetchCachedData(
    `/articles/articles-with-pagination?page=${page}&per_page=5`
  );

  clearCachedData();

  return {
    props: {
      articles: articlesData,
    },
  };
}

export default index;
