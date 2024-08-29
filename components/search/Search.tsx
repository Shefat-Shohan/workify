"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";
import { jobdataType } from "../JobListings";

export default function Search() {
  const [results, setResults] = useState<React.SetStateAction<jobdataType[]>>(
    []
  );
  return (
    <div className="w-full lg:w-[60%] h-full">
      <SearchBar setResults={setResults} />
      <SearchResultList results={results} />
    </div>
  );
}
