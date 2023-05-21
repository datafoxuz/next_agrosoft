import { InternalPage, SNavbar } from "@/components";
import { card } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { useRouter } from "next/router";
import React from "react";

const index = ({ data }: { data: card }) => {
  const router = useRouter();

  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agromarket",
      url: "/market",
    },
    {
      title: `${router.query.product}`,
      url: `/market/${router.query.product}`,
    },
    {
      title: `${data?.title}`,
      url: `/market/${router.query.product}/${data?.slug}`,
    },
  ];

  return (
    <SEO metaTitle={`${data?.seo?.title ? data?.seo?.title : data?.title}`}>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage data={data} />
    </SEO>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: { card: string };
}) {
  try {
    const { data } = await fetchData(`/marketplace/product/${params.card}`);

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: undefined, // Set article to undefined in case of an error
      },
    };
  }
}

export default index;
