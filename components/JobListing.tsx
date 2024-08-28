"use client";
import Link from "next/link";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import {jobdataType} from "../components/JobListings";

export default function JobListing({
  job,
}: {
  job: jobdataType;
}) {
  
  let description = job.description;
  description = description.substring(0, 110) + "...";

  
  return (
    <div className="w-[100%]">
      <div className="card_wrapper w-full h-full">
        <div className="card_content">
          <div className="p-4">
            <div className=" flex flex-col items-stretch">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4 items-center">
                  <div className="text-gray-400">{job.type}</div>
                </div>
                <div className="text-gray-400 flex items-center">
                  <MapPinIcon className="w-5 h-5 text-gray-400  mr-1" />
                  {job.location}
                </div>
              </div>
              <div className="pb-4">
                <h3 className="font-normal text-lg lg:text-xl max-w-96 mb-3 text-white-100">
                  {job.title}
                </h3>
                <p className="text-gray-400 text-base">{description}</p>
              </div>
              <div className="flex justify-between items-center my-4">
                <div>
                <h3 className="text-purple">{job.salary} / Year</h3>
                </div>
                <Link
                  className="flex justify-center items-center gap-1 text-gray-400 "
                  href={`/jobs/${job.id}`}
                >
                  Read more
                  <ChevronDoubleRightIcon className="w-4 h-4 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
