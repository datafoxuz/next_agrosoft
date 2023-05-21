import React from "react";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";

import { card, data } from "@/data/interfaces";

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
}: {
  blogs: data;
  diseases: data;
  news: data;
}) => {
  return (
    <SEO>
      <div className={styles.main}>
        <Hero />
        <TopCards />
        <About />
        <Articles data={blogs} />
        <Community />
        <Diseases data={diseases} />
        <Market />
        <News data={news} />
      </div>
    </SEO>
  );
};

export async function getServerSideProps() {
  const blogsData = await fetchData("/blogs/get-latest-blogs");
  const diseasesData = await fetchData("/deceases/get-popular-deceases");
  const newsData = await fetchData("/articles/get-latest-articles");

  return {
    props: {
      blogs: blogsData,
      diseases: diseasesData,
      news: newsData,
    },
  };
}

export default Home;
