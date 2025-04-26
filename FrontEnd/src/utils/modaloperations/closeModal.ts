const closeModal = (modalName: string) => {
  const modal = document.getElementById(modalName) as HTMLDialogElement;
  if (!modal) return;
  modal.close();
};
export default closeModal;
