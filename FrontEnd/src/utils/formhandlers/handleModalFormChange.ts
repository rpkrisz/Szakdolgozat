import {ChangeEvent} from "react";

const handleModalFormChange = <formType>(e: ChangeEvent, form: formType, setForm: (form: formType) => void) => {
  const input = e.target as HTMLInputElement;
  setForm({...form, [input.name]: input.value});
};
export default handleModalFormChange;

