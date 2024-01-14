import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { closeModal } from '../../store/ModalSlice';
import { useSocket } from '../../hooks';
import { useChannelsNamesSchema } from '../../helpers/validations';

const Rename = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rollbar = useRollbar();
  const socket = useSocket();
  const inputRef = useRef(null);
  const channelId = useSelector((state) => state.modals.extra.channelId);
  const channels = useSelector((state) => state.channels.channels);
  const prevChannelName = channels.find((channel) => channel.id === channelId)?.name || '';
  const renameChannelSchema = useChannelsNamesSchema();

  const formik = useFormik({
    initialValues: { name: prevChannelName },
    validationSchema: renameChannelSchema,

    onSubmit: async ({ name }) => {
      try {
        await socket.renameChannel(channelId, name);
        toast.success(t('notifications.renameChannel'));
        dispatch(closeModal());
      } catch (error) {
        toast.error(t('notifications.errors.renameChannelError'));
        rollbar.error('RenameChannel', error);
      }
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show centered onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} controlId="name">
          <Form.Group>
            <Form.Control
              type="text"
              ref={inputRef}
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              name="name"
              isInvalid={formik.errors.name}
            />
            <Form.Label htmlFor="name" visuallyHidden>{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(closeModal())}>{t('modals.cancel')}</Button>
            <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('modals.send')}</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default Rename;
