import { LoginModal } from "@/components/auth";
import AuthLayout from "@/layouts/auth/layout";
import React from "react";

const index = () => {
  return (
    <AuthLayout>
      <LoginModal />
    </AuthLayout>
  );
};

export default index;
