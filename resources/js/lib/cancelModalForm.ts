import closeModal from "./closeModal";

const cancelModalForm = <formType>(
  initialForm: formType,
  setForm: (initialForm: formType) => void,
  modalName: string
) => {
  closeModal(modalName);
  setForm({...initialForm});
};

export default cancelModalForm;
