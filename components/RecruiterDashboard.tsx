"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import useFetch from "./service/useFetch";
import Chart from "./Chart";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { DataTable } from "../app/dashboard/Data-Table";
import { columns } from "@/app/dashboard/columns";
import { BriefcaseIcon,EnvelopeIcon, UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/solid";
import { jobdataType } from "./JobListings";
import { UserDataType } from "./service/fetchProfileInfo";

const RecruiterDashboard = ({ postedJobs, recruiterUser }:{postedJobs:jobdataType[],recruiterUser:UserDataType}) => {
  const [currentTabs, setCurrentTabs] = useState("dashboard");
  const handleTabChange = (value:string) => {
    setCurrentTabs(value);
  };

  const recruiterId = recruiterUser.userId;
  const { data: application } = useFetch(
    `https://66afff066a693a95b537a511.mockapi.io/application?recruiterId=${recruiterId}`
  );
  return (
    <div>
      <Tabs
        className="mt-10"
        value={currentTabs}
        onValueChange={handleTabChange}
      >
        <TabsList className="mb-4">
          <TabsTrigger
            value="dashboard"
            className="text-gray-400 bg-transparent text-base data-[state=active]:text-gray-400"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="applicants"
            className="text-gray-400 text-base  data-[state=active]:text-gray-400"
          >
            Applicants
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="border p-6 rounded-lg">
            <div className="flex gap-6 justify-between flex-wrap">
              {/* Total posted jobs */}
              <div className="border rounded-lg px-6 py-6 flex-grow ">
                <div className="flex justify-between items-center">
                  <p className="text-base text-gray-400">Total Posted Jobs</p>
                  <BriefcaseIcon className="h-4 w-4 text-gray-400" />
                </div>
                <h2 className="text-2xl text-white-100 font-semibold">
                  {postedJobs.length}
                </h2>
              </div>
              <div className="border rounded-lg px-6 py-6 flex-grow ">
                <div className="flex justify-between items-center">
                  <p className="text-base text-gray-400">Number of applicant</p>
                  <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-white-100">
                  {application.length}
                </h2>
              </div>
              <div className="border rounded-lg px-6 py-6 flex-grow ">
                <div className="flex justify-between items-center">
                  <p className="text-base text-gray-400">Selected Candidate</p>
                  <UserPlusIcon className="h-4 w-4 text-gray-400" />
                </div>
                <h2 className="text-2xl text-white-100 font-semibold">120</h2>
              </div>
              <div className="border rounded-lg px-6 py-6 flex-grow">
                <div className="flex justify-between items-center">
                  <p className="text-base text-gray-400">Rejected Candidate</p>
                  <UserMinusIcon className="h-4 w-4 text-gray-400" />
                </div>
                <h2 className="text-2xl text-white-100 font-semibold">700</h2>
              </div>
            </div>
            {/* chart */}
            <div className="pt-6 flex flex-col lg:flex-row gap-6">
              <div className="border rounded-lg px-6 py-6 lg:w-[60%] shadow-md">
                <Chart />
              </div>
              <div className="border rounded-lg px-6 py-6 lg:w-[40%]">
                <div className="pb-6 border-b mb-6">
                  <h2 className="text-xl text-white-200">Recent posted jobs</h2>
                  <p className="text-sm text-gray-400">
                    You have posted <span className="text-purple">{postedJobs.length}</span> job
                  </p>
                </div>
                <ScrollArea className="h-72">
                  <div>
                    <div>
                      {postedJobs.map((job:jobdataType) => (
                        <div key={job.id} className="pb-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h2 className="md:text-base text-base text-white-200">
                                {job.title.slice(0, 25)}
                              </h2>
                              <p className="text-gray-400 text-sm">
                                {job.description.slice(0, 35)}
                              </p>
                            </div>
                            <Link
                              href={`/jobs/${job.id}`}
                              className="text-purple text-sm"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="applicants">
          <div>
            <DataTable columns={columns} data={application} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecruiterDashboard;
