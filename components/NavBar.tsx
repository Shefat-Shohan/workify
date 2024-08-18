import NavMenu from './NavMenu'
import { currentUser } from '@clerk/nextjs/server'
import fetchUserProfileInfo from './service/fetchProfileInfo';

export default async function Navbar() {
    const user = await currentUser();
    const profileInfo = await fetchUserProfileInfo(user?.id)
  return (
    <NavMenu profileInfo={profileInfo}/>
  )
}
