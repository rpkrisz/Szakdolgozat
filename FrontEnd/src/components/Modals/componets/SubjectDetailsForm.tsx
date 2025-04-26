import {FC} from "react";
import {NumberInput, TextInput} from "@/components/Inputs";
import {handleModalFormChange, handleModelNumberChange} from "@/utils/";
import {SubjectForm} from "@/types";

const SubjectDetailsForm: FC<{formData: SubjectForm; setFormData: (from: SubjectForm) => void}> = ({
  formData,
  setFormData,
}) => {
  return (
    <div className="flex flex-col">
      <h2>Subject details</h2>
      <TextInput
        label="Course placement"
        name="coursePlacement"
        handleChange={e => handleModalFormChange(e, formData, setFormData)}
        inputData={formData.coursePlacement}
        required={true}
      />
      <TextInput
        label="Mark conditions"
        name="markConditions"
        handleChange={e => handleModalFormChange(e, formData, setFormData)}
        inputData={formData.markConditions}
        required={true}
      />
      <TextInput
        label="Scores"
        name="scores"
        handleChange={e => handleModalFormChange(e, formData, setFormData)}
        inputData={formData.scores}
        required={true}
      />
      <TextInput
        label="Bonus exercise"
        name="bonusExercise"
        handleChange={e => handleModalFormChange(e, formData, setFormData)}
        inputData={formData.bonusExercise}
        required={true}
      />
      <TextInput
        label="Mark"
        name="mark"
        handleChange={e => handleModalFormChange(e, formData, setFormData)}
        inputData={formData.mark}
        required={true}
      />
      <TextInput
        label="Exam type"
        name="examType"
        handleChange={e => handleModalFormChange(e, formData, setFormData)}
        inputData={formData.examType}
        required={true}
      />
      <TextInput
        label="Readings"
        name="readings"
        handleChange={e => handleModalFormChange(e, formData, setFormData)}
        inputData={formData.readings}
        required={true}
      />
      <NumberInput
        label="Absences"
        name="absences"
        handleChange={e => handleModelNumberChange(e, formData, setFormData)}
        inputData={formData.absences}
        required={true}
      />
      <TextInput
        label="Programing language"
        name="programingLanguage"
        handleChange={e => handleModalFormChange(e, formData, setFormData)}
        inputData={formData.programingLanguage}
        required={true}
      />
      <TextInput
        label="Course page"
        name="coursePage"
        handleChange={e => handleModalFormChange(e, formData, setFormData)}
        inputData={formData.coursePage}
        required={true}
      />
      <NumberInput
        label="Weekly time consumption in minutes"
        name="weeklyTimeConsumption"
        handleChange={e => handleModelNumberChange(e, formData, setFormData)}
        inputData={formData.weeklyTimeConsumption}
        required={true}
      />
    </div>
  );
};

export default SubjectDetailsForm;
