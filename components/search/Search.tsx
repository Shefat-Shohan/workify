"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";

export default function Search() {
  const [results, setResults] = useState([]);
  return (
    <div className="w-full lg:w-[60%] h-full">
      <SearchBar setResults={setResults} />
       <SearchResultList results={results} />
    </div>
  );
}