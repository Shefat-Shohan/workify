"use client";
import { MapPinIcon, ShareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import JobListing from "./JobListing";
import fetchUserProfileInfo from "./service/fetchProfileInfo";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import useFetch from "./service/useFetch";
import DeleteJob from "./DeleteJob";
import RecruiterJobList from "./RecruiterJobList";
import { useToast } from "@/components/ui/use-toast";
import ApplyJobButton from "./ApplyJobButton";
import { Applicant } from "./CandidateActivity";
import { jobdataType } from "./JobListings";

type UserType = {
  userId: string;
  role: string;
};
export default function JobDetail({ job }: { job: jobdataType }) {
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();
  const recruiterUserId = user?.id;
  // share url
  const router = useRouter();
  const handleJobShare = () => {
    const url = `http://localhost:3000${pathName}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          title: "Job link copied.",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const { data } = useFetch("https://66afff066a693a95b537a511.mockapi.io/jobs");

  const recentJobList = data.slice(0, 3);
  const currentJobId = job.id;
  const jobs = recentJobList
    ? recentJobList.filter((job: jobdataType) => job.id !== currentJobId)
    : [];

  // fetch application database
  const { data: JobApplications } = useFetch(
    "https://66afff066a693a95b537a511.mockapi.io/application"
  );
  // fetch users database
  const { data: users } = useFetch(
    "https://66bf797c42533c4031464979.mockapi.io/workify/users"
  );


  // handle delete function
  const handleDelete = async (deleteId: string) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (isConfirm) {
      try {
        // Delete the job first
        const jobRes = await fetch(
          `https://66afff066a693a95b537a511.mockapi.io/jobs/${deleteId}`,
          {
            method: "DELETE",
          }
        );

        if (jobRes.ok) {
          toast({
            title: "Job deleted successfully",
          });

          // Fetch all applications related to the job
          const applicantRes = await fetch(
            `https://66afff066a693a95b537a511.mockapi.io/application`
          );
          const applications = await applicantRes.json();

          // Find and delete applications related to the deleted job
          const applicationsToDelete = applications.filter(
            (item:Applicant) => item.jobId === deleteId
          );

          for (const app of applicationsToDelete) {
            const applicationRes = await fetch(
              `https://66afff066a693a95b537a511.mockapi.io/application/${app.id}`,
              {
                method: "DELETE",
              }
            );

            if (!applicationRes.ok) {
              console.log(`Failed to delete application with id ${app.id}`);
            } else {
              console.log(`Deleted application with id ${app.id}`);
            }
          }

          // Navigate back after everything is successfully deleted
          router.back();
        } else {
          throw new Error("Failed to delete job");
        }
      } catch (error) {
        toast({
          title: "An error occurred while deleting the job",
        });
        console.error("Error:", error);
      }
    } else {
      console.log("Job deletion canceled");
    }
  };

  // check if the currentUser already applied for the job
  const isApplied =
    JobApplications.findIndex((applicant: Applicant) => {
      return (
        applicant.jobId == currentJobId && applicant.candidateUserId == user?.id
      );
    }) > -1
      ? true
      : false;
  // is current user is recruiter

  useEffect(() => {
    const recruiter =
      users.findIndex(
        (user: UserType) =>
          user.userId === recruiterUserId && user.role === "recruiter"
      ) > -1
        ? true
        : false;
    setIsRecruiter(recruiter);
    setIsLoading(false);
  }, [users, recruiterUserId]);
  // if currentUser included into the currentJob id then we show the delete button else empty div, else a apply button.

  const showActionButton =
    data.filter((job: jobdataType) => {
      return job.id === currentJobId && job.recruiterId === user?.id;
    }).length > 0;
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
                {showActionButton ? (
                  <DeleteJob handleDelete={() => handleDelete(job?.id as string)} />
                ) : isRecruiter ? (
                  <div></div>
                ) : (
                  <Link href={`/jobs/${job.id}/apply`}>
                    <ApplyJobButton
                      disabled={isApplied}
                    />
                  </Link>
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
              <p className="text-base text-gray-400  leading">
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
                      {job.company.contactEmail}
                    </span>
                  </div>
                  <div className="my-4">
                    <h4 className="text-lg font-medium text-white-100">
                      Call Us:
                    </h4>
                    <span className="text-[14px] text-[#f1f7feb5] font-light">
                      {job.company.contactPhone}
                    </span>
                  </div>
                </div>
                <div className=" border-b border-gray-50/15 my-8" />
              </div>
            </div>
          </div>
          {/* right side content */}
          <div className="lg:pl-8 pl-0 col-span-4 lg:col-span-1">
            <h2 className="text-2xl font-normal mb-8 text-white-100">
              {isLoading ? (
                <div>Loading...</div>
              ) : isRecruiter ? (
                "Posted by you"
              ) : (
                "Recent jobs"
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 ">
              {isLoading ? (
                <div>Loading...</div>
              ) : isRecruiter ? (
                <RecruiterJobList currentJobId={currentJobId} />
              ) : (
                jobs.map((job: jobdataType) => (
                  <JobListing key={job.id} job={job} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
