import Link from "next/link";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import { socialMedia } from "@/data";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[url('/footer-grid.svg')] bg-cover bg-center w-full pt-20 pb-10" id="contact">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
        Post Your Job<span className="text-purple"> Opportunity Today</span>
          <br className="md:block hidden" />
          and Find Perfect Candidate!
        </h1>
        <p className="text-gray-400 mt-4 mb-8 text-center">
        Streamline Your Hiring Process with Easy Job Posting and Effective Candidate Matching!
        </p>
        <Link href={"/post-job"}>
          <MagicButton
            title="Post a job"
            icon={<FaLocationArrow />}
            position="right"
          />
        </Link>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-2">
        <p className="md:text-base text-gray-400 text-sm md:font-normal font-light">
          Copyright &copy; 2024 Workify
        </p>

        <div className="flex items-center md:gap-3 gap-6">
            {socialMedia.map((profile)=>(
                <div key={profile.id} className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300">
                    <Image src={profile.img} alt={profile.img} width={20} height={20}/>
                </div>
            ))}
        </div>
      </div>
    </footer>
  );
}
