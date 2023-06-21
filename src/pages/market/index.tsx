import { Collections, NotFound, SNavbar } from "@/components";
import { data, questionTypes } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import ErrorPage from "../_error";

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
    <SEO metaTitle={`${t("main_topics.market")}`}>
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
    <ErrorPage status={categories.status}/>
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
    categoriesData = await request(`/marketplace-search?q=${search}`);
  } else {
    categoriesData = await request(`/marketplace/categories`);
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
