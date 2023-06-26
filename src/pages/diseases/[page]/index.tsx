import { InternalPage, SNavbar } from "@/components";
import { card, responseData } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { request } from "@/lib/request";
import ErrorPage from "@/pages/_error";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React from "react";

const index = ({ disease }: { disease: responseData }) => {
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
      title: `${disease?.data?.title}`,
      url: `/diseases/${router.query.page}`,
    },
  ];

  return disease.status === 200 ? (
    <SEO
      metaTitle={`${
        disease?.data.seo?.title ? disease?.data.seo?.title : disease.data.title
      }`}
    >
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage data={disease.data} />
    </SEO>
  ) : (
    <ErrorPage status={disease.status}/>
  );
};

export async function getServerSideProps({
  params,
  locale,
}: {
  params: { page: string };
  locale: string;
}) {
  const { data, response } = await request(`/deceases/${params.page}`);

  if (response.status !== 404) {
    return {
      props: {
        disease: { ...data, status: response.status },
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}

export default index;
