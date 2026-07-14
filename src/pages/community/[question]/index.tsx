import { CommunityApiResponse, CommunityDetailApiResponse, communityProblemDetail, communityProblemInfo } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import ErrorPage from "@/pages/_error";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"))
const CommunityInternalPage = dynamic(() => import("@/components/internalPage/CommunityInternalPage"));


const index = ({ problem }: { problem: CommunityDetailApiResponse }) => {
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

  // if(!problemResponse.success) return (<ErrorPage  />);
  return (
    <SEO metaTitle={problem.data.problem.title} metaDescription={problem.data.problem?.body} >
      <SNavbar siteWay={siteWay} innerPage />
      <CommunityInternalPage problem={problem.data.problem} />

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

  const { data, response } = await request(`/community/${params.question}`, "GET", null, { locale });

  if (response.status !== 404) {
    return {
      props: {
        problem: { ...data, status: response.status},
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } else{
      return {
            notFound: true,
        };
  }
  
}

export default index;
