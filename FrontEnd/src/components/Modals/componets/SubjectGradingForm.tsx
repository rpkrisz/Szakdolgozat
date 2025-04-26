import {FC} from "react";
import {CheckBox, NumberInput} from "@/components/Inputs";
import {handleIsPercentageChange, handleModelNumberChange} from "@/utils/";
import {SubjectForm} from "@/types";

const SubjectGradingForm: FC<{formData: SubjectForm; setFormData: (from: SubjectForm) => void}> = ({
  formData,
  setFormData,
}) => {
  return (
    <div className="flex flex-col">
      <h2>Grade limits</h2>
      <CheckBox
        label="Calculate with percentage"
        name="isPercentage"
        inputData={formData.isPercentage}
        handleChange={e => handleIsPercentageChange(e, formData, setFormData)}
      />
      <NumberInput
        label={`${formData.isPercentage ? "Percentage" : "Points"} for 2`}
        name="pointsFor2"
        inputData={formData.pointsFor2}
        handleChange={e => handleModelNumberChange(e, formData, setFormData)}
      />
      <NumberInput
        label={`${formData.isPercentage ? "Percentage" : "Points"} for 3`}
        name="pointsFor3"
        inputData={formData.pointsFor3}
        handleChange={e => handleModelNumberChange(e, formData, setFormData)}
      />
      <NumberInput
        label={`${formData.isPercentage ? "Percentage" : "Points"} for 4`}
        name="pointsFor4"
        inputData={formData.pointsFor4}
        handleChange={e => handleModelNumberChange(e, formData, setFormData)}
      />
      <NumberInput
        label={`${formData.isPercentage ? "Percentage" : "Points"} for 5`}
        name="pointsFor5"
        inputData={formData.pointsFor5}
        handleChange={e => handleModelNumberChange(e, formData, setFormData)}
      />
      <NumberInput
        label="Maximum available points"
        name="maxScore"
        inputData={formData.maxScore}
        handleChange={e => handleModelNumberChange(e, formData, setFormData)}
      />
    </div>
  );
};

export default SubjectGradingForm;
