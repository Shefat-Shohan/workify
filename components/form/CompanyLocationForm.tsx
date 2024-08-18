import React, { useState } from "react";
import SelectLocation from "./SelectLocation";

const CompanyLocationForm = ({formData, setFormData}) => {
  return (
    <div className="w-full sm:px-16 px-5">
    <SelectLocation formData = {formData} onChange={(value) => setFormData({...formData, CountryLocation: value.label, StateLocation: value.region, LocationFlag: value.flag
    })} />
  </div>
  )
}

export default CompanyLocationForm