import { InternalPage, SNavbar } from "@/components";
import { card, data } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchCachedData } from "@/lib/fetchData";
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
      title: "Agro maqolalar",
      url: "/articles",
    },
    {
      title: `${article.title}`,
      url: `/articles/${router.query.article}`,
    },
  ];

  return (
    <SEO metaTitle={`${router.query.article}`}>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage data={article} />
    </SEO>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: { article: string };
}) {
  const { data } = await fetchCachedData(`/article/${params.article}`);

  return {
    props: {
      article: data,
    },
  };
}

export default index;
