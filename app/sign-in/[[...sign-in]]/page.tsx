import { SignIn } from '@clerk/nextjs'

export default function page() {
  return (
    <div className="h-screen flex items-center justify-center">
        < SignIn fallbackRedirectUrl="/" />
    </div>
  )
}
