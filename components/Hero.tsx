import { TextGenerateEffect } from "../components/ui/TextGenerateEffect";
import Search from "./search/Search";
import { Spotlight } from "./ui/Spotlight";

export default function Hero() {
  return (
    <div className="pb-20 pt-36">
      <div>
        {/* for top right design */}
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>
      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="flex justify-center relative my-20 z-1">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="uppercase tracking-widest text-sm text-center text-white-100 max-w-[80]">
            Discover Your Dream Job Today
          </h2>
          <TextGenerateEffect
            className="text-center text-4xl md:text-5xl lg:text-6xl mb-8 "
            words="Your Gateway to the Best Job Opportunities"
          />
          <Search />
        </div>
      </div>
    </div>
  );
}
