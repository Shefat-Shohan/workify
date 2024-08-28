"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

// This type is used to define the shape of our data.
export type Candidate = {
  id: string;
  name: string;
  coverLetter: string;
  email: string;
  date: string;
  jobId: string | number;
  candidateUserId: string;
  job: [];
};

export const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: "name",
    header: "Candidate Name",
  },
  {
    accessorKey: "status",
    header: "Progress",
    cell:( {row} )=>{
      const progress = row.getValue("status");
      return <div> { progress?.length === 1  ? progress[0] : progress[1] } </div>
    }
  },
  {
    accessorKey: "coverLetter",
    header: "Cover Letter",
    cell: ({ row }) => {
      const data = row.getValue("coverLetter");
      const formatedData = data.slice(0, 30);
      return <div> {formatedData}...</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "jobApplicationDate",
    header: "Apply Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const Candidate = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-gray-400">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer text-gray-400">
              <Link
                href={{
                  pathname: `/candidate-profile/${Candidate.candidateUserId}`,
                  query: { jobId: `${Candidate.jobId}` },
                }}
              >
                View profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-gray-400"
              onClick={() => navigator.clipboard.writeText(Candidate.email)}
            >
              Copy email id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-gray-400">
              View customer
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-gray-400">
              View payment details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

//
