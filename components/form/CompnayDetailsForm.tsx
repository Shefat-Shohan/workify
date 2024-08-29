import { useState } from "react";
import {motion} from "framer-motion";
import { JobFormDetailsProps } from "./JobSalaryForm";
export default function CompnayDetailsForm({ formData, setFormData }:JobFormDetailsProps) {
  return (
    <div className="w-full sm:px-16 px-5 ">
      <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 my-10">
        <input
          value={formData.companyName}
          onChange={(e) =>
            setFormData({ ...formData, companyName: e.target.value })
          }
          type="text"
          placeholder="Company Name"
          className="border w-full px-4 py-3 bg-black-200 rounded-lg outline-none text-gray-400 "
        />
        <textarea
          value={formData.companyDescription}
          onChange={(e) =>
            setFormData({ ...formData, companyDescription: e.target.value })
          }
          placeholder="About company"
          className="border resize-none w-full px-4 pt-2 h-40 bg-black-200 rounded-lg text-gray-400"
        />
        <input
          value={formData.contactEmail}
          onChange={(e) =>
            setFormData({ ...formData, contactEmail: e.target.value })
          }
          type="email"
          placeholder="Company email"
          className="border w-full px-4 py-3 bg-black-200 rounded-lg outline-none text-gray-400"
        />
        <input
          value={formData.contactPhone}
          onChange={(e) =>
            setFormData({ ...formData, contactPhone: e.target.value })
          }
          type="text"
          placeholder="Company phone"
          className="border w-full px-4 py-3 bg-black-200 rounded-lg outline-none text-gray-400"
        />
      </motion.div>
    </div>
  );
}
