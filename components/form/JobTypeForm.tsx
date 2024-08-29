import { jobTypes } from "@/data";
import { JobFormDetailsProps } from "./JobSalaryForm";

export default function JobTypeForm({ formData, setFormData }:JobFormDetailsProps) {
  const handleClick = (jobType:string) => {
    setFormData({
      ...formData,
      type: jobType,
    });
  };

  return (
    <div className="w-full my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[50vh]">
        {jobTypes.map((jobType, index) => (
          <div key={index} className="bg-black-200 col-span-1 rounded-lg">
            <div
              onClick={() => handleClick(jobType.title)}
              className={`
                rounded-lg border p-4 flex flex-col gap-3
     hover:border-purple transition cursor-pointer text-center text-gray-400 ${
       formData.type == jobType.title ? "border-purple" : ""
     } `}
            >
              {jobType.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
