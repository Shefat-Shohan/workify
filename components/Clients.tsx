import { companies, testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import Image from "next/image";

export default function Clients() {
  return (
    <div className="pt-10 md:pt-20" id="clients">
      <h2 className="heading text-white-100">
      Success Stories from  <span className="text-purple">Happy Job Seekers</span>
      </h2>
      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10 max-lg:mt-10">
        
          <InfiniteMovingCards
            items ={testimonials}
            direction="right"
            speed="slow"
          />
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
            {companies.map(({id,img,name,nameImg})=>(
                <div key={id} className="flex md:max-w-60 max-w-32 gap-2">
                    <Image width={60} height={40} src={img} alt={name} className="md:w-10 w-5"/>
                    <Image width={60} height={40} src={nameImg} alt={nameImg} className="md:w-24 w-20"/>
                </div>
            ))}
          </div>
      </div>
    </div>
  );
}
