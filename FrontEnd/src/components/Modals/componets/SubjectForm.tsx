import {FC} from "react";
import {TextInput, NumberInput, SelectInput, TextArea} from "@/components/Inputs";
import {
  handleModalFormChange,
  handleModelNumberChange,
  handleSelectChange,
  handleSelectNumberChange,
  handleTextAreaChange,
} from "@/utils/";
import {SubjectForm as SubjectFormType} from "@/types";
import {useGetUniversitiesNames} from "@/services";

const grades = [
  {
    value: "-1",
    text: "Not graded",
  },
  {
    value: "1",
    text: "1",
  },
  {
    value: "2",
    text: "2",
  },
  {
    value: "3",
    text: "3",
  },
  {
    value: "4",
    text: "4",
  },
  {
    value: "5",
    text: "5",
  },
];

const courseTypes = [
  {
    value: "Lecture",
    text: "Lecture",
  },
  {
    value: "Practice",
    text: "Practice",
  },
  {
    value: "Lecture & Practice",
    text: "Lecture & Practice",
  },
];

const SubjectForm: FC<{
  semesters: {value: number; text: string}[];
  formData: SubjectFormType;
  setFormData: (form: SubjectFormType) => void;
}> = ({semesters, formData, setFormData}) => {
  const [universitiesNames] = useGetUniversitiesNames();
  let universities = [{value: "0", text: "Loading"}];
  if (universitiesNames) {
    universities = universitiesNames.map(pair => ({value: String(pair.id), text: pair.name}));
  }

  return (
    <div className="flex flex-col">
      <h2>General informations</h2>
      <TextInput
        label="Subject name"
        name="name"
        handleChange={e => handleModalFormChange(e, formData, setFormData)}
        inputData={formData.name}
        required={true}
      />
      <SelectInput
        label="Course type"
        name="courseType"
        options={courseTypes}
        handleChange={e => handleSelectChange(e, formData, setFormData)}
        inputData={formData.courseType}
        required={true}
      />
      <NumberInput
        label="Credit"
        name="credit"
        handleChange={e => handleModelNumberChange(e, formData, setFormData)}
        inputData={formData.credit}
        required={true}
      />
      <SelectInput
        label="University"
        name="universityID"
        options={universities}
        handleChange={e => handleSelectNumberChange(e, formData, setFormData)}
        inputData={formData.universityID}
        required={true}
      />
      <SelectInput
        label="Semester"
        name="semesterID"
        options={semesters}
        handleChange={e => handleSelectNumberChange(e, formData, setFormData)}
        inputData={formData.semesterID}
        required={true}
      />
      <SelectInput
        label="Grade"
        name="grade"
        options={grades}
        handleChange={e => handleSelectNumberChange(e, formData, setFormData)}
        inputData={formData.grade}
        required={true}
      />
      <TextArea
        label="Notes"
        name="notes"
        handleChange={e => handleTextAreaChange(e, formData, setFormData)}
        inputData={formData.notes}
        required={true}
      />
    </div>
  );
};

export default SubjectForm;
