import { getCurrent } from "@/features/auth/actions";
import { SingUpCard } from "@/features/auth/components/sing-up-card";
import { redirect } from "next/navigation";
import React from "react";

const SignUpPage = async () => {
  const user = await getCurrent();
  if (user) redirect("/");

  return <SingUpCard />;
};

export default SignUpPage;
