import { InternalPage, SNavbar } from "@/components";
import { card, data, sitewayProps } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import React from "react";

const index = ({ blog }: { blog: card }) => {
  const siteWay: sitewayProps[] = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agro maqolalar",
      url: "/blogs",
    },
    {
      title: `${blog.title}`,
      url: `/blogs/${blog.slug}`,
    },
  ];

  return (
    <SEO metaTitle={`${blog.seo?.title ? blog.seo?.title : blog.title}`}>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage data={blog} />
    </SEO>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: { blog: string };
}) {
  try {
    const { data } = await fetchData(`/blog/${params.blog}`);

    return {
      props: {
        blog: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        blog: undefined, // Set article to undefined in case of an error
      },
    };
  }
}

export default index;
