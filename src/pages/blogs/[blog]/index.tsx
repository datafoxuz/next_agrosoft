import { InternalPage, SNavbar } from "@/components";
import { responseData, sitewayProps } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import ErrorPage from "@/pages/_error";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const index = ({ blog }: { blog: responseData }) => {
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
      title: `${blog?.data?.title}`,
      url: `/blogs/${blog?.data?.slug}`,
    },
  ];

  

  return blog.status === 200 ? (
    <SEO
      metaTitle={`${
        blog?.data?.seo?.title ? blog.data.seo?.title : blog?.data?.title
      }`}
    >
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage data={blog.data} />
    </SEO>
  ) : (
    <ErrorPage status={blog.status} />
  );
};

export async function getServerSideProps({
  params,
  locale,
}: {
  params: { blog: string };
  locale: string;
}) {
  const { data, response } = await request(`/blog/${params.blog}`);

  if (response.status !== 404) {
    return {
      props: {
        blog: { ...data, status: response.status },
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
