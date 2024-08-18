import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { salarys } from "@/data";


export default function JobSalaryForm({formData, setFormData}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = ({salary}) => {
    setFormData({...formData, salary: salary.title})
    setIsOpen(false);
  };
  return (
    <div className="relative my-10 w-full">
      <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[37vh] sm:px-16 px-5">
        <div
          className="bg-black-200 border rounded-md shadow-md p-3 cursor-pointer flex justify-between items-center text-gray-400"
          onClick={toggleOpen}
        >
          {formData.salary || "Salary Range"}
          <ChevronUpDownIcon className="w-5 h-5" />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-12 left-0 right-0 bg-black-200 rounded-md shadow-md mt-2 sm:mx-16 mx-5"
            >
              {salarys.map((salary) => (
                <div
                  key={salary.id}
                  className="p-3 hover:bg-black-300 cursor-pointer hover:rounded text-gray-400 "
                  onClick={() => handleSelect({salary})}
                >
                  {salary.title}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
