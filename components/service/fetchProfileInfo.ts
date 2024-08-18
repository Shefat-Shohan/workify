const fetchUserProfileInfo = async (id) => {
  try {
    const res = await fetch("https://66bf797c42533c4031464979.mockapi.io/workify/users");
    if (!res.ok) {
      throw new Error("Error fetching user data.");
    }
    const userData = await res.json();
    const result = userData
      .find((loggedInUser) => loggedInUser && loggedInUser.userId == id)
      
    return result ? [result] : [];
  } catch (error) {
  }
};

export default fetchUserProfileInfo;
