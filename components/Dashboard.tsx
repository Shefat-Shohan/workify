import Link from "next/link";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import { currentUser } from "@clerk/nextjs/server";
import JobListing from "./JobListing";
import fetchUserProfileInfo from "./service/fetchProfileInfo";
import { redirect } from "next/navigation";
import { jobdataType } from "./JobListings";
export default async function Dashboard() {
  
  const user = await currentUser();
  const profileInfo = await fetchUserProfileInfo(user?.id);

  if(profileInfo?.length == 0) redirect("/onboard");
   const recruiterUser = profileInfo?.find(user => user.role === "recruiter");
  if (!recruiterUser) redirect("/");
   
  const getJobs = async () => {
    const res = await fetch(
      "https://66afff066a693a95b537a511.mockapi.io/jobs"
    );
    
    const data = await res.json();
    return data
      .filter((currentUserJob:jobdataType) => {
        return currentUserJob && currentUserJob.recruiterId === user?.id;
      })
      .map((jobs:jobdataType) => {
        return jobs;
      });
  };
  const postedJobs = await getJobs();

  return (
    <div className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 mt-40 mb-20">
      <div className="max-w-7xl w-full">
        <div className="border-b flex flex-wrap justify-between items-baseline md:items-center gap-2 md:gap-0 mb-6 pb-6">
          <h1 className="lg:text-3xl md:text-3xl text-xl text-white-100 font-semibold">Jobs Dashboard</h1>
          <Link href={"/post-job"} className="">
            <MagicButton
              title="Post a job"
              icon={<FaLocationArrow />}
              position="right"
            />
          </Link>
        </div>

        <div>
          {postedJobs.length == 0 ? (
            <p className="text-gray-400">You don&apos;t have any active job.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {postedJobs.map((job:jobdataType) => (
                <JobListing key={job.id} job={job} recruiterUser={recruiterUser} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
