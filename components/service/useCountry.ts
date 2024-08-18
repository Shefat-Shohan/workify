import { label } from "three/examples/jsm/nodes/Nodes.js";
import countries from "world-countries";

const formatedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlan: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formatedCountries;
  const getByValue = (value: string) => {
    return formatedCountries.find((item) => item.value === value);
  };
  return {
    getAll,
    getByValue,
  };
};

export default useCountries;