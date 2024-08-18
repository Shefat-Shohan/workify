"use client";
import JobListing from "./JobListing";
import useFetch from "./service/useFetch";

export type jobdataType = {
  type: string;
  location: any;
  description: string;
  title: string;
  slug: string;
  salary: number;
  id: string | number;
  recruiterId:string;
};
export default function JobListings() {
  const {
    data,
    isPending,
    error,
  } = useFetch("https://66afff066a693a95b537a511.mockapi.io/jobs");
  const jobs = data.slice(0,6);
  return (
    <section className="py-20" id="job">
      <div>
        <h2 className="heading py-20">
          Explore <span className="text-purple">Recent </span>
          Jobs
        </h2>
        {error && <div>{error}</div>}
        {isPending ? (
          <h1 className="flex justify-center items-center">Loading...</h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job:jobdataType) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}