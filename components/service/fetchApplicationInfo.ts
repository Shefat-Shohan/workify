import { Applicant } from "../CandidateActivity";
const fetchApplicationInfo = async (id:string | undefined) => {
    try {
      const res = await fetch("https://66afff066a693a95b537a511.mockapi.io/application");
      if (!res.ok) {
        throw new Error("Error fetching user data.");
      }
      const applicationData = await res.json();
      const result = applicationData
        .filter((applicants:Applicant) => applicants && applicants.jobId == id)
        
      return result ? [result] : [];
    } catch (error) {
    }
  };
  
  export default fetchApplicationInfo;
  