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

const index = ({ article }: { article: responseData }) => {
  const {t} = useTranslation("common")
  const router = useRouter();
  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.news"),
      url: "/news",
    },
    {
      title: `${article?.data?.title}`,
      url: `/news/${article?.data?.slug}`,
    },
  ];


  return article.status === 200 ? (
    <SEO
      metaTitle={article.seo.title}
      metaDescription={article.seo.description}
      author={article.seo.author}
    >
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage data={article.data} similar={article.similar}/>
    </SEO>
  ) : (
    <ErrorPage status={article.status}/>
  );
};

export async function getServerSideProps({
  params,
  locale,
}: {
  params: { new: string };
  locale: string;
}) {
  const { data, response } = await request(`/articles/${params.new}/show`, "GET", null, false, locale);

  if (response.status !== 404) {
    return {
      props: {
        article: { ...data, status: response.status },
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
