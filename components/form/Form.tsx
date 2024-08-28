"use client";
import { useState } from "react";
import JobTypeForm from "./JobTypeForm";
import JobDetailsForm from "./JobDetailsForm";
import CompnayDetailsForm from "./CompnayDetailsForm";
import CompanyLocationForm from "./CompanyLocationForm";
import StoryBoard from "./StoryBoard";
import { motion } from "framer-motion";
import JobSalaryForm from "./JobSalaryForm";
import { pageTitle } from "@/data";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"


interface FormData {
  title: string;
  type: string;
  CountryLocation: string;
  description: string;
  salary: number;
  companyName: string;
  companyDescription: string;
  contactEmail: string;
  contactPhone: string;
  recruiterId: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
  applicants: {
    name:string;
    email: string;
    userId: string,
    status: string;
  }
}

export default function Form({userId}:{userId: string | undefined}) {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const {toast} = useToast();
  
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    salary: "",
    LocationFlag: "",
    CountryLocation: "",
    StateLocation: "",
    companyName: "",
    companyDescription: "",
    contactEmail: "",
    contactPhone: "",
  });

  const onSubmit = async (formData: FormData) => {
    const newJobs = {
      title: formData.title,
      type: formData.type,
      location: formData.CountryLocation,
      description: formData.description,
      salary: formData.salary,
      recruiterId: userId,
      applicants: [],
      company: {
        name: formData.companyName,
        description: formData.companyDescription,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
      },
    };
    await fetch("https://66afff066a693a95b537a511.mockapi.io/jobs", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newJobs),
    });
    router.refresh();
    router.push("/dashboard");
    toast({
      title: "Job Posted Successfully",
      description: "Check dashboard to exprole.",
    })

  };

  const displaySteps = () => {
    if (step == 0) return <StoryBoard />;
    if (step === 1)
      return <JobTypeForm setFormData={setFormData} formData={formData} />;
    if (step === 2)
      return <JobDetailsForm setFormData={setFormData} formData={formData} />;
    if (step === 3)
      return <JobSalaryForm setFormData={setFormData} formData={formData} />;
    if (step === 4)
      return (
        <CompanyLocationForm setFormData={setFormData} formData={formData} />
      );
    else
      return (
        <CompnayDetailsForm setFormData={setFormData} formData={formData} />
      );
  };

  const getWidth = () => {
    if (step === 0) return "0%";
    if (step === 1) return "0%";
    if (step === 2) return "25%";
    if (step === 3) return "50%";
    if (step === 4) return "75%";
    else return "100%";
  };

  return (
    <div className="relative flex justify-center items-center flex-col overflow-hidden mx-auto">
      <div className=" w-full h-screen">
        <div className="flex flex-col justify-between h-full">
          <div className="flex md:items-center justify-center h-full">
            <div>
              <h1 className="text-2xl md:text-3xl text-white-100 sm:px-16 px-5">
                {pageTitle[step]}
              </h1>
              <div className="flex justify-center">{displaySteps()}</div>
            </div>
          </div>
          <div>
            <div className="bg-black-200 h-[5px]">
              <motion.div
                className="bg-purple h-full"
                initial={{ width: "0%" }}
                animate={{ width: getWidth() }}
                transition={{ duration: 0.75 }}
              />
            </div>
            <div className="sm:px-16 px-5 py-6 flex justify-between">
              {step === 0 ? (
                <div></div>
              ) : (
                <button
                  disabled={step == 0}
                  onClick={() => setStep((currPage) => currPage - 1)}
                  className={` underline px-4 py-2 hover:bg-black-200 hover:px-4 hover:py-2 hover:rounded text-white-200`}
                >
                  Back
                </button>
              )}
              <button
                disabled={
                  (step === 1 && !formData.type) ||
                  (step === 2 && !(formData.title && formData.description)) ||
                  (step === 3 && !formData.salary) ||
                  (step === 4 && !formData.CountryLocation) ||
                  (step === 5 &&
                    !(
                      formData.companyName &&
                      formData.companyDescription &&
                      formData.contactEmail &&
                      formData.contactPhone
                    ))
                }
                onClick={() => {
                  if (step === pageTitle.length - 1) {
                    onSubmit(formData);
                  } else {
                    setStep((currPage) => currPage + 1);
                  }
                }}
                className="bg-black-200 hover:bg-black-300 px-8 py-3 rounded text-lg text-white-200"
              >
                {step === 0
                  ? "Get Started"
                  : step === pageTitle.length - 1
                  ? "Submit"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
