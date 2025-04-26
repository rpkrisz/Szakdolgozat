import {ChangeEvent} from "react";

const handleSelectNumberChange = <formType>(e: ChangeEvent, form: formType, setForm: (form: formType) => void) => {
  const input = e.target as HTMLSelectElement;
  setForm({...form, [input.name]: Number(input.value)});
};

export default handleSelectNumberChange;
