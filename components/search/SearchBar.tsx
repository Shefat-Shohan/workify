"use client";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchBar({ setResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // get the searchterm filter the data the set the setResult value

  const fetchData = (value) => {
    fetch("https://66afff066a693a95b537a511.mockapi.io/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (value === "") {
          setResults([]);
        } else {
          const result = data.filter((job) => {
            return (
              job &&
              job.title &&
              job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
          });
          setResults(result);
        }
      });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search/${searchTerm}`);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchData(value);
  };
  return (
    <div className=" bg-[#04071d] w-full h-full rounded-full px-4 border border-gray-50/15 flex justify-center ">
      <form
        className="flex items-center w-full h-12 "
        onSubmit={handleSubmit}
      >
        <button type="submit">
          <MagnifyingGlassIcon className="w-5 h-5 text-[#f1f7feb5]" />
        </button>
        <input
          className={cn("bg-transparent w-full ml-4 border-none outline-none text-gray-500 text-[16px] font-medium placeholder-gray-500")} 
          type="text"
          placeholder="Search for any job..."
          value={searchTerm}
          onChange={(e) => handleChange(e)}
        />
      </form>
    </div>
  );
}
