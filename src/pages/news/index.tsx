import { ArticlesApiResponse, data } from "@/data/interfaces";
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

const index = ({ articles }: { articles: ArticlesApiResponse }) => {
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
  if(!articles.success) return (
    <ErrorPage />
  );
  return (
    <SEO metaTitle={articles.data.seo.title} metaDescription={articles.data.seo.description} metaKeywords={articles.data.seo.keyword}>
      <SNavbar siteWay={siteWay} title="Yangiliklar" filter article />
      {articles.data.articles.length ? (
        <Collections data={articles.data.articles} 
        meta={{
            currentPage: articles.data.paginator.current_page,
            pageCount: articles.data.paginator.pages_count,
            perPage: articles.data.paginator.per_page,
            totalCount: articles.data.paginator.total_count,
         }} />
      ) : (
        <NotFound />
      )}
    </SEO>
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
