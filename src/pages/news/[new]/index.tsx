import { InternalPage, SNavbar } from "@/components";
import { responseData } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import ErrorPage from "@/pages/_error";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React from "react";

const index = ({ article }: { article: responseData }) => {
  const router = useRouter();
  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Yangiliklar",
      url: "/news",
    },
    {
      title: `${article?.data?.title}`,
      url: `/news/${article?.data?.slug}`,
    },
  ];

  return article.status === 200 ? (
    <SEO
      metaTitle={`${
        article.data?.seo?.title ? article.data?.seo?.title : router.query.new
      }`}
    >
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage data={article.data} />
    </SEO>
  ) : (
    <ErrorPage />
  );
};

export async function getServerSideProps({
  params,
  locale,
}: {
  params: { new: string };
  locale: string;
}) {
  const { data, response } = await request(`/article/${params.new}`);

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
