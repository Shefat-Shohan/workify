import NavMenu from './NavMenu'
import { currentUser } from '@clerk/nextjs/server'
import fetchUserProfileInfo, { UserDataType } from './service/fetchProfileInfo';

export default async function Navbar() {
    const user = await currentUser();
    const profileInfo:UserDataType[] | undefined = await fetchUserProfileInfo(user?.id);
  return (
    <NavMenu profileInfo={profileInfo}/>
  )
}
