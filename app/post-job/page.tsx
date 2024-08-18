import fetchUserProfileInfo from "@/components/service/fetchProfileInfo";
import Form from "@/components/form/Form";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function page() {
  const user = await currentUser();
  const profileInfo = await fetchUserProfileInfo(user?.id);
  if (profileInfo?.length == 0) redirect("/onboard");
  const userId = user?.id;
  return (
    <div>
      <Form userId={userId} />
    </div>
  );
}
