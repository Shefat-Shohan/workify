"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import OnboardingForm from "./OnboardingForm";
import {
  candiateOnBoardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnBoardFormControls,
} from "@/data";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export default function OnBoardingTabs() {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  const router = useRouter();
  const currentAuthUser = useUser();
  const { user } = currentAuthUser;
  // get a track of which tab user in
  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  // validate if recruiter fill up the form
  const recruiterFormValidation = () => {
    return (
      recruiterFormData &&
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    );
  };
  // validate if candidate fill up the form
  const candidateFormValidation = () => {
    return (
      candidateFormData &&
      candidateFormData.name.trim() !== "" &&
      candidateFormData.currentCompanyName.trim() !== "" &&
      candidateFormData.currentCompanyRole.trim() !== "" &&
      candidateFormData.yearsOfExperience.trim() !== "" &&
      candidateFormData.skills.trim() !== "" &&
      candidateFormData.coverLetter.trim() !== ""
    );
  };
  // push recruiter form info to database
  const onRecruiterOnboardSubmit = async (e: FormDataEvent) => {
    e.preventDefault();
    const profileData = {
      recruiterInfo: recruiterFormData,
      role: "recruiter",
      userId: user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
      isPremiumUser: true,
    };
    const response = await fetch("https://66bf797c42533c4031464979.mockapi.io/workify/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    } else {
      router.push("/dashboard");
    }
  };
  // push candidate form info to database
  const onCandidateOnboardSubmit = async (e: FormDataEvent) => {
    e.preventDefault();
    const profileData = {
      candidateInfo: candidateFormData,
      role: "candidate",
      userId: user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
      isPremiumUser: true,
    };
    const response = await fetch("https://66bf797c42533c4031464979.mockapi.io/workify/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full border-b pb-10 mb-10">
          <div className="flex flex-col md:flex-row md:items-center items-start gap-2 md:gap-0 justify-between">
            <h1 className="text-xl text-white-100">
              Welcome onboarding
            </h1>
            <TabsList>
              <TabsTrigger
                className="data-[state=active]:bg-black-100"
                value="candidate"
              >
                Candidate
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-black-100"
                value="recruiter"
              >
                Recruiter
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="candidate">
          <OnboardingForm
            formControls={candiateOnBoardFormControls}
            buttonText={"Onboard as candidate"}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            onSubmit={onCandidateOnboardSubmit}
            isBtnDisabled={!candidateFormValidation()}
          />
        </TabsContent>
        <TabsContent value="recruiter">
          <OnboardingForm
            formControls={recruiterOnBoardFormControls}
            buttonText={"Onboard as recruiter"}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isBtnDisabled={!recruiterFormValidation()}
            onSubmit={onRecruiterOnboardSubmit}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
