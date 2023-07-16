import { data } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import { useTranslation } from "next-i18next";
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

const index = ({ categories }: { categories: data }) => {
  const { t } = useTranslation("common");

  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.market"),
      url: "/market",
    },
  ];


  return categories.status === 200 ? (
    <SEO metaTitle={categories.seo.title} metaDescription={categories.seo.descriptions} metaKeywords={categories.seo.keyword}>
      <SNavbar
        siteWay={siteWay}
        title={`${t("main_topics.market")}`}
        filter
        market
      />

      {categories.data.length ? (
        <Collections data={categories.data} meta={categories.meta} market />
      ) : (
        <NotFound />
      )}
    </SEO>
  ) : (
    <ErrorPage status={categories.status} />
  );
};

export async function getServerSideProps({
  query,
  locale,
}: {
  query: ParsedUrlQuery;
  locale: string;
}) {
  const search = query.search || "";

  let categoriesData;

  if (search.length) {
    categoriesData = await request(`/marketplace-search?q=${search}`, "GET", null, false, locale);
  } else {
    categoriesData = await request(`/marketplace/categories`, "GET", null, false, locale);
  }

  return {
    props: {
      categories: {
        ...categoriesData.data,
        status: categoriesData.response.status,
      },
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
