import {DateInput, NumberInput} from "../Inputs";
import {handleModalFormChange, handleModelNumberChange} from "@/utils/";
import {FC, useState} from "react";
import {University} from "@/types";
import {useUpdateUniversity} from "@/services";

const UniEdit: FC<{universitiData: University}> = ({universitiData}) => {
  const [form, setForm] = useState(universitiData);
  const [updateUniversity] = useUpdateUniversity();

  const update = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await updateUniversity(form as University);
    } catch (error) {
      console.error(error);
    }
    setForm({...form});
  };

  return (
    <>
      <form className="flex flex-row justify-between align-bottom gap-10">
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
        <button className="btn btn-primary place-self-end" onClick={e => update(e)}>
          Save
        </button>
      </form>
    </>
  );
};

export default UniEdit;
