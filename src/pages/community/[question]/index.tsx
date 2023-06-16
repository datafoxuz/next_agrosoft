import { InternalPage, SNavbar } from "@/components";
import { card } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React from "react";

const index = ({ question }: { question: card }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.community"),
      url: "/community",
    },
    {
      title: `${router.query.question}`,
      url: `/community/${router.query.question}`,
    },
  ];

  return (
    <SEO metaTitle={`${router.query.question}`}>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage questions data={question} />
    </SEO>
  );
};

export async function getServerSideProps({
  params,
  locale,
}: {
  params: { question: string };
  locale: string;
}) {
  const { data } = await fetchData(`/community/${params.question}`);
  return {
    props: {
      question: data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
