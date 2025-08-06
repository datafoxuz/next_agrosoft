import React from "react";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import Head from "next/head";
import { useRouter } from "next/router";
import { ArticlesApiResponse, BlogsApiResponse, CommunityApiResponse, data, DeceasesApiResponse } from "@/data/interfaces";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Script from "next/script";

const About = dynamic(() => import("@/components/main/about/About"));
const Articles = dynamic(() => import("@/components/main/articles/Articles"));
const Community = dynamic(() => import("@/components/main/community/Community"));
const Deceases = dynamic(() => import("@/components/main/deceases/Deceases"));
const Hero = dynamic(() => import("@/components/main/hero/Hero"));
const Market = dynamic(() => import("@/components/main/market/Market"));
const News = dynamic(() => import("@/components/main/news/News"));
const TopCards = dynamic(() => import("@/components/main/topCards/TopCards"));

import styles from "@/styles/home.module.scss";

interface SettingsItem {
  name: string;
  value: Record<string, string>;
}

interface HomeProps {
  blogs: BlogsApiResponse;
  deceases: DeceasesApiResponse;
  news: ArticlesApiResponse;
  communities: CommunityApiResponse;
  settings: {
    data: {
      settings: SettingsItem[];
    };
  };
}

const Home = ({ blogs, deceases, news, communities, settings }: HomeProps) => {
  const { locale } = useRouter();
  // Cache settings lookups
  const settingsMap = React.useMemo(() => {
    const map: Record<string, Record<string, string>> = {};
    settings.data.settings.forEach((item) => {
      map[item.name] = item.value;
    });
    return map;
  }, [settings]);

  const metaTitle = locale && settingsMap["metaTitle"] ? settingsMap["metaTitle"][locale] : "";
  const metaDescription = locale && settingsMap["metaDescription"] ? settingsMap["metaDescription"][locale] : "";
  const author = locale && settingsMap["author"] ? settingsMap["author"][locale] : "";
  const metaKeywords = locale && settingsMap["metaKeywords"] ? settingsMap["metaKeywords"][locale] : "";

  return (
    <SEO
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      author={author}
      metaKeywords={metaKeywords}
    >
      <Head>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            strategy="afterInteractive"
          />
        )}

        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
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
        )}

        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
        >
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
        <Articles blogs={blogs} />
        <Community data={communities} />
        <Deceases data={deceases} />
        <Market />
        <News data={news} />
      </div>
    </SEO>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  try {
    const [blogsData, deceasesData, newsData, communitiesData, settingsData] = await Promise.all([
      request("/blogs/get-latest-blogs", "GET", null, false, locale),
      request("/deceases/get-popular-deceases", "GET", null, false, locale),
      request("/articles/get-latest-articles", "GET", null, false, locale),
      request("/community/latest-problems", "GET", null, false, locale),
      request("/settings", "GET", null, false, locale),
    ]);

    return {
      props: {
        blogs: { ...blogsData.data, status: blogsData.response.status },
        deceases: { ...deceasesData.data, status: deceasesData.response.status },
        news: { ...newsData.data, status: newsData.response.status },
        communities: {...communitiesData.data, status: communitiesData.response.status},
        settings: settingsData.data,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    // Optionally log error
    return {
      props: {
        blogs: {},
        deceases: {},
        news: {},
        communities: {},
        settings: { data: { settings: [] } },
        ...(await serverSideTranslations(locale, ["common"])),
        error: 'Failed to fetch data',
      },
    };
  }
}

export default Home;
