import { motion } from "framer-motion";
export default function JobDetailsForm({ formData, setFormData }) {
  console.log(formData);
  return (
    <div className="w-full sm:px-16 px-5">
      <div className="flex flex-col gap-6 my-10 p-6">
        <motion.input
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          value={formData.title}
          required
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          type="text"
          placeholder="Job Title"
          className="border rounded-lg w-full px-4 py-3 bg-black-200 text-gray-400 outline-none"
        />
        <motion.textarea
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          value={formData.description}
          required
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Job Details"
          className="border rounded-lg resize-none w-full px-4 pt-2 h-60 bg-black-200 outline-none text-gray-400"
        ></motion.textarea>
      </div>
    </div>
  );
}
