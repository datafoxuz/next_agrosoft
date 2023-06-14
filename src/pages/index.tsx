import React from "react";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
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
  const blogsData = await fetchData("/blogs/get-latest-blogs");
  const diseasesData = await fetchData("/deceases/get-popular-deceases");
  const newsData = await fetchData("/articles/get-latest-articles");
  const communitiesData = await fetchData("/community/latest-problems");

  return {
    props: {
      blogs: blogsData,
      diseases: diseasesData,
      news: newsData,
      communities: communitiesData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Home;
