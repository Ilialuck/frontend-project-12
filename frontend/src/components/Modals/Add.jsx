import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSocket } from '../../hooks';
import { closeModal } from '../../store/ModalSlice';
import { useChannelsNamesSchema } from '../../helpers';

export const Add = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const rollbar = useRollbar();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const addChannelSchema = useChannelsNamesSchema();
  // eslint-disable-next-line arrow-body-style
  const isOpened = useSelector((state) => state.modals.isOpened);
  const handleClose = () => dispatch(closeModal());

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: addChannelSchema,

    onSubmit: async ({ name }, { resetForm }) => {
      try {
        await socket.newChannel(name);
        toast.success(t('notifications.addChannel'));
        resetForm();
      } catch (error) {
        toast.error(t('notifications.errors.addChannelError'));
        rollbar.error('AddChannel', error);
      } finally {
        handleClose();
      }
    },
  });

  return (
    <Modal show={isOpened} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              data-testid="input-name"
              name="name"
              isInvalid={
                formik.touched.name && formik.errors.name
              }
            />
            <Form.Label visuallyHidden>{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              { formik.errors.name }
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>{t('modals.cancel')}</Button>
            <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('modals.send')}</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
