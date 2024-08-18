"use client";

import { Drawer, DrawerContent } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import CandidateList from "./CandidateList";

export default function JobApplicants({
  showApplicantDrawer,
  setShowApplicantDrawer,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
  jobApplicants,
}) {
  return (
    <Drawer open={showApplicantDrawer} onOpenChange={setShowApplicantDrawer}>
      <DrawerContent className="h-[90%]">
        <ScrollArea className="h-auto overflow-y-auto">
          <CandidateList
            currentCandidateDetails={currentCandidateDetails}
            setCurrentCandidateDetails={setCurrentCandidateDetails}
            showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
            setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
            jobApplicants={jobApplicants}

          />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
