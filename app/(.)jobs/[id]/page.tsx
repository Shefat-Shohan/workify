import JobDetail from "@/components/JobDetail";
import { Modal } from "@/components/Modal";

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
  return (
    <Modal>
      <JobDetail job={job} />
    </Modal>
  );
}
