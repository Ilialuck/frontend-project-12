import { Add } from "./Add";

const modals = {
  addChannel: Add,
};
const getModal = (type) => modals[type];

const getModalComponent = (type) => {
  if (type === null) return null;

  const ModalComponent = getModal(type);

  return <ModalComponent />;
};

export default getModalComponent;