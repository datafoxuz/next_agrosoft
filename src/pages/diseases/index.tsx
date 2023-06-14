import { Collections, NotFound, SNavbar } from "@/components";
import { card, data } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { searchDatas } from "@/lib/searchData";
import { ParsedUrlQuery } from "querystring";
import React from "react";

const index = ({ diseasess }: { diseasess: data }) => {
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

      {diseasess.data.length ? (
        <Collections data={diseasess.data} meta={diseasess.meta} />
      ) : (
        <NotFound />
      )}
    </SEO>
  );
};

export async function getServerSideProps({ query }: { query: ParsedUrlQuery }) {
  const page = query.page || 1;
  const search = query.search || "";
  let diseasesData;

  if (search.length) {
    diseasesData = await searchDatas(`/decease-search?q=${search}`);
  } else {
    diseasesData = await fetchData(
      `/deceases/get-deceases?page=${page}&per_page=10`
    );
  }

  return {
    props: {
      diseasess: diseasesData,
    },
  };
}

export default index;
