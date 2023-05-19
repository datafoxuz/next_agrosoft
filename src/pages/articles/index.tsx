import { Collections, SNavbar } from "@/components";
import React from "react";
import SEO from "@/layouts/seo/seo";
import { fetchCachedData } from "@/lib/fetchData";
import { data, siteWayTypes } from "@/data/interfaces";
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

const index = ({ articles }: { articles: data }) => {
  return (
    <SEO metaTitle="Articles">
      <div className={styles.articles}>
        <SNavbar siteWay={siteWay} title="Agro maqolalar" filter article />
        <Collections data={articles.data} meta={articles.meta} />
      </div>
    </SEO>
  );
};

export async function getServerSideProps({ query }: { query: ParsedUrlQuery }) {
  const page = query.page || 1;
  const articlesData = await fetchCachedData(
    `/articles/articles-with-pagination?page=${page}&per_page=2`
  );

  return {
    props: {
      articles: articlesData,
    },
  };
}

export default index;
