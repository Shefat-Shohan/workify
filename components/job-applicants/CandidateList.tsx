"use client";
import { useEffect, useState } from "react";
import fetchUserProfileInfo from "../service/fetchProfileInfo";
import { Button } from "../ui/button";
import MagicButton from "../ui/MagicButton";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast"

export default function CandidateList({
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
  jobApplicants,
}) {
  const {toast} = useToast();
  const handleCandidateDetails = async (getCandidateId) => {
    try {
      const data = await fetchUserProfileInfo(getCandidateId);
      if (data) {
        setCurrentCandidateDetails(data);
        setShowCurrentCandidateDetailsModal(true);
      }
    } catch (error) {
      console.log("Error Loading user profile");
    }
  };

  // handleApplicationSelected function

  const handleApplicationSelected = async (getCurrentStatus) => {
    let copyjobApplicants = [...jobApplicants];
    const findCurrentJobApplicant = copyjobApplicants.find(
      (item) => item.candidateUserId === currentCandidateDetails?.[0]?.userId
    );
    const updateSelect = {
      candidateUserId: findCurrentJobApplicant.candidateUserId,
      email: findCurrentJobApplicant.email,
      jobApplicationDate: findCurrentJobApplicant.jobApplicationDate,
      jobId: findCurrentJobApplicant.jobId,
      name: findCurrentJobApplicant.name,
      recruiterId: findCurrentJobApplicant.recruiterId,
      status: ["Applied", getCurrentStatus],
      id: findCurrentJobApplicant.id,
    };
    await fetch(
      "https://66afff066a693a95b537a511.mockapi.io/application/" +
        findCurrentJobApplicant.id,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(updateSelect),
      }
    );
    
    toast({
      title: `Candidate &nbsp;${getCurrentStatus}`,
    })
  };
  
  const animatationVariants = {
    hidden: { opacity: 0, y: 20 },
    visable: { opacity: 1, y: 0 },
  };
  return (
    <div className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full pt-16">
        <p className="text-lg text-white-100 font-normal mb-4">Applicants</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16 md:gap-8">
          <div className="col-span-1">
            <div className="flex items-start flex-col gap-3">
              {jobApplicants && jobApplicants.length > 0
                ? jobApplicants.map((jobApplicantItem) => (
                    <motion.div
                      key={jobApplicantItem.id}
                      onClick={() =>
                        handleCandidateDetails(jobApplicantItem.candidateUserId)
                      }
                      className={`border rounded-lg w-full overflow-hidden cursor-pointer hover:bg-black-200`}
                      variants={animatationVariants}
                      initial="hidden"
                      animate="visable"
                      transition={{ duration: 0.75 }}
                    >
                      <div className="px-4 my-4">
                        <div className="flex flex-col">
                          <h3 className="text-base text-white-100">
                            {jobApplicantItem.name}
                          </h3>
                          <p className="text-gray-400 text-sm pt-1">
                            {jobApplicantItem.coverLetter.slice(0, 80)}...
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                : null}
            </div>
          </div>
          {/* applicant details */}

            {showCurrentCandidateDetailsModal && (
          <div className="col-span-1 lg:col-span-2">
              <div>
                <motion.div
                  variants={animatationVariants}
                  initial="hidden"
                  animate="visable"
                  transition={{ duration: 0.4 }}
                  className="mt-10 md:mt-0 flex flex-wrap md:flex-row gap-6 md:gap-0 justify-between border-b pb-4"
                >
                  <div>
                    <h2 className="text-3xl text-white-100">
                      {currentCandidateDetails?.[0].candidateInfo.name}
                    </h2>
                    <p className="text-sm text-gray-400 pt-1">
                      Work At: &nbsp;
                      {
                        currentCandidateDetails?.[0].candidateInfo
                          .currentCompanyName
                      }
                    </p>
                  </div>
                  <div className=" flex gap-3 items-center">
                    <MagicButton
                      title={
                        jobApplicants
                          .find(
                            (item) =>
                              item.candidateUserId ===
                              currentCandidateDetails?.[0].userId
                          )
                          .status.includes("Selected")
                          ? "Selected"
                          : "Select"
                      }
                      position=""
                      icon=""
                      handleClick={() => handleApplicationSelected("Selected")}
                      disabled={
                        jobApplicants
                          .find(
                            (item) =>
                              item.candidateUserId ===
                              currentCandidateDetails?.[0].userId
                          )
                          .status.includes("Selected") || jobApplicants
                          .find(
                            (item) =>
                              item.candidateUserId ===
                              currentCandidateDetails?.[0].userId
                          )
                          .status.includes("Rejected")
                          ? true
                          : false
                      }
                    />
                    <MagicButton
                      title={
                        jobApplicants
                          .find(
                            (item) =>
                              item.candidateUserId ===
                              currentCandidateDetails?.[0].userId
                          )
                          .status.includes("Rejected")
                          ? "Rejected"
                          : "Reject"
                      }
                      position=""
                      icon=""
                      handleClick={() => handleApplicationSelected("Rejected")}
                      disabled={
                        jobApplicants
                          .find(
                            (item) =>
                              item.candidateUserId ===
                              currentCandidateDetails?.[0].userId
                          )
                          .status.includes("Rejected") || jobApplicants
                          .find(
                            (item) =>
                              item.candidateUserId ===
                              currentCandidateDetails?.[0].userId
                          )
                          .status.includes("Selected")
                          ? true
                          : false
                      }
                    />
                  </div>
                </motion.div> 
                <motion.div
                  variants={animatationVariants}
                  initial="hidden"
                  animate="visable"
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row md:gap-20 gap-8 border-b pb-8 pt-8"
                >
                  <div className="">
                    <h3 className="text-white-100 text-base">Role</h3>
                    <p className="text-gray-400 text-md">
                      {
                        currentCandidateDetails?.[0].candidateInfo
                          .currentCompanyRole
                      }
                    </p>
                  </div>

                  <div>
                    <h3 className="text-white-100 text-base">Experience</h3>
                    <p className="text-gray-400 text-md">
                      {
                        currentCandidateDetails?.[0].candidateInfo
                          .yearsOfExperience
                      }
                      &nbsp; Years
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white-100 text-base">Email</h3>
                    <p className="text-gray-400 text-md">
                      {currentCandidateDetails?.[0].email}
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={animatationVariants}
                initial="hidden"
                animate="visable"
                transition={{ duration: 0.7 }} className="border-b pb-8 pt-8">
                  <p className="text-gray-400 text-md">Superpower Skills</p>
                  <div className="text-gray-400 text-base flex flex-wrap gap-6 mt-4">
                    {currentCandidateDetails?.[0].candidateInfo.skills
                      .split(",")
                      .map((item, index) => (
                        <div key={index}>
                          <span className="bg-purple rounded-t-xl rounded-bl-xl text-black-100 px-3 py-1">
                            {item}
                          </span>
                        </div>
                      ))}
                  </div>
                </motion.div>
                <motion.div variants={animatationVariants}
                initial="hidden"
                animate="visable"
                transition={{ duration: 0.8 }} className="mt-10 mb-10">
                  <p className="text-white-100 text-2xl mb-4">About</p>
                  <p className="text-gray-400 text-base">
                    {currentCandidateDetails?.[0].candidateInfo.coverLetter}
                  </p>
                </motion.div>
              </div>
          </div>
            )}
        </div>
      </div>
    </div>
  );
}
