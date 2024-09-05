import { companies, testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import Image from "next/image";

export default function Clients() {
  return (
    <div className="pt-10 md:pt-20 max-w-[100%] overflow-hidden" id="clients">
      <h2 className="heading text-white-100 text-center">
        Success Stories from
        <span className="text-purple">Happy Job Seekers</span>
      </h2>
      <div className="flex flex-col items-center justify-center p-4 mt-10 space-y-8 md:space-y-12">
        <div className="w-full overflow-x-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {companies.map(({ id, img, name, nameImg }) => (
            <div key={id} className="flex items-center gap-2 md:gap-4">
              <Image
                width={60}
                height={40}
                src={img}
                alt={name}
                className="w-10 md:w-16"
              />
              <Image
                width={60}
                height={40}
                src={nameImg}
                alt={nameImg}
                className="w-20 md:w-28"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
