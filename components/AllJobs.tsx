"use client";
import useFetch from "./service/useFetch";
export type FilterParams = {
  [key: string]: string[];
};
import JobListing from "./JobListing";
import LoadingSkeleton from "./LoadingSkeleton";
import { fromUrlQuery, JobFilterMenus } from "@/data";
import { Item } from "@radix-ui/react-dropdown-menu";
import { jobdataType } from "./JobListings";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Key } from "lucide-react";

export default function AllJobs() {
  const [filterParams, setFilterParams] = useState<FilterParams>({});
  const searchparams = useSearchParams();
  const router = useRouter();
  const { data, error, isPending } = useFetch(
    "https://66afff066a693a95b537a511.mockapi.io/jobs"
  );

  const parsedParams: Record<string, string[]> = {};
  searchparams.forEach((value, key) => {
    parsedParams[key] = value.split(",");
  });

  const filteredJobs = data.filter((job: jobdataType) => {
    // Check if the job's location, title, and type match any of the criteria
    const matchesLocation = parsedParams.location?.includes(job.location);
    const matchesTitle = parsedParams.title?.includes(job.title);
    const matchesType = parsedParams.type?.includes(job.type);

    // Return true if all criteria match
    return matchesLocation || matchesTitle || matchesType;
  });

  const filterjobs = JobFilterMenus.map((menu) => ({
    id: menu.id,
    label: menu.label,
    options: Array.from(new Set(data.map((itemList) => itemList[menu.id]))),
  }));

  //show the list of job
  const updatedJobList = filteredJobs.length > 0 ? filteredJobs : data;
  // create the filter key
  const handleFilter = (getSearchId: string, getCurrentOption: string) => {
    let copyFilterParams: FilterParams = { ...filterParams };
    const indexOfCurrentSearch =
      Object.keys(copyFilterParams).indexOf(getSearchId);
    if (indexOfCurrentSearch === -1) {
      copyFilterParams = {
        ...copyFilterParams,
        [getSearchId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilterParams[getSearchId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        copyFilterParams[getSearchId].push(getCurrentOption);
      else copyFilterParams[getSearchId].splice(indexOfCurrentOption, 1);
    }
    setFilterParams(copyFilterParams);
    sessionStorage.setItem("filterParams", JSON.stringify(copyFilterParams));
  };

  // update url
  useEffect(() => {
    if (filterParams && Object.keys(filterParams).length > 0) {
      let url = "";
      url = fromUrlQuery({
        params: searchparams.toString(),
        dataToAdd: filterParams,
      });
      router.push(url, { scroll: false });
    }
  }, [filterParams, searchparams]);
  // get data from session storge and also check null.
  useEffect(() => {
    const storedFilterParams = sessionStorage.getItem("filterParams");
    if (storedFilterParams) {
      setFilterParams(JSON.parse(storedFilterParams));
    }
  }, []);

  return (
    <div className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 mt-40 mb-20">
      <div className="max-w-7xl w-full">
        <div className="border-b flex flex-wrap justify-between items-baseline md:items-center gap-2 md:gap-0 mb-6 pb-6">
          <h1 className="lg:text-3xl md:text-3xl text-xl text-white-100 font-semibold">
            All jobs
          </h1>
          <div>
            <Menubar>
              {filterjobs.map((menuitem) => (
                <MenubarMenu key={menuitem.id}>
                  <MenubarTrigger className="text-gray-400">
                    {menuitem.label}
                  </MenubarTrigger>
                  <MenubarContent>
                    {menuitem.options.map((option, index) => (
                      <MenubarItem
                        key={index}
                        className="flex items-center cursor-pointer"
                        onClick={() => handleFilter(menuitem.id, option)}
                      >
                        <div
                          className={`h-4 w-4 border rounded border-gray-700 ${
                            filterParams &&
                            Object.keys(filterParams).length > 0 &&
                            filterParams[menuitem.id] &&
                            filterParams[menuitem.id].indexOf(option) > -1
                              ? "bg-purple"
                              : ""
                          }`}
                        />
                        <Label className="ml-3 text-sm text-gray-400 cursor-pointer">
                          {option}
                        </Label>
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>
        </div>
        <div>
          {error && <div>Couldnt fetch the data</div>}
          {isPending ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {updatedJobList.map((job, index) => (
                <JobListing job={job} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
