import Image from "next/image";
import { div } from "three/examples/jsm/nodes/Nodes.js";
import { BackgroundGradientAnimation } from "./ui/GradientBg";
import { GlobeDemo } from "./ui/GridGlobe";
import Link from "next/link";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";

export default function Grid() {
  return (
    <div id="features">
      <div className="grid gap-6 md:grid-cols-6 md:grid-rows-4 h-[90vh] relative mb-80 md:mb-0">
        {/* grid 1 */}
        <div className="md:col-span-4 md:row-span-2 flex items-end md:p-10 p-6 pt-20 md:pt-0 rounded-lg bg-[url('/b1.svg')] bg-cover border border-gray-50\90">
          <h2 className="font-sans font-bold text-lg lg:text-2xl max-w-96 pt-20 hover:translate-x-1 transition text-white-100">
            Discover Remote Work Opportunities
          </h2>
        </div>
        {/* grid 2 */}
        <div className="md:col-span-2 bg-[#04071D] flex flex-col items-center rounded-lg border border-gray-50/15 overflow-hidden pb-40 md:pb-0">
          <h2 className="font-sans font-bold text-lg lg:text-2xl max-w-96 hover:translate-x-1  transition pt-10 pl-10 md:pl-6 md:pt-6 text-white-100">
            Connect with Leading Employers
          </h2>
          <GlobeDemo />
        </div>

        {/* grid 3 */}
        <div className="py-20 md:py-0 md:col-span-2 bg-[#04071D] flex justify-between rounded-lg items-center border border-gray-50/15 overflow-hidden relative">
          <div className="p-10 md:p-6 hover:translate-x-1 transition z-10">
            <p className="md:tracking-wider text-sm md:text-xs text-gray-400">
              Matching Career Paths
            </p>
            <h2 className="font-sans font-bold text-lg lg:text-2xl max-w-96 text-white-100">
              Explore Career Paths
            </h2>
          </div>
          <div className="flex gap-2 lg:gap-3 w-fit absolute -right-3 lg:-right-2">
            <div className="flex flex-col gap-3 lg:gap-6">
              {["react.js", "Next.js", "node.js"].map((item) => (
                <span
                  key={item}
                  className="py-3 lg:py-3 lg:px-6 px-8 text-xs lg:text-sm opacity-50 lg:opacity-100 rounded-md text-center bg-[#10132e]"
                >
                  {item}
                </span>
              ))}
              <span className="py-4 px-3 rounded-lg text-center bg-[#10132e]" />
            </div>
            <div className="flex flex-col gap-3 lg:gap-6">
              <span className="py-4 px-3 rounded-lg text-center bg-[#10132e]" />
              {["react.js", "Next.js", "node.js"].map((item) => (
                <span
                  key={item}
                  className="py-3 lg:py-3 lg:px-6 px-8 text-xs lg:text-sm opacity-50 lg:opacity-100 rounded-md text-center bg-[#10132e]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* grid 4 */}
        <div className="bg-bentoGrid-b4 bg-cover bg-center md:p-10 p-6 md:pt-6 py-20 md:py-0 md:col-span-2 rounded-lg border border-gray-40/15 overflow-hidden relative">
          <h2 className="font-sans font-bold text-lg lg:text-2xl max-w-96 hover:translate-x-1 transition text-white-100">
            Access Exclusive Job Offers
          </h2>
          <img src="/b4.svg" alt="bg" className="absolute right-0 bottom-0" />
        </div>
        {/* grid 6 */}
        <div className="py-20 bg-[url('/grid.svg')] bg-cover bg-center flex items-center md:col-span-4 md:row-span-2 rounded-lg border border-gray-50/15 md:p-10 p-6 overflow-hidden relative">
          <div className="hover:translate-x-1 transition">
            <p className="md:tracking-wider text-sm md:text-sm text-gray-500">
              THE INSIDE SCOPE
            </p>
            <h2 className="font-sans font-bold text-lg lg:text-3xl max-w-96 pt-1 text-white-100">
              Get Career Advice and Tips
            </h2>
          </div>

          <img
            src="/b5.svg"
            alt="background"
            className="object-cover object-center absolute right-0 bottom-0 h-[100%] md:h-[80%] lg:f-full"
          />
        </div>
        {/* grid 5 */}
        <div className="bg-[#04071D] flex flex-col items-center md:col-span-2 justify-center rounded-lg border border-gray-50/15 overflow-hidden relative py-20 md:py-0 md:p-10 p-6">
          <BackgroundGradientAnimation></BackgroundGradientAnimation>
          <div className="absolute z-30 text-white-100 font-bold flex flex-col items-center p-10 md:p-6">
            <h2 className="font-sans font-bold text-lg lg:text-2xl max-w-96 text-white-100">
              Browse Latest Job Listings
            </h2>
            <Link href={"#"} className="md:mt-6 mt-6">
              <MagicButton
                title="Browse Jobs"
                icon={<FaLocationArrow />}
                position="right"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
