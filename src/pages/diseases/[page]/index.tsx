import { InternalPage, SNavbar } from "@/components";
import { card } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { useRouter } from "next/router";
import React from "react";

const index = ({ disease }: { disease: card }) => {
  const router = useRouter();

  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agro Kasalliklar",
      url: "/diseases",
    },
    {
      title: `${disease.title}`,
      url: `/diseases/${router.query.page}`,
    },
  ];

  return (
    <SEO
      metaTitle={`${disease?.seo?.title ? disease?.seo?.title : disease.title}`}
    >
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage data={disease} />
    </SEO>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: { page: string };
}) {
  try {
    const { data } = await fetchData(`/deceases/${params.page}`);

    return {
      props: {
        disease: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        disease: undefined, // Set diseases to undefined in case of an error
      },
    };
  }
}

export default index;
