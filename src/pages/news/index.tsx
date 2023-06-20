import { Collections, SNavbar } from "@/components";
import { data } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import ErrorPage from "../_error";

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

  return articles.status === 200 ? (
    <SEO metaTitle="News - AgroSoft">
      <SNavbar siteWay={siteWay} title="Yangiliklar" filter article />
      <Collections data={articles.data} meta={articles.meta} />
    </SEO>
  ) : (
    <ErrorPage status={articles.status}/>
  );
};

export async function getServerSideProps({
  query,
  locale,
}: {
  query: ParsedUrlQuery;
  locale: string;
}) {
  const page = query.page || 1;
  const searchVal = query.search || "";
  let articlesData;
  if (searchVal.length) {
    articlesData = await request(`/articles-search?q=${searchVal}`);
  } else {
    articlesData = await request(
      `/articles/articles-with-pagination?page=${page}&per_page=10`
    );
  }

  return {
    props: {
      articles: { ...articlesData.data, status: articlesData.response.status },
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
