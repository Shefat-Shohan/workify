import ApplyJob from '@/components/ApplyJob';
import fetchUserProfileInfo from '@/components/service/fetchProfileInfo';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React, { FC } from 'react'
type applyPageProps = {
  params: { id: string };
};
const page: FC<applyPageProps> = async ({ params }) => {
  const { id } = params;
  const user = await currentUser();
  const profileInfo = await fetchUserProfileInfo(user?.id);
  const candidateUser = profileInfo?.find(user => user.role === "candidate");
  if (!candidateUser) redirect("/sign-up");
  return (
    <div>
      <ApplyJob id={id}/>
    </div>
  )
}

export default page
