import { Collections, NotFound, SNavbar } from "@/components";
import React from "react";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { data, siteWayTypes } from "@/data/interfaces";
import { ParsedUrlQuery } from "querystring";

import styles from "./articles.module.scss";
import { searchDatas } from "@/lib/searchData";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const index = ({ blogs }: { blogs: data }) => {
  const siteWay: siteWayTypes[] = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agro maqolalar",
      url: "/blogs",
    },
  ];

  return (
    <SEO metaTitle="Blogs - AgroSoft">
      <div className={styles.articles}>
        <SNavbar siteWay={siteWay} title="Agro maqolalar" filter article />
        {blogs?.data?.length ? (
          <Collections data={blogs.data} meta={blogs.meta} />
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
    blogsData = await searchDatas(`/blog-search?q=${search}`);
  } else {
    blogsData = await fetchData(
      `/blogs/blogs-with-pagination?page=${page}&per_page=10`
    );
  }

  return {
    props: {
      blogs: blogsData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
