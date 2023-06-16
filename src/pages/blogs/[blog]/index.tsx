import { InternalPage, SNavbar } from "@/components";
import { card, data, sitewayProps } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const index = ({ blog }: { blog: card }) => {
  const { t } = useTranslation("common");
  const siteWay: sitewayProps[] = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.blogs"),
      url: "/blogs",
    },
    {
      title: `${blog.title}`,
      url: `/blogs/${blog.slug}`,
    },
  ];

  return (
    <SEO metaTitle={`${blog.seo?.title ? blog.seo?.title : blog.title}`}>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage data={blog} />
    </SEO>
  );
};

export async function getServerSideProps({
  params,
  locale,
}: {
  params: { blog: string };
  locale: string;
}) {
  const { data } = await fetchData(`/blog/${params.blog}`);
  return {
    props: {
      blog: data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
