import { AddProduct, Collections, SNavbar } from "@/components";
import { data, questionTypes } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
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
      ) : (
        <Collections data={categories.data} meta={categories.meta} market />
      )}
    </SEO>
  );
};

export async function getServerSideProps() {
  const categoriesData = await fetchData(`/marketplace/categories`);

  return {
    props: {
      categories: categoriesData,
    },
  };
}

export default index;
