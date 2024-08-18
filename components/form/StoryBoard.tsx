import { motion } from "framer-motion";
import Image from "next/image";
export default function StoryBoard() {
  return (
    <div className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-16 px-5">
      <div className="max-w-7xl w-full">
        <div className="flex flex-col-reverse justify-between md:flex-row items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-gray-400 te">Step 1</p>
            <h1 className="lg:text-5xl my-6 text-3xl font-normal text-white-200">
              Tell us about your job offer
            </h1>
            <p className="text-[16px] font-normal max-w-[500px] text-gray-400">
              In this step, we&apos;ll ask you about the job type, job name, a brief
              job description, and information about your company. This will
              help us understand your needs and assist you more effectively.
            </p>
          </motion.div>

          <div>
            <img
              src="storyboard-bg.svg"
              alt="form-bg"
              className="w-full h-full md:w-[600px] md:h-[600px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
