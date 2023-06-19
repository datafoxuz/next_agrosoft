import { Collections, NotFound, SNavbar } from "@/components";
import React from "react";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { data, siteWayTypes } from "@/data/interfaces";
import { ParsedUrlQuery } from "querystring";
import { useTranslation } from "next-i18next";
import ErrorPage from "../_error";

import styles from "./articles.module.scss";

const index = ({ blogs }: { blogs: data }) => {
  const { t } = useTranslation("common");
  const siteWay: siteWayTypes[] = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.blogs"),
      url: "/blogs",
    },
  ];

  return blogs.status === 200 ? (
    <SEO metaTitle={`${t("main_topics.blogs")} - AgroSoft`}>
      <div className={styles.articles}>
        <SNavbar
          siteWay={siteWay}
          title={`${t("main_topics.blogs")}`}
          filter
          article
        />
        {blogs?.data?.length ? (
          <Collections data={blogs.data} meta={blogs.meta} />
        ) : (
          <NotFound />
        )}
      </div>
    </SEO>
  ) : (
    <ErrorPage />
  );
};

export async function getServerSideProps({
  query,
  locale,
}: {
  query: ParsedUrlQuery;
  locale: string;
}) {
  const page = query.page || 1;
  const search = query.search || "";
  let blogsData;

  if (search.length) {
    blogsData = await request(`/blog-search?q=${search}`);
  } else {
    blogsData = await request(
      `/blogs/blogs-with-pagination?page=${page}&per_page=10`
    );
  }

  return {
    props: {
      blogs: { ...blogsData.data, status: blogsData.response.status },
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
