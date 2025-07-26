import { responseData, SingleBlogsApiResponse, sitewayProps } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import ErrorPage from "@/pages/_error";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import React from "react";

const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"))
const InternalPage = dynamic(() => import("@/components/internalPage/InternalPage"))

const index = ({ blog }: { blog: SingleBlogsApiResponse }) => {
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
      title: `${blog?.data?.blog.title}`,
      url: `/blogs/${blog?.data?.blog.slug}`,
    },
  ];
  if(!blog.success) return (<ErrorPage />);
  return (
    <SEO
      metaTitle={blog.data.blog.seo?.title}
      metaDescription={blog.data.blog.seo?.description}
      author={blog.data.blog.seo?.author}
    >
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage data={blog.data.blog} similar={blog.data.similar} type="blogs" />
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
  const { data, response } = await request(`/blogs/${params.blog}`, "GET", null, false, locale);

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
