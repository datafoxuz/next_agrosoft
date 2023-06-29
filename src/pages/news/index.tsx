import { data } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { ParsedUrlQuery } from "querystring";
import React from "react";

const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"));
const Collections = dynamic(
  () => import("@/components/cardsCollection/CardsCollection")
);
const NotFound = dynamic(() => import("@/components/notFound/NotFound"));
const ErrorPage = dynamic(() => import("../_error"));

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
      {articles.data.length ? (
        <Collections data={articles.data} meta={articles.meta} />
      ) : (
        <NotFound />
      )}
    </SEO>
  ) : (
    <ErrorPage status={articles.status} />
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
    articlesData = await request(`/articles-search?q=${searchVal}`, "GET", null, false, locale);
  } else {
    articlesData = await request(
      `/articles/articles-with-pagination?page=${page}&per_page=10`, "GET", null, false, locale
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
