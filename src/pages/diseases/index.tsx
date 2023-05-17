import { Collections, SNavbar } from "@/components";
import { card } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { clearCachedData, fetchCachedData } from "@/lib/fetchData";
import { ParsedUrlQuery } from "querystring";
import React from "react";

const index = ({ diseasess }: { diseasess: card[] }) => {
  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agro Kasalliklar",
      url: "/diseases",
    },
  ];

  return (
    <SEO metaTitle="Diseases">
      <SNavbar siteWay={siteWay} title="Agro Kasalliklar" filter article />
      <Collections data={diseasess} />
    </SEO>
  );
};

export async function getServerSideProps({ query }: { query: ParsedUrlQuery }) {
  const page = query.page || 1;
  const diseasesData = await fetchCachedData(`/deceases/get-popular-deceases`);

  clearCachedData();

  return {
    props: {
      diseasess: diseasesData,
    },
  };
}

export default index;
