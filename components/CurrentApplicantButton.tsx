import { useState } from "react";
import useFetch from "./service/useFetch";
import JobApplicants from "./job-applicants/page";
import { Applicant } from "./CandidateActivity";

export default function CurrentApplicantButton({
  jobId,
}: {
  jobId: string | number;
}) {
  // I have find the current job id inside the applicant database. the length of the return value is the number of applicant.

  const [showApplicantDrawer, setShowApplicantDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState();
  const [
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
  ] = useState(false);

  const { data: applicants } = useFetch(
    "https://66afff066a693a95b537a511.mockapi.io/application/"
  );

  const jobApplicants = applicants.filter((item:Applicant) => item.jobId === jobId);
  return (
    <div>
      <button
        onClick={() => setShowApplicantDrawer(true)} disabled={jobApplicants.length == 0}
        className="text-purple disabled:opacity-55 px-3 py-1 rounded-full border text-sm  hover:bg-black-200"
      >
        {jobApplicants.length} Applicant{jobApplicants.length !== 1 ? "s" : ""}
      </button>
      <JobApplicants
        showApplicantDrawer={showApplicantDrawer}
        setShowApplicantDrawer={setShowApplicantDrawer}
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
        setShowCurrentCandidateDetailsModal={
          setShowCurrentCandidateDetailsModal
        }
        jobApplicants={jobApplicants}
      />
    </div>
  );
}
