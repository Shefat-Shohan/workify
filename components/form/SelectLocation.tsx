"use client";

import Select from "react-select";
import useCountries from "../service/useCountry";
import { useState } from "react";
import { motion } from "framer-motion";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "rgba(17, 25, 40, 0.75)",
    fontsize: "18px",
    border: "transparent",
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "rgba(17, 25, 40, 0.75)",
  }),
  input: (provided, state) => ({
    ...provided,

    color: "rgba(17, 25, 40, 0.75)",
    fontSize: "16px",
    padding: "8px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "purple"
      : state.isFocused
      ? "rgba(255, 255, 255, 0.125)"
      : "rgba(17, 25, 40, 0.75)",
    color: state.isSelected ? "white" : "white",
  }),
};

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface countrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const SelectLocation: React.FC<countrySelectProps> = ({
  value,
  onChange,
  formData,
}) => {
  const { getAll } = useCountries();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[35vh] my-10"
    >
      <Select
        placeholder="Anywhere"
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        styles={customStyles}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div className="text-white-200">{option.flag}</div>
            <div className="text-white-100">
              {option.label},
              <span className="text-xs text-gray-400 ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
      />
    </motion.div>
  );
};

export default SelectLocation;
