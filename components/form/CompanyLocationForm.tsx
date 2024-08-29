import SelectLocation from "./SelectLocation";
import { JobFormDetailsProps } from "./JobSalaryForm";

const CompanyLocationForm = ({formData, setFormData}:JobFormDetailsProps) => {
  return (
    <div className="w-full sm:px-16 px-5">
    <SelectLocation formData = {formData} onChange={(value) => setFormData({...formData, CountryLocation: value.label, StateLocation: value.region, LocationFlag: value.flag
    })} />
  </div>
  )
}

export default CompanyLocationForm