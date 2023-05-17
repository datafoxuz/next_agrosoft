import React from "react";
import SEO from "@/layouts/seo/seo";
import { fetchCachedData } from "@/lib/fetchData";

import { card } from "@/data/interfaces";

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

const Home = ({ articles }: { articles: card[] }) => {
  return (
    <SEO>
      <div className={styles.main}>
        <Hero />
        <TopCards />
        <About />
        <Articles data={articles} />
        <Community />
        <Diseases />
        <Market />
        <News />
      </div>
    </SEO>
  );
};

export async function getServerSideProps() {
  const articlesData = await fetchCachedData("/articles/get-latest-articles");

  return {
    props: {
      articles: articlesData,
    },
  };
}

export default Home;
