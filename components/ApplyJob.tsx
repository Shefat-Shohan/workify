"use client";
import fetchUserProfileInfo from "@/components/service/fetchProfileInfo";
import useFetch from "@/components/service/useFetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useState } from "react";
import { jobdataType } from "./JobListings";

const ApplyJob = ({ id }: { id: string | number }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [applyData, setApplyData] = useState({
    salary: "",
    coverLetter: "",
  });
  const { user } = useUser();
  const router = useRouter();
  const { data, isPending } = useFetch(
    "https://66afff066a693a95b537a511.mockapi.io/jobs/" + id
  );
  const jobList = data as unknown as jobdataType;
  let description = jobList.description;


  console.log(typeof description);

  if (!showFullDescription) {
    description = description?.substring(0, 150) + "...";
  }

  // handle apply job

  const handleApplyJob = async (e: FormEvent) => {
    e.preventDefault();
    const profileInfo = await fetchUserProfileInfo(user?.id);
    const candidateProfileDetails = profileInfo?.find((profile) => {
      return profile;
    });

    const res = await fetch(
      "https://66afff066a693a95b537a511.mockapi.io/jobs/" + id
    );
    const currentJobDetails = await res.json();

    // get all the application data
    const getApplicantInfo = {
      recruiterId: currentJobDetails.recruiterId,
      name: candidateProfileDetails?.candidateInfo.name,
      email: candidateProfileDetails?.email,
      candidateUserId: candidateProfileDetails?.userId,
      coverLetter: applyData.coverLetter,
      expectedSalary: applyData.salary,
      status: ["Applied"],
      jobId: id,
      jobApplicationDate: new Date().toLocaleDateString(),
    };

    // push the data to database
    await fetch("https://66afff066a693a95b537a511.mockapi.io/application", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(getApplicantInfo),
    });
    toast({
      title: "Job applied Successfully",
      description: "Check activitty to exprole.",
    });
    router.push("/activity");
    router.refresh();
  };

  return (
    <div>
      {!isPending && (
        <div className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 mt-40 mb-20">
          <div className="max-w-7xl w-full">
            <div className="border-b mb-6 pb-6">
              <h1 className="text-4xl text-white-200">Submit a proposal</h1>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-6 mb-6">
              <div className="col-span-3 md:col-span-2 md:border-r border-r-0 pr-6">
                <h3 className="text-2xl text-white-100 pb-6">Job details</h3>
                <h2 className="text-xl text-white-100">{jobList.title}</h2>
                <p className="text-base text-gray-400 pt-1 ">
                  job Type: {jobList.type}
                </p>
                <div>
                  <p className="text-base text-gray-400 pt-6">
                    {description}
                    <span
                      onClick={() =>
                        setShowFullDescription((prevState) => !prevState)
                      }
                      className="text-purple cursor-pointer"
                    >
                      {showFullDescription ? "less" : "more"}
                    </span>
                  </p>
                </div>
              </div>
              {/* apply form */}

              <div className="md:col-span-1 col-span-3 border-t md:border-t-0 mt-6 justify-center md:pl-6 pl-0place-content-center">
                <div className="pt-6">
                  <p className="text-base text-gray-400 pb-2 font-light">
                    Salary Range: &nbsp;
                    <span className="font-normal">{jobList.salary}</span>
                  </p>
                  <p className="text-base text-gray-400 pb-2 font-light">
                    Salary Range:&nbsp; 
                    <span className="font-normal">{jobList.location}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* job apply form */}
            <div>
              <div className="pt-4 pb-10">
                <h3 className="text-lg text-purple pb-2">Important Note:</h3>
                <p className="text-base text-gray-500 md:max-w-[60%]">
                  Before you proceed with your application, please ensure that
                  you have reviewed the job description and meet the necessary
                  qualifications.
                </p>
              </div>
              <div>
                <form onSubmit={handleApplyJob}>
                  <Input
                    className="bg-black-200 h-12 mb-6 text-base text-gray-400 placeholder:text-base placeholder:text-gray-400 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="What is your expected salary"
                    value={applyData.salary}
                    onChange={(e) =>
                      setApplyData({
                        ...applyData,
                        salary: e.target.value,
                      })
                    }
                  />
                  <Textarea
                    className="bg-black-200 placeholder:text-gray-400 min-h-[250px] text-base text-gray-400 placeholder:text-base ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 mb-6"
                    placeholder="Cover letter"
                    required
                    onChange={(e) =>
                      setApplyData({
                        ...applyData,
                        coverLetter: e.target.value,
                      })
                    }
                    value={applyData.coverLetter}
                  />
                  <Button
                    disabled={!applyData.salary || !applyData.coverLetter}
                    onSubmit={handleApplyJob}
                    variant="outline"
                    className="px-6 py-4 text-gray-400 bg-black-200 disabled:opacity-65"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyJob;
