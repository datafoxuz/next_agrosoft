import { InternalPage, SNavbar } from "@/components";
import { card } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { useRouter } from "next/router";
import React from "react";

const index = ({ question }: { question: card }) => {
  const router = useRouter();

  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agro jamiyat",
      url: "/community",
    },
    {
      title: `${router.query.question}`,
      url: `/community/${router.query.question}`,
    },
  ];

  return (
    <SEO metaTitle={`${router.query.question}`}>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage questions data={question} />
    </SEO>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: { question: string };
}) {
  try {
    const { data } = await fetchData(`/community/${params.question}`);

    return {
      props: {
        question: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        question: undefined, // Set article to undefined in case of an error
      },
    };
  }
}

export default index;
