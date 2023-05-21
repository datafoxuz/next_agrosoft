import { Collections, SNavbar } from "@/components";
import React from "react";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { data, siteWayTypes } from "@/data/interfaces";
import { ParsedUrlQuery } from "querystring";

import styles from "./articles.module.scss";

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
        <Collections data={blogs.data} meta={blogs.meta} />
      </div>
    </SEO>
  );
};

export async function getServerSideProps({ query }: { query: ParsedUrlQuery }) {
  const page = query.page || 1;
  const blogsData = await fetchData(
    `/blogs/blogs-with-pagination?page=${page}&per_page=5`
  );

  return {
    props: {
      blogs: blogsData,
    },
  };
}

export default index;
