import {DateInput, NumberInput} from "../Inputs";
import {handelModalFormChange, handelModelNumberChange} from "@/lib";
import {FC, useState} from "react";
import {University} from "@/models/University";
import {updateUniversity} from "@/repositories/UniversityRepository";

const UniEdit: FC<{universitiData: University}> = ({universitiData}) => {
  const [form, setForm] = useState(universitiData);

  const update = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await updateUniversity(universitiData!.id, form as University);
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
          handelChange={e => handelModelNumberChange(e, form, setForm)}
          inputData={form.currSemester}
          required={true}
        />
        <DateInput
          label="Current semester's first day"
          name="currSemFstDay"
          handelChange={e => handelModalFormChange(e, form, setForm)}
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
