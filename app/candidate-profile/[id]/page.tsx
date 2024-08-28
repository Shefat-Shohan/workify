"use client";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import MagicButton from "@/components/ui/MagicButton";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import useFetch from "@/components/service/useFetch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast"

type CandidateProfile = {
  candidateInfo: {
    coverLetter:string
    currentCompanyName:string
    currentCompanyRole:string
    name:string
    skills:string
    yearsOfExperience:string

  },
  email:string
  id:string
  isPremiumUser:boolean
  role:string
  useId: string
}

type JobAplicants = {
  candidateUserId:string;
  coverLetter:string;
  email:string;
  expectedSalary:string;
  id:string;
  jobApplicationDate:string;
  jobId:string;
  name:string;
  recruiterId:string;
  status:string[];
}
export default function CandidateProfile({
  params: { id },
}: {
  params: { id: string | number };
}) {
  const router = useRouter();
  const {toast} = useToast();
  const searchParams = useSearchParams();
  const candidateUserId = id;
  const appliedJobId = searchParams.get("jobId");
  // make the popup dismiss

  function onDismiss() {
    router.back();
  }
  const { data } = useFetch(
    `https://66afff066a693a95b537a511.mockapi.io/application?jobId=${appliedJobId}&candidateUserId=${candidateUserId}`
  );

  const jobApplicants = data as JobAplicants[] | null;
  console.log(jobApplicants);

  // fetch the current user profileinfo
  const { data: currentCandidateProfileDetails } = useFetch(
    `https://66bf797c42533c4031464979.mockapi.io/workify/users?userId=${candidateUserId}`
  );
// select/reject candidate application

const handleApplicationSelected = async (getCurrentStatus:string) => {

  if(!jobApplicants || jobApplicants.length === 0){
    console.log("No job application found");
    return;
  }

  const updateSelect = {
    candidateUserId: candidateUserId,
    email: jobApplicants?.[0].email,
    jobApplicationDate: jobApplicants?.[0].jobApplicationDate,
    jobId: jobApplicants?.[0].jobId,
    name: jobApplicants?.[0].name,
    recruiterId: jobApplicants?.[0].recruiterId,
    status: ["Applied", getCurrentStatus],
    id: jobApplicants?.[0].id,
    coverLetter:jobApplicants?.[0].coverLetter,
    expectedSalary: jobApplicants?.[0].expectedSalary
  }
  await fetch(
    "https://66afff066a693a95b537a511.mockapi.io/application/" +
    jobApplicants?.[0].id,
    {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updateSelect),
    }
  );
  router.back();
  toast({
    title: `Candidate ${getCurrentStatus}.`,
  })
  console.log(updateSelect);
}
  // fetch the job application candidate applied on.

  // elements animation
  const animatationVariants = {
    hidden: { opacity: 0, y: 20 },
    visable: { opacity: 1, y: 0 },
  };

  return (
    <Drawer open={true} onClose={onDismiss}>
      <DrawerContent className="h-[90%]">
        <ScrollArea>
          <div className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
            <div className="max-w-7xl w-full pt-16">
              <div>
                {currentCandidateProfileDetails.map((profile:CandidateProfile) => (
                  <div key={profile.id}>
                    <div>
                      <div>
                        <motion.div
                          variants={animatationVariants}
                          initial="hidden"
                          animate="visable"
                          transition={{ duration: 0.2 }}
                          className="mt-10 md:mt-0 flex flex-wrap md:flex-row gap-6 md:gap-0 justify-between border-b pb-4"
                        >
                          <div>
                            <h2 className="text-3xl text-white-100">
                              {profile.candidateInfo.name}
                            </h2>
                            <p className="text-sm text-gray-400 pt-1">
                              Work At: &nbsp;
                              {profile.candidateInfo.currentCompanyName}
                            </p>
                          </div>
                          <div className=" flex gap-6 items-center">
                            {/* Select Button */}
                            <MagicButton title={jobApplicants?.[0]?.status.includes("Selected") ? "Selected": "Select"}
                            position="" icon="" handleClick={() => handleApplicationSelected("Selected")} 
                            disabled={ jobApplicants?.[0]?.status.includes("Selected") || jobApplicants?.[0]?.status.includes("Rejected") ? true : false }
                            />
                            
                            {/* Reject Button */}
                            <MagicButton title={jobApplicants?.[0]?.status.includes("Rejected") ? "Rejected": "Reject"}
                            position="" icon="" handleClick={() => handleApplicationSelected("Rejected")}
                            disabled={ jobApplicants?.[0]?.status.includes("Selected") || jobApplicants?.[0]?.status.includes("Rejected") ? true : false }
                            />
                          </div>
                        </motion.div>
                        <motion.div
                          variants={animatationVariants}
                          initial="hidden"
                          animate="visable"
                          transition={{ duration: 0.3 }}
                          className="flex flex-col md:flex-row md:gap-20 gap-8 border-b pb-8 pt-8"
                        >
                          <div>
                            <h3 className="text-white-100 text-base">Role</h3>
                            <p className="text-gray-400 text-md">
                              {profile.candidateInfo.currentCompanyRole}
                            </p>
                          </div>

                          <div>
                            <h3 className="text-white-100 text-base">
                              Experience
                            </h3>
                            <p className="text-gray-400 text-md">
                              {profile.candidateInfo.yearsOfExperience}
                              &nbsp; Years
                            </p>
                          </div>
                          <div>
                            <h3 className="text-white-100 text-base">Email</h3>
                            <p className="text-gray-400 text-md">
                              {profile.email}
                            </p>
                          </div>
                        </motion.div>
                        <motion.div
                          variants={animatationVariants}
                          initial="hidden"
                          animate="visable"
                          transition={{ duration: 0.4 }}
                          className="border-b pb-8 pt-8"
                        >
                          <p className="text-gray-400 text-md">
                            Superpower Skills
                          </p>
                          <div className="text-gray-400 text-base flex flex-wrap gap-6 mt-4">
                            {profile.candidateInfo.skills
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
                        <motion.div
                          variants={animatationVariants}
                          initial="hidden"
                          animate="visable"
                          transition={{ duration: 0.5 }}
                          className="mt-10 mb-10"
                        >
                          <p className="text-white-100 text-2xl mb-4">
                            Cover Letter
                          </p>
                          <div className="text-gray-400 text-base">
                            {jobApplicants?.map((profile:JobAplicants) => (
                              <p key={profile.name}>{profile.coverLetter}</p>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
