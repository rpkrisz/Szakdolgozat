import {FC, useEffect, useState} from "react";
import {TextInput, NumberInput, DateInput, SelectInput} from "@/components/Inputs";
import {cancelModalForm, closeModal, handleModalFormChange, handleModelNumberChange} from "@/utils/";
import {University} from "@/types";
import {useUpdateUniversity} from "@/services";
import {modalNames} from ".";
import {toast} from "react-toastify";

const EditUniversityModal: FC<{universitiData: University}> = ({universitiData}) => {
  const [form, setForm] = useState(universitiData);
  const [updateUniversity] = useUpdateUniversity();

  useEffect(() => setForm(universitiData), [universitiData]);

  const update = async () => {
    if (Object.values(form).some(value => !value)) return toast.error("All fields are required!");
    try {
      await updateUniversity(form as University);
    } catch (error) {
      toast.error("University saving faild!");
    }

    setForm({...universitiData});
    closeModal(modalNames.EditUniversityModal);
  };

  return (
    <dialog id={modalNames.EditUniversityModal} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit {universitiData.name}!</h3>
        <div className="flex flex-col">
          <TextInput
            label="University name"
            name="name"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.name}
            required={true}
          />
          <TextInput
            label="University nickname"
            name="nickName"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.nickName}
            required={true}
          />
          <TextInput
            label="Faculty"
            name="faculty"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.faculty}
            required={true}
          />
          <TextInput
            label="Major"
            name="major"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.major}
            required={true}
          />
          <TextInput
            label="Specialisation"
            name="specialisation"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.specialisation}
            required={true}
          />
          <SelectInput
            label="Degree level"
            name="degreeLevel"
            options={[
              {value: "BA/BSc", text: "BA/BSc"},
              {value: "MA/MSc", text: "MA/MSc"},
            ]}
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.degreeLevel}
            required={true}
          />
          <NumberInput
            label="Current Semester"
            name="currSemester"
            handleChange={e => handleModelNumberChange(e, form, setForm)}
            inputData={form.currSemester}
            required={true}
          />
          <DateInput
            label="Current semester's first day"
            name="currSemFstDay"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.currSemFstDay}
            required={true}
          />
        </div>
        <div className="flex justify-end gap-2 p-2 modal-backdrop">
          <button
            className="btn btn-secondary"
            onClick={() => cancelModalForm(universitiData, setForm, modalNames.EditUniversityModal)}
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

export default EditUniversityModal;
