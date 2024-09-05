import Clients from "@/components/Clients";
import fetchuserProfileInfo from "@/components/service/fetchProfileInfo";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import JobListings from "@/components/JobListings";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  const profileInfo = await fetchuserProfileInfo(user?.id);

  if (user && profileInfo?.length == 0) redirect("/onboard");

  return (
    <>
      <main className="relative flex justify-center items-center flex-col mx-auto flex-grow w-full sm:px-10 px-5">
        <div className="max-w-7xl">
          <Hero />
          <Grid />
          <JobListings />
        </div>
      </main>
      <Footer />
    </>
  );
}

// check rechart
