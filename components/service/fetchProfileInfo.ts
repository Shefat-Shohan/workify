
type UserDataType = {
  id: string | number;
  recruiterInfo:{
    name: string;
    companyName: string;
    companyRole:string;
  },
  role: string;
  userId:string;
  email:string;
  isPremiumUser:boolean;
}

const fetchUserProfileInfo = async (id: string | undefined) => {
  try {
    const res = await fetch("https://66bf797c42533c4031464979.mockapi.io/workify/users");
    if (!res.ok) {
      throw new Error("Error fetching user data.");
    }
    const userData = await res.json();
    const result = userData
      .find((loggedInUser:UserDataType) => loggedInUser && loggedInUser.userId == id)
    return result ? [result] : [];
  } catch (error) {
  }
};

export default fetchUserProfileInfo;
