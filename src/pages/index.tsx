import React from "react";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import { useRouter } from "next/router";
import { ArticlesApiResponse, BlogsApiResponse, CommunityApiResponse, data, DeceasesApiResponse } from "@/data/interfaces";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";

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
    (settings?.data?.settings ?? []).forEach((item) => {
      map[item.name] = item.value;
    });
    return map;
  }, [settings]);

  const { t } = useTranslation("common");
  const pick = (key: string) =>
    (locale && settingsMap[key] ? settingsMap[key][locale] : "") || "";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AgroSoft",
      url: "https://agrosoft.uz",
      logo: "https://agrosoft.uz/og-image.jpg",
      email: "info@agrosoft.uz",
      sameAs: [
        "https://www.facebook.com/agrosoftuz",
        "https://t.me/agrosoftuz",
        "https://www.instagram.com/agrosoftuz",
        "https://www.linkedin.com/in/agrosoftuz/",
        "https://medium.com/@agrosoftuz",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "AgroSoft",
      url: `https://agrosoft.uz/${locale || "uz"}`,
      inLanguage: locale || "uz",
    },
  ];

  return (
    <SEO
      metaTitle={pick("metaTitle") || t("seo.home.title")}
      metaDescription={pick("metaDescription") || t("seo.home.description")}
      metaKeywords={pick("metaKeywords") || undefined}
      jsonLd={jsonLd}
    >
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
      request("/blogs/get-latest-blogs", "GET", null, { locale }),
      request("/deceases/get-popular-deceases", "GET", null, { locale }),
      request("/articles/get-latest-articles", "GET", null, { locale }),
      request("/community/latest-problems", "GET", null, { locale }),
      request("/settings", "GET", null, { locale }),
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
