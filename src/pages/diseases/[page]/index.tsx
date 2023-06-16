import { InternalPage, SNavbar } from "@/components";
import { card } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React from "react";

const index = ({ disease }: { disease: card }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.diseases"),
      url: "/diseases",
    },
    {
      title: `${disease.title}`,
      url: `/diseases/${router.query.page}`,
    },
  ];

  return (
    <SEO
      metaTitle={`${disease?.seo?.title ? disease?.seo?.title : disease.title}`}
    >
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage data={disease} />
    </SEO>
  );
};

export async function getServerSideProps({
  params,
  locale,
}: {
  params: { page: string };
  locale: string;
}) {
  const { data } = await fetchData(`/deceases/${params.page}`);

  return {
    props: {
      disease: data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
