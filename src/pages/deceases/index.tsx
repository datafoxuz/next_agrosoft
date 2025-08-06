
import { DeceasesApiResponse } from "@/data/interfaces/deceases";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { ParsedUrlQuery } from "querystring";
import React from "react";


const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"))
const Collections = dynamic(() => import("@/components/cardsCollection/CardsCollection"))
const NotFound = dynamic(() => import("@/components/notFound/NotFound"))


const index = ({ deceases }: { deceases: DeceasesApiResponse }) => {
  const { t } = useTranslation("common");

  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.diseases"),
      url: "/deceases",
    },
  ];
  
  
  return (
    <SEO metaTitle={deceases.data.seo.title} metaDescription={deceases.data.seo.description} metaKeywords={deceases.data.seo.keyword}>
      <SNavbar
        siteWay={siteWay}
        title={`${t("main_topics.diseases")}`}
        filter
        article
      />

      {deceases.data?.deceases?.length ? (
        <Collections data={deceases.data.deceases} 
          meta={{
                  currentPage: deceases.data.paginator.current_page,
                  pageCount: deceases.data.paginator.pages_count,
                  perPage: deceases.data.paginator.per_page,
                  totalCount: deceases.data.paginator.total_count,
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
  const search = query.search || "";
  let deceasesData;

  if (search.length) {
    deceasesData = await request(`/deceases/get-deceases?search=${search}`, "GET", null, false, locale);
  } else {
    deceasesData = await request(
      `/deceases/get-deceases?page=${page}&per_page=10`, "GET", null, false, locale
    );
  }

  return {
    props: {
      deceases: { ...deceasesData.data, status: deceasesData.response.status },
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
