import CandidateActivity from '@/components/CandidateActivity';
import fetchUserProfileInfo from '@/components/service/fetchProfileInfo';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function page() {
const user = await currentUser();
const currentuserId: string | undefined = user?.id;
const profileInfo = await fetchUserProfileInfo(user?.id);
const candidateUser = profileInfo?.find(user => user.role === "candidate");
  if (!candidateUser) redirect("/");
  return (
    <div>
        <CandidateActivity currentuserId= {currentuserId} />
    </div>
  )
}
