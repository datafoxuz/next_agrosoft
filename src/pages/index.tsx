import React from "react";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";

import { data } from "@/data/interfaces";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import {
  About,
  Articles,
  Community,
  Diseases,
  Hero,
  Market,
  News,
  TopCards,
} from "@/components/main";

import styles from "@/styles/home.module.scss";

const Home = ({
  blogs,
  diseases,
  news,
  communities,
}: {
  blogs: data;
  diseases: data;
  news: data;
  communities: data;
}) => {
  return (
    <SEO>
      <div className={styles.main}>
        <Hero />
        <TopCards />
        <About />
        <Articles data={blogs} />
        <Community data={communities} />
        <Diseases data={diseases} />
        <Market />
        <News data={news} />
      </div>
    </SEO>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  const blogsData = await request("/blogs/get-latest-blogs");
  const diseasesData = await request("/deceases/get-popular-deceases");
  const newsData = await request("/articles/get-latest-articles");
  const communitiesData = await request("/community/latest-problems");

  return {
    props: {
      blogs: { ...blogsData.data, status: blogsData.response.status },
      diseases: { ...diseasesData.data, status: diseasesData.response.status },
      news: { ...newsData.data, status: newsData.response.status },
      communities: {
        ...communitiesData.data,
        status: communitiesData.response.status,
      },
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Home;
