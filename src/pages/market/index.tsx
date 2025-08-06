import { data } from "@/data/interfaces";
import { MarketplaceCategoryApiResponse } from "@/data/interfaces/marketplace";
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

const index = ({ categories }: { categories: MarketplaceCategoryApiResponse }) => {
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
  if(!categories.success) return (
    <ErrorPage/>
  );
  return (
    <SEO metaTitle={categories.data.seo.title} metaDescription={categories.data.seo.description} metaKeywords={categories.data.seo.keyword}>
      <SNavbar
        siteWay={siteWay}
        title={`${t("main_topics.market")}`}
        filter
        market
      />

      {categories.data.categories.length ? (
        <Collections 
          data={categories.data.categories} 
           meta={{
                      currentPage: categories.data.paginator.current_page,
                      pageCount: categories.data.paginator.pages_count,
                      perPage: categories.data.paginator.per_page,
                      totalCount: categories.data.paginator.total_count,
                    }}
          market />
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
  const search = query.search || "";

  let categoriesData;

  if (search.length) {
    categoriesData = await request(`/marketplace/categories?search=${search}`, "GET", null, false, locale);
  } else {
    categoriesData = await request(`/marketplace/categories`, "GET", null, false, locale);
  }

  return {
    props: {
      categories: {...categoriesData.data, status: categoriesData.response.status},
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
