import React from "react";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ErrorPage from "../_error";
import dynamic from "next/dynamic";

import { siteWayTypes, BlogsApiResponse } from "@/data/interfaces";
import { ParsedUrlQuery } from "querystring";
import { useTranslation } from "next-i18next";

import styles from "./articles.module.scss";

const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"))
const Collections = dynamic(() => import("@/components/cardsCollection/CardsCollection"))
const NotFound = dynamic(() => import("@/components/notFound/NotFound"))



const index = ({ blogs }: { blogs: BlogsApiResponse }) => {
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

  if(!blogs.success) return (
    <ErrorPage />
  );

  return (
    <SEO metaTitle={`${blogs.data.seo.title}`} metaDescription={`${blogs.data.seo.description}`} metaKeywords={`${blogs.data.seo.keyword}`}>
      <div className={styles.articles}>
        <SNavbar
          siteWay={siteWay}
          title={`${t("main_topics.blogs")}`}
          filter
          article
        />
        {blogs?.data?.blogs?.length ? (
          <Collections 
          data={blogs.data.blogs} 
           meta={{
                      currentPage: blogs.data.paginator.current_page,
                      pageCount: blogs.data.paginator.pages_count,
                      perPage: blogs.data.paginator.per_page,
                      totalCount: blogs.data.paginator.total_count,
                    }}
           />
        ) : (
          <NotFound />
        )}
      </div>
    </SEO>
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
    blogsData = await request(`/blog-search?q=${search}`, "GET", null, false, locale);
  } else {
    blogsData = await request(
      `/blogs/blogs-with-pagination?page=${page}&per_page=10`, "GET", null, false, locale
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
