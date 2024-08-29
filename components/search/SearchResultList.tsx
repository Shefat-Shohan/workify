import React, { useRef, useEffect, useState } from "react";
import SearchResult from "./SearchResult";
import { jobdataType } from "../JobListings";

export default function SearchResultList({
  results,
}: {
  results: jobdataType[];
}) {
  console.log("results", results);
  return (
    <div>
      <div className="relative">
        {results.length > 0 && (
          <div
            className={` w-full bg-black-100 border border-b-0 border-gray-50/15 flex flex-col shadow-md rounded-lg  max-h-[300px] overflow-y-scroll mt-4 absolute top-0 z-[100]`}
          >
            {results.map((result: jobdataType) => (
              <SearchResult key={result.id} result={result} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
