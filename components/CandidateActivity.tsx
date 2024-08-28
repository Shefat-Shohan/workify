"use client";
import { div } from "three/examples/jsm/nodes/Nodes.js";
import JobListing from "./JobListing";
import useFetch from "./service/useFetch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { jobdataType } from "../components/JobListings";
import { useEffect, useState } from "react";

interface CandidateActivityProps {
  currentuserId: string | undefined;
}

export type Applicant = {
  recrunameiterId: string;
  name: string;
  email: string;
  candidateUserId: string;
  status: string[];
  jobId: string | number;
  jobApplicationDate: string;
  recruiterId: string;
};

type ArrayStatus = {
  status: string[];
};
const CandidateActivity: React.FC<CandidateActivityProps> = ({
  currentuserId,
}) => {
  const { data: applicants } = useFetch(
    "https://66afff066a693a95b537a511.mockapi.io/application/"
  );
  const { data: jobList } = useFetch(
    "https://66afff066a693a95b537a511.mockapi.io/jobs"
  );
  const jobAppliedByCurrentuser = applicants.filter(
    (applicant: Applicant) => applicant?.candidateUserId == currentuserId
  );

  const uniqueArrayStatus = Array.from(
    new Set(
      jobAppliedByCurrentuser.flatMap((item: ArrayStatus) => item?.status)
    )
  );
  return (
    <div className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 mt-40 mb-20">
      <div className="max-w-7xl w-full">
        <Tabs defaultValue="Applied">
          <div className="flex md:justify-between items-start md:items-center flex-col md:flex-row gap-3 border-b pb-6 mb-6">
            <h1 className="lg:text-2xl text-xl text-white-100 ">
              Your Activity
            </h1>
            <TabsList>
              {uniqueArrayStatus.map((status) => (
                <TabsTrigger key={status} value={status}>
                  {status}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="w-full h-full">
            {
              jobAppliedByCurrentuser.length === 0 ? (<h2 className="text-base text-gray-400">You haven&apos;t applied to any job yet.</h2>) : (
                uniqueArrayStatus.map((targetStatus, index) => (
                  <TabsContent
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-0"
                    key={index}
                    value={targetStatus}
                  >
                    {jobAppliedByCurrentuser
                      .filter((application: Applicant) =>
                        application.status.includes(targetStatus)
                      )
                      .map((application: Applicant) =>
                        jobList.find(
                          (appliedJobs: jobdataType) =>
                            appliedJobs.id == application.jobId
                        )
                      )
                      .filter((job) => job !== undefined)
                      .map((job, index) => (
                        <div key={index}>
                          <JobListing job={job} />
                        </div>
                      ))}
                  </TabsContent>
                ))
              )
            }
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default CandidateActivity;
