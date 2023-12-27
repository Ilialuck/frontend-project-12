import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSocket } from '../../hooks';
import { closeModal } from '../../store/ModalSlice';

export const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modals.isOpened);
  const channelId = useSelector((state) => state.modals.extra.channelId);
  const sokcet = useSocket();
  const handleClose = () => dispatch(closeModal());
  const handleRemoveChannel = async () => {
    try {
      sokcet.removeChannel(channelId);
      toast.success(t('notifications.removeChannel'));
      dispatch(closeModal());
    } catch (error) {
      toast.error(t('notifications.errors.removeChannelError'))
    }
  };

  return (
    <Modal show={isOpened} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.removeConfirm')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="danger" onClick={handleRemoveChannel}>{t('modals.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
