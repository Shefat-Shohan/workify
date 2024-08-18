import React, { createContext, useContext, useState, ReactNode } from 'react';


interface JobApplicantsContextType {
  showApplicantDrawer: boolean;
  setShowApplicantDrawer: (value: boolean) => void;
  currentCandidateDetails: any; 
  setCurrentCandidateDetails: (details: any) => void;
  showCurrentCandidateDetailsModal: boolean;
  setShowCurrentCandidateDetailsModal: (value: boolean) => void;
  jobApplicants: any[]; 
}

// Create the context
const JobApplicantsContext = createContext<JobApplicantsContextType | undefined>(undefined);

// Provider component
export const JobApplicantsProvider = ({ children }: { children: ReactNode }) => {
  const [showApplicantDrawer, setShowApplicantDrawer] = useState<boolean>(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState<any>(null);
  const [showCurrentCandidateDetailsModal, setShowCurrentCandidateDetailsModal] = useState<boolean>(false);
  const [jobApplicants, setJobApplicants] = useState<any[]>([]); 

  return (
    <JobApplicantsContext.Provider
      value={{
        showApplicantDrawer,
        setShowApplicantDrawer,
        currentCandidateDetails,
        setCurrentCandidateDetails,
        showCurrentCandidateDetailsModal,
        setShowCurrentCandidateDetailsModal,
        jobApplicants,
      }}
    >
      {children}
    </JobApplicantsContext.Provider>
  );
};

export const useJobApplicants = () => {
  const context = useContext(JobApplicantsContext);
  if (!context) {
    throw new Error('useJobApplicants must be used within a JobApplicantsProvider');
  }
  return context;
};
