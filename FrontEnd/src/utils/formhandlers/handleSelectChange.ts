import {ChangeEvent} from "react";

const handleSelectChange = <formType>(e: ChangeEvent, form: formType, setForm: (form: formType) => void) => {
  const input = e.target as HTMLSelectElement;
  setForm({...form, [input.name]: input.value});
};

export default handleSelectChange;
