"use client";
import JobListing from "@/components/JobListing";
import useFetch from "@/components/service/useFetch";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { jobdataType } from "@/components/JobListings";

export default function JobSearchFeed() {
  const { searchTerm } = useParams<{searchTerm: string}>();
  const decodedUriTerm = decodeURIComponent(Array.isArray(searchTerm) ? searchTerm.join('') : searchTerm);
  console.log(searchTerm);
  const {
    data: jobList,
    isPending,
    error,
  } = useFetch("https://66afff066a693a95b537a511.mockapi.io/jobs");

  const filteredResult = (jobList:jobdataType[]) => {
    let result = jobList.filter((filteredJob:jobdataType) =>
      filteredJob.title
        .toLowerCase()
        .includes(decodedUriTerm.trim().toLowerCase())
    );
    return result;
  };

  const searchResult = filteredResult(jobList);
  return (
    <>
      {isPending && (
        <div className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 mt-40 mb-20">
          <div className="max-w-7xl w-full">Loading...</div>
        </div>
      )}
      {searchResult.length > 0 ? (
        <div className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 mt-40">
          <div className="max-w-7xl w-full mb-20">
            <div className="flex flex-col sm:flex-row md:items-center justify-between pb-6 mb-6 border-b">
              <h1 className="text-lg md:text-2xl font-light text-white-100">
                Showing results for&nbsp;
                <span className="text-purple font-medium">
                  {decodedUriTerm}
                </span>
              </h1>
              <p className="">{searchResult.length}&nbsp;result found</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResult.map((filteredJob) => (
                <div key={filteredJob.id} >
                  <JobListing job={filteredJob} />
                </div>
              ))}
            </div>
            {/* <Pagination searchResult = {searchResult}/> */}
          </div>
        </div>
      ) : (
        !isPending && (
          <div className="relative flex justify-center items-center h-screen">
            <div className="max-w-7xl w-full flex justify-center">
              <div className="flex flex-col items-center">
                <h1 className="text-3xl text-white-100">
                  We couldn&apos;t find any job that match your search
                </h1>
                <p className="text-center text-gray-400 text-base mt-2 mb-6">
                  Try a new search or go back to home page.
                </p>
                <Link href={"/"}>
                <Button variant="outline">Go back home</Button>
                </Link>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
