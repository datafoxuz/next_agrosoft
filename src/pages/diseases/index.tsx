import { Collections, NotFound, SNavbar } from "@/components";
import FindError from "@/components/findError/FindError";
import { data } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import ErrorPage from "../_error";

const index = ({ diseasess }: { diseasess: data }) => {
  const { t } = useTranslation("common");

  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.diseases"),
      url: "/diseases",
    },
  ];

  return diseasess.status === 200 ? (
    <SEO metaTitle={`${t("main_topics.diseases")} - AgroSoft`}>
      <SNavbar
        siteWay={siteWay}
        title={`${t("main_topics.diseases")}`}
        filter
        article
      />

      {diseasess.data?.length ? (
        <Collections data={diseasess.data} meta={diseasess.meta} />
      ) : (
        <NotFound />
      )}
    </SEO>
  ) : (
    <ErrorPage status={diseasess.status}/>
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
  let diseasesData;

  if (search.length) {
    diseasesData = await request(`/decease-search?q=${search}`);
  } else {
    diseasesData = await request(
      `/deceases/get-deceases?page=${page}&per_page=10`
    );
  }

  return {
    props: {
      diseasess: { ...diseasesData.data, status: diseasesData.response.status },
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
