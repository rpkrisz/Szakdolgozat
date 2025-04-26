import {FC, useEffect, useState} from "react";
import {TextInput, NumberInput, SelectInput, TextArea} from "@/components/Inputs";
import {
  cancelModalForm,
  closeModal,
  handleModalFormChange,
  handleModelNumberChange,
  handleSelectChange,
  handleSelectNumberChange,
  handleTextAreaChange,
} from "@/utils/";
import {Subject} from "@/types";
import {entries} from "lodash";
import {useUpdateSubject} from "@/services";
import {modalNames} from ".";
import {toast} from "react-toastify";

const grades = [
  {
    value: "0",
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

const EditSubjectModal: FC<{subjectData: Subject}> = ({subjectData}) => {
  const [form, setForm] = useState(subjectData);
  const [updateSubject] = useUpdateSubject();

  useEffect(() => {
    setForm({...subjectData});
  }, [subjectData]);

  const update = async () => {
    const formdata = {...form, isGraded: form.grade > 0};

    if (
      entries(formdata).some(([key, value]) => {
        if (["name", "courseType", "credit", "semesterID", "universityID"].includes(key)) return !value;
        return false;
      })
    )
      return toast.error("Some fields are missing!");
    try {
      await updateSubject(formdata);
    } catch (error) {
      toast.error("Subject saving faild!");
    }

    setForm({...form});
    closeModal(modalNames.EditSubjectModal);
  };

  return (
    <dialog id={modalNames.EditSubjectModal} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit {subjectData.name}!</h3>
        <div className="flex flex-col">
          <TextInput
            label="Subject name"
            name="name"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.name}
            required={true}
          />
          <SelectInput
            label="Course type"
            name="courseType"
            options={courseTypes}
            handleChange={e => handleSelectChange(e, form, setForm)}
            inputData={form.courseType}
            required={true}
          />
          <NumberInput
            label="Credit"
            name="credit"
            handleChange={e => handleModelNumberChange(e, form, setForm)}
            inputData={form.credit}
            required={true}
          />
          <SelectInput
            label="Grade"
            name="grade"
            options={grades}
            handleChange={e => handleSelectNumberChange(e, form, setForm)}
            inputData={form.grade}
            required={true}
          />
          <TextArea
            label="Notes"
            name="notes"
            handleChange={e => handleTextAreaChange(e, form, setForm)}
            inputData={form.notes}
            required={true}
          />
        </div>
        <div className="flex justify-end gap-2 p-2 modal-backdrop">
          <button
            className="btn btn-secondary"
            onClick={() => cancelModalForm(subjectData, setForm, modalNames.EditSubjectModal)}
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

export default EditSubjectModal;
