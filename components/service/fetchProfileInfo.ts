export type UserDataType = {
  id: string | number;
  recruiterInfo: {
    name: string;
    companyName: string;
    companyRole: string;
  };
  candidateInfo: {
    coverLetter: string;
    currentCompanyName: string;
    currentCompanyRole: string;
    name: string;
    skills: string;
    yearsOfExperience: string;
  };
  role: string;
  userId: string;
  email: string;
  isPremiumUser: boolean;
};

const fetchUserProfileInfo = async (id: string | undefined) => {
  try {
    const res = await fetch(
      "https://66bf797c42533c4031464979.mockapi.io/workify/users"
    );
    if (!res.ok) {
      throw new Error("Error fetching user data.");
    }
    const userData: UserDataType[] = await res.json();
    const userMap = new Map(userData.map((user) => [user.userId, user]));
    const result = userMap.get(id as string);

    return result ? [result] : [];
  } catch (error) {
    console.error("Error in fetching user profile info:", error);
    return [];
  }
};

export default fetchUserProfileInfo;
