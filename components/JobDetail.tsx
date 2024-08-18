"use client";
import { MapPinIcon, ShareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import JobListing from "./JobListing";
import ApplyJob from "./ApplyJob";
import fetchUserProfileInfo from "./service/fetchProfileInfo";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import useFetch from "./service/useFetch";
import DeleteJob from "./DeleteJob";
import RecruiterJobList from "./RecruiterJobList";
import { useToast } from "@/components/ui/use-toast"

interface Job {
  type: string;
  location: string;
  description: string;
  title: string;
  salary: string;
  id: string | number;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
}

export default function JobDetail({ job }: { job: Job }) {
  const pathName = usePathname();
  const { user } = useUser();
  const {toast} = useToast();
  const recruiterUserId = user?.id;
  // share url
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleJobShare = () => {
    const url = `http://localhost:3000${pathName}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopySuccess("copied");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        setCopySuccess("Failed to copy link.");
      });
  };

  const { data } = useFetch("https://66afff066a693a95b537a511.mockapi.io/jobs");

  const recentJobList = data.slice(0, 3);
  const currentJobId = job.id;
  const jobs = recentJobList
    ? recentJobList.filter((job) => job.id !== currentJobId)
    : [];

  // fetch application database
  const { data: JobApplications } = useFetch(
    "https://66afff066a693a95b537a511.mockapi.io/application"
  );
  // fetch users database
  const { data: users } = useFetch(
    "https://66bf797c42533c4031464979.mockapi.io/workify/users"
  );

  // handle the job apply functionality
  const handleApply = async (loggedInUserId) => {
    if (!user) {
      router.push("/sign-up");
    } else {
      const profileInfo = await fetchUserProfileInfo(loggedInUserId);
      const candidateProfileDetails = profileInfo?.find((profile) => {
        return profile.email;
      });

      const res = await fetch(
        "https://66afff066a693a95b537a511.mockapi.io/jobs/" + currentJobId
      );
      const currentJobDetails = await res.json();

      // get all the application data
      const getApplicantInfo = {
        recruiterId: currentJobDetails.recruiterId,
        name: candidateProfileDetails.candidateInfo.name,
        email: candidateProfileDetails.email,
        candidateUserId: candidateProfileDetails.userId,
        coverLetter: candidateProfileDetails.coverLetter,
        status: ["Applied"],
        jobId: currentJobId,
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
      })
      router.back();
    }
  };

  // handle delete function

  const handleDelete = async (deleteId: string) => {
    try {
      // Delete the job first
      const jobRes = await fetch(
        `https://66afff066a693a95b537a511.mockapi.io/jobs/${deleteId}`,
        {
          method: "DELETE",
        }
      );
      toast({
        title: "Job deleted Successfully",
      })
      router.back();
      if (!jobRes.ok) {
        throw new Error("Failed to delete job");
      }
      // Fetch all applications
      const applicantRes = await fetch(
        `https://66afff066a693a95b537a511.mockapi.io/application`
      );
      const applications = await applicantRes.json();

      // Find applications related to the deleted job
      const applicationsToDelete = applications.filter(
        (item) => item.jobId === deleteId
      );

      // Delete each related application
      for (const app of applicationsToDelete) {
        const applicationRes = await fetch(
          `https://66afff066a693a95b537a511.mockapi.io/application/${app.id}`,
          {
            method: "DELETE",
          }
        );

        if (!applicationRes.ok) {
          console.log(`Network error`);
        } else {
          console.log(`success`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // check if the currentUser already applied for the job
  const isApplied =
    JobApplications.findIndex((applicant) => {
      return (
        applicant.jobId == currentJobId && applicant.candidateUserId == user?.id
      );
    }) > -1
      ? true
      : false;
  // is current user is recruiter
  const isRecruiter =
    users.findIndex(
      (user) => user.userId === recruiterUserId && user.role === "recruiter"
    ) > -1
      ? true
      : false;

  return (
    <div className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 mt-40 mb-20">
      <div className="max-w-7xl w-full">
        <div className="grid md:grid-cols-3">
          {/* left side content */}
          <div className="col-span-4 lg:col-span-2">
            {/* title section */}
            <div className="flex justify-between flex-col items-start gap-1 md:flex-row">
              <h1 className="text-3xl font-normal text-white-100">
                {job.title}
              </h1>
              <div className="flex items-center justify-center gap-3 mt-3 md:mt-0">
                {isRecruiter ? (
                  <DeleteJob handleDelete={() => handleDelete(job?.id)} />
                ) : (
                  <ApplyJob
                    disabled={isApplied}
                    handleApply={() => handleApply(user?.id)}
                  />
                )}
                <Link href="#">
                  <Button className="px-4 py-6 bg-background border hover:bg-black-200">
                    <ShareIcon
                      className="w-5 h-5 text-white-200 "
                      onClick={handleJobShare}
                    />
                  </Button>
                </Link>
              </div>
            </div>
            {/* company name details */}

            <div className="mt-6 md:mt-0">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-purple">Salary: {job.salary}</h2>
                <div className="flex justify-center items-center">
                  <MapPinIcon className="w-4 h-4 text-gray-400  mr-1" />
                  <p className="text-gray-400 text-sm mt-[5px]">
                    {job.location}
                  </p>
                </div>
              </div>
            </div>
            {/* job details */}
            <div className="my-16">
              <p className="text-lg text-gray-400  leading font-normal">
                {job.description}
              </p>
            </div>
            <div className=" border-b border-gray-50/15 my-8" />
            {/* job type & salary */}
            <div>
              <div className="flex justify-between items-center">
                <p className="text-sm rounded inline-block text-[#f1f7feb5] ">
                  Job Type: {job.type}
                </p>
              </div>
              <div className=" border-b border-gray-50/15 my-8" />
              <div className="">
                <h2 className="text-xl font-normal mb-1 text-white-100">
                  Company History
                </h2>
                <p className="text-purple text-sm">{job.company.name}</p>
                <p className="text-[16px] inline-block text-gray-400 mt-4">
                  {job.company.description}
                </p>
                {/* company contacts */}
                <div className="my-4 flex flex-col md:flex-row md:items-center md:gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-white-100">
                      Email Us:
                    </h4>
                    <span className="text-[14px] text-gray-400 font-light">
                      job.company.contactEmail
                    </span>
                  </div>
                  <div className="my-4">
                    <h4 className="text-lg font-medium text-white-100">
                      Call Us:
                    </h4>
                    <span className="text-[14px] text-[#f1f7feb5] font-light">
                      job.company.contactPhone
                    </span>
                  </div>
                </div>
                <div className=" border-b border-gray-50/15 my-8" />
              </div>
            </div>
          </div>

          {/* right side content */}
          <div className="lg:pl-8 pl-0 col-span-4 lg:col-span-1">
            <h2 className="text-2xl font-normal mb-8 text-white-100"> {isRecruiter ? "Posted by you" :"Recent jobs"} </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 ">
              {
              isRecruiter ? <RecruiterJobList currentJobId={currentJobId}/> : jobs.map((job) => (
                <JobListing key={job.id} job={job} />
              ))
              
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
