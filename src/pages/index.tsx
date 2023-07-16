import React from "react";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import Head from "next/head";
import { useRouter } from "next/router";

import { data } from "@/data/interfaces";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Script from "next/script";

const About = dynamic(() => import("@/components/main/about/About"));
const Articles = dynamic(() => import("@/components/main/articles/Articles"));
const Community = dynamic(
  () => import("@/components/main/community/Community")
);
const Diseases = dynamic(() => import("@/components/main/diseases/Diseases"));
const Hero = dynamic(() => import("@/components/main/hero/Hero"));
const Market = dynamic(() => import("@/components/main/market/Market"));
const News = dynamic(() => import("@/components/main/news/News"));
const TopCards = dynamic(() => import("@/components/main/topCards/TopCards"));

import styles from "@/styles/home.module.scss";

const Home = ({
  blogs,
  diseases,
  news,
  communities,
  settings
}: {
  blogs: data;
  diseases: data;
  news: data;
  communities: data;
  settings: any
}) => {
  const { locale } = useRouter();

  return (
    <SEO metaTitle={locale ? settings.data[5].value[locale] : ""}
      metaDescription={locale ? settings.data[6].value[locale] : ""}
      author={locale ? settings.data[2].value[locale] : ""}
      metaKeywords={locale ? settings.data[7].value[locale] : ""}
    >
      <Head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} strategy="afterInteractive" />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `}
        </Script>

        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AgroSoft",
              "url": "https://agrosoft.uz",
              "sameAs": [
                "https://www.facebook.com/agrosoftuz",
                "https://www.t.me/agrosoftuz",
                "https://www.instagram.com/agrosoftuz",
                "https://www.linkedin.com/in/agrosoftuz/",
                "https://www.tumblr.com/agrosoftuz",
                "https://medium.com/@agrosoftuz"
              ]
            }
          `}
        </Script>
      </Head>

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
  const blogsData = await request("/blogs/get-latest-blogs", "GET", null, false, locale);
  const diseasesData = await request("/deceases/get-popular-deceases", "GET", null, false, locale);
  const newsData = await request("/articles/get-latest-articles", "GET", null, false, locale);
  const communitiesData = await request("/community/latest-problems", "GET", null, false, locale);
  const settingsData = await request("/settings", "GET", null, false, locale)

  return {
    props: {
      blogs: { ...blogsData.data, status: blogsData.response.status },
      diseases: { ...diseasesData.data, status: diseasesData.response.status },
      news: { ...newsData.data, status: newsData.response.status },
      communities: {
        ...communitiesData.data,
        status: communitiesData.response.status,
      },
      settings: settingsData.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Home;
