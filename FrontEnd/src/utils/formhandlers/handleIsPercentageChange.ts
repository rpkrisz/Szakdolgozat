import {ChangeEvent} from "react";

const handleIsPercentageChange = <formType>(e: ChangeEvent, form: formType, setForm: (form: formType) => void) => {
  const input = e.target as HTMLInputElement;
  setForm({...form, [input.name]: input.checked});
};

export default handleIsPercentageChange;
