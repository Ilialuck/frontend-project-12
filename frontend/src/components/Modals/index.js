import { Add } from "./Add";
import { Remove } from './Remove';
import { Rename } from './Rename';

const modals = {
  addChannel: Add,
  removeChannel: Remove,
  renameChannel: Rename,
};

const getModal = (type) => modals[type];

const getModalComponent = (type) => {
  if (type === null) return null;

  const ModalComponent = getModal(type);

  return <ModalComponent />;
};

export default getModalComponent;