import { AddProduct, Collections, NotFound, SNavbar } from "@/components";
import { data, questionTypes } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { searchDatas } from "@/lib/searchData";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";

const index = ({ categories }: { categories: data }) => {
  const [market, setMarket] = useState<questionTypes>({
    active: false,
  });

  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agromarket",
      url: "/market",
    },
  ];

  return (
    <SEO metaTitle="Agromarket">
      <SNavbar
        siteWay={siteWay}
        title="Agromarket"
        filter
        market
        state={market}
        setState={setMarket}
      />

      {market.active ? (
        <AddProduct state={market} setState={setMarket} />
      ) : categories.data.length ? (
        <Collections data={categories.data} meta={categories.meta} market />
      ) : (
        <NotFound />
      )}
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
  const search = query.search || "";

  let categoriesData;

  if (search.length) {
    categoriesData = await searchDatas(`/marketplace-search?q=${search}`);
  } else {
    categoriesData = await fetchData(`/marketplace/categories`);
  }

  return {
    props: {
      categories: categoriesData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
