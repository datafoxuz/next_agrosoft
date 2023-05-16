import React from "react";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";

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

const Home = ({ articles }: { articles: [] }) => {
  return (
    <SEO>
      <div className={styles.main}>
        <Hero />
        <TopCards />
        <About />
        <Articles />
        <Community />
        <Diseases />
        <Market />
        <News />
      </div>
    </SEO>
  );
};

export async function getServerSideProps() {
  try {
    const articlesData = await request("/site/articles/get-latest-articles");
    return {
      props: {
        articles: articlesData || null,
      },
    };
  } catch (error) {
    return {
      props: {
        articles: null,
      },
    };
  }
}

export default Home;
