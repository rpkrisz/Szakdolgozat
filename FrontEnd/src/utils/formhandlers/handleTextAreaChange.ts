import {ChangeEvent} from "react";

const handleTextAreaChange = <formType>(e: ChangeEvent, form: formType, setForm: (form: formType) => void) => {
  const input = e.target as HTMLTextAreaElement;
  setForm({...form, [input.name]: input.value});
};

export default handleTextAreaChange;
