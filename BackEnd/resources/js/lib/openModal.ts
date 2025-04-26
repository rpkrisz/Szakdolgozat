const openModal = (modalName: string) => {
  const modal = document.getElementById(modalName) as HTMLDialogElement;
  if (!modal) return;
  modal.showModal();
};
export default openModal;
