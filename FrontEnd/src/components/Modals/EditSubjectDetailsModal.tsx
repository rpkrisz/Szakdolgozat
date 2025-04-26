import {FC, useEffect, useState} from "react";
import {CheckBox, NumberInput, TextInput} from "@/components/Inputs";
import {
  cancelModalForm,
  closeModal,
  handleIsPercentageChange,
  handleModalFormChange,
  handleModelNumberChange,
} from "@/utils/";
import {entries} from "lodash";
import {modalNames} from ".";
import {useUpdateSubject} from "@/services";
import {Subject} from "@/types";
import {toast} from "react-toastify";

const EditSubjectDetailsModal: FC<{subjectData: Subject}> = ({subjectData}) => {
  const [form, setForm] = useState(subjectData);
  const [updateSubjectDetails] = useUpdateSubject();

  useEffect(() => {
    setForm({...subjectData});
  }, [subjectData]);

  const update = async () => {
    if (
      entries(form).some(([key, value]) => {
        if (["semesterID", "universityID", "maxScore"].includes(key)) return !value;
        return false;
      })
    )
      return toast.error("Some fields are missing!");
    try {
      await updateSubjectDetails(form);
    } catch (error) {
      toast.error("Subject Details saving faild!");
    }

    setForm({...form});
    closeModal(modalNames.EditSubjectDetailsModal);
  };

  return (
    <dialog id={modalNames.EditSubjectDetailsModal} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Subject details!</h3>
        <div className="flex flex-col">
          <h2>General informations</h2>
          <TextInput
            label="Course placement"
            name="coursePlacement"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.coursePlacement}
            required={true}
          />
          <TextInput
            label="Mark conditions"
            name="markConditions"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.markConditions}
            required={true}
          />
          <TextInput
            label="Scores"
            name="scores"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.scores}
            required={true}
          />
          <TextInput
            label="Bonus exercise"
            name="bonusExercise"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.bonusExercise}
            required={true}
          />
          <TextInput
            label="Mark"
            name="mark"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.mark}
            required={true}
          />
          <TextInput
            label="Exam type"
            name="examType"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.examType}
            required={true}
          />
          <TextInput
            label="Readings"
            name="readings"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.readings}
            required={true}
          />
          <NumberInput
            label="Absences"
            name="absences"
            handleChange={e => handleModelNumberChange(e, form, setForm)}
            inputData={form.absences}
            required={true}
          />
          <TextInput
            label="Programing language"
            name="programingLanguage"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.programingLanguage}
            required={true}
          />
          <TextInput
            label="Course page"
            name="coursePage"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.coursePage}
            required={true}
          />
          <NumberInput
            label="Weekly time consumption in minutes"
            name="weeklyTimeConsumption"
            handleChange={e => handleModelNumberChange(e, form, setForm)}
            inputData={form.weeklyTimeConsumption}
            required={true}
          />
          <div className="bg-primary text-primary-content bg-opacity-15 my-2 p-2">
            <h2>Grade limits</h2>
            <CheckBox
              label="Calculate with percentage"
              name="isPercentage"
              inputData={form.isPercentage}
              handleChange={e => handleIsPercentageChange(e, form, setForm)}
            />
            <NumberInput
              label={`${form.isPercentage ? "Percentage" : "Points"} for 2`}
              name="pointsFor2"
              inputData={form.pointsFor2}
              handleChange={e => handleModelNumberChange(e, form, setForm)}
            />
            <NumberInput
              label={`${form.isPercentage ? "Percentage" : "Points"} for 3`}
              name="pointsFor3"
              inputData={form.pointsFor3}
              handleChange={e => handleModelNumberChange(e, form, setForm)}
            />
            <NumberInput
              label={`${form.isPercentage ? "Percentage" : "Points"} for 4`}
              name="pointsFor4"
              inputData={form.pointsFor4}
              handleChange={e => handleModelNumberChange(e, form, setForm)}
            />
            <NumberInput
              label={`${form.isPercentage ? "Percentage" : "Points"} for 5`}
              name="pointsFor5"
              inputData={form.pointsFor5}
              handleChange={e => handleModelNumberChange(e, form, setForm)}
            />
            <NumberInput
              label="Maximum available points"
              name="maxScore"
              inputData={form.maxScore}
              handleChange={e => handleModelNumberChange(e, form, setForm)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 p-2 modal-backdrop">
          <button
            className="btn btn-secondary"
            onClick={() => cancelModalForm(subjectData, setForm, modalNames.EditSubjectDetailsModal)}
          >
            Cancel
          </button>
          <button className="btn btn-accent" onClick={update}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditSubjectDetailsModal;
