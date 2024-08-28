import fetchuserProfileInfo from "@/components/service/fetchProfileInfo";
import OnBoardingTabs from "@/components/common-onboarding-form/OnBoardingTabs";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Onboard() {
  const user = await currentUser();
  const profileInfo = await fetchuserProfileInfo(
   user?.id
  );

  if(profileInfo?.length !== 0) redirect("/dashboard");
  if(!user) redirect("/sign-up");

  return (
    <div className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 mt-40 mb-20">
      <div className="max-w-7xl w-full">
        <OnBoardingTabs />
      </div>
    </div>
  );
}
