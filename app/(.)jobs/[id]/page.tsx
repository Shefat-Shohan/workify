import JobDetail from "@/components/JobDetail";
import { Modal } from "@/components/Modal";
import fetchUserProfileInfo from "@/components/service/fetchProfileInfo";
import { currentUser } from "@clerk/nextjs/server";
import { useState } from "react";

const fetchjobs = async (id: string) => {
  const res = await fetch("https://66afff066a693a95b537a511.mockapi.io/jobs/" + id);
  try {
    if (!res.ok) {
      throw new Error("Error fetching job data.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default async function JobModal({ params: { id } }:{params: {id:string}}) {
  const job = await fetchjobs(id);
  const user = await currentUser();
  const profileInfo = await fetchUserProfileInfo(user?.id);
  const recruiter = profileInfo.some((profile) => profile.role === "recruiter");
  return (
    <Modal>
      <JobDetail job={job} recruiter={recruiter} />
    </Modal>
  );
}
