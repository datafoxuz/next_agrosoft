import { responseData } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import ErrorPage from "@/pages/_error";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"))
const InternalPage = dynamic(() => import("@/components/internalPage/InternalPage"))


const index = ({ question }: { question: responseData }) => {
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



  return question.status === 200 ? (
    <SEO metaTitle={question.seo.title} metaDescription={question.seo.description} author={question.seo.author}>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage questions data={question.data} />
    </SEO>
  ) : (
    <ErrorPage status={question.status} />
  );
};

export async function getServerSideProps({
  params,
  locale,
}: {
  params: { question: string };
  locale: string;
}) {

  const { data, response } = await request(`/community/${params.question}`, "GET", null, false, locale);

  if (response.status !== 404) {
    return {
      props: {
        question: { ...data, status: response.status },
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
