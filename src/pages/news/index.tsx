import { Collections, SNavbar } from "@/components";
import { card, data } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { searchDatas } from "@/lib/searchData";
import { ParsedUrlQuery } from "querystring";
import React from "react";

const index = ({ articles }: { articles: data }) => {
  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Yangiliklar",
      url: "/news",
    },
  ];

  return (
    <SEO metaTitle="News - AgroSoft">
      <SNavbar siteWay={siteWay} title="Yangiliklar" filter article />
      <Collections data={articles.data} meta={articles.meta} />
    </SEO>
  );
};

export async function getServerSideProps({ query }: { query: ParsedUrlQuery }) {
  const page = query.page || 1;
  const searchVal = query.search || "";
  let articlesData;
  if (searchVal.length) {
    articlesData = await searchDatas(`/articles-search?q=${searchVal}`);
  } else {
    articlesData = await fetchData(
      `/articles/articles-with-pagination?page=${page}&per_page=5`
    );
  }

  return {
    props: {
      articles: articlesData,
    },
  };
}

export default index;
