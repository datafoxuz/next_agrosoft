import { NewPassword } from "@/components/auth";
import AuthLayout from "@/layouts/auth/layout";
import SEO from "@/layouts/seo/seo";
import React from "react";

const index = () => {
  return (
    <SEO metaTitle="Set new password">
      <AuthLayout>
        <NewPassword />
      </AuthLayout>
    </SEO>
  );
};

export default index;
