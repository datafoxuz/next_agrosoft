import { InternalPage, SNavbar } from "@/components";
import { card } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React from "react";

const index = ({ article }: { article: card }) => {
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
      title: `${article.title}`,
      url: `/news/${article.slug}`,
    },
  ];

  return (
    <SEO
      metaTitle={`${
        article.seo?.title ? article.seo?.title : router.query.new
      }`}
    >
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage data={article} />
    </SEO>
  );
};

export async function getServerSideProps({
  params,
  locale,
}: {
  params: { new: string };
  locale: string;
}) {
  const { data } = await fetchData(`/article/${params.new}`);

  return {
    props: {
      article: data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
