import JobDetail from "@/components/JobDetail";
import fetchUserProfileInfo from "@/components/service/fetchProfileInfo";
import { currentUser } from "@clerk/nextjs/server";

const fetchjobs = async (id: string | number) => {
  const res = await fetch(
    `https://66afff066a693a95b537a511.mockapi.io/jobs/${id}`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
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

export default async function JobPage({
  params: { id },
}: {
  params: { id: string | number };
}) {
  const job = await fetchjobs(id);
  const user = await currentUser();
  const profileInfo = await fetchUserProfileInfo(user?.id);
  const recruiter = profileInfo.some((profile) => profile.role === "recruiter");
  return (
    <div>
      <JobDetail job={job} recruiter={recruiter}/>
    </div>
  );
}
