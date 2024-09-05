// 'use client'
import { useUser } from "@clerk/clerk-react";
import React from "react";
import useFetch from "./service/useFetch";
import { jobdataType } from "./JobListings";
import JobListing from "./JobListing";

export default function RecruiterJobList({
  currentJobId,
}: {
  currentJobId: string | number;
}) {
  const { user } = useUser();
  const loggedInId = user?.id;
  const { data: jobList } = useFetch(
    "https://66afff066a693a95b537a511.mockapi.io/jobs/"
  );

  const jobPostedByRecruiter = jobList.filter(
    (currentUserJob: jobdataType) =>
      currentUserJob &&
      currentUserJob.recruiterId === loggedInId && currentUserJob.id !== currentJobId
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      {jobPostedByRecruiter.map((job:jobdataType) => (
        <JobListing key={job.id} job={job} />
      ))}
    </div>
  );
}
