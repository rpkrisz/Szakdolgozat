import {FC, useState} from "react";
import {TextInput, NumberInput, DateInput, SelectInput} from "@/components/Inputs";
import {cancelModalForm, closeModal, handleModalFormChange, handleModelNumberChange} from "@/utils/";
import {useCreateUniversity} from "@/services";
import {modalNames} from ".";
import {toast} from "react-toastify";

const initialForm = {
  name: "",
  nickName: "",
  faculty: "",
  major: "",
  degreeLevel: "",
  semestersCount: 0,
  currSemester: 0,
  currSemFstDay: "",
  specialisation: "",
};

const AddUniversityModal: FC = () => {
  const [form, setForm] = useState(initialForm);

  const [createUniversity] = useCreateUniversity();

  const sendForm = async () => {
    if (Object.values(form).some(value => !value)) {
      toast.error("All fields are required!");
      return;
    }
    try {
      await createUniversity(form);
    } catch (error) {
      toast.error("University saving faild!", {});
    }

    setForm({...initialForm});
    closeModal(modalNames.AddUniversityModal);
  };

  return (
    <dialog id={modalNames.AddUniversityModal} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add new University!</h3>
        <div className="grid md:grid-cols-2 md:grid-rows-7 gap-2">
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
            className="md:col-span-2"
          />
          <TextInput
            label="Major"
            name="major"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.major}
            required={true}
            className="md:col-span-2"
          />
          <TextInput
            label="Specialisation"
            name="specialisation"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.specialisation}
            required={true}
            className="md:col-span-2"
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
            className="md:col-span-2"
          />
          <NumberInput
            label="Semesters"
            name="semestersCount"
            handleChange={e => handleModelNumberChange(e, form, setForm)}
            inputData={form.semestersCount}
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
            className="md:col-span-2"
          />
        </div>
        <div className="flex justify-end gap-2 p-2 modal-backdrop">
          <button
            className="btn btn-secondary"
            onClick={() => cancelModalForm(initialForm, setForm, modalNames.AddUniversityModal)}
          >
            Cancel
          </button>
          <button className="btn btn-accent" onClick={sendForm}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddUniversityModal;
