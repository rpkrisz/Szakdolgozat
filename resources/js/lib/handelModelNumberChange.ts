import {ChangeEvent} from "react";

const handelModelNumberChange = <formType>(e: ChangeEvent, form: formType, setForm: (form: formType) => void) => {
  const input = e.target as HTMLInputElement;
  setForm({...form, [input.name]: input.valueAsNumber});
};

export default handelModelNumberChange;
