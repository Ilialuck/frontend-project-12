import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useRegistrationSchema } from '../helpers';
import routes from '../routes';
import { useAuth } from '../hooks';

export const RegistrationForm = () => {
  const inputName = useRef(null);
  useEffect(() => {
    if (inputName.current) {
      inputName.current.focus();
    }
  }, []);

  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const registrationSchema = useRegistrationSchema();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationSchema,
    onSubmit: async ({ username, password }) => {
      try {
        await axios.post(routes.server.signup, { username, password });
        await auth.logIn(username, password);
        navigate(routes.root);
      } catch (error) {
        if (error.response.status === 409) {
          formik.setErrors({
            username: t('validations.userExists'),
          });
        } else {
          toast.error(t('notifications.errors.regFail'))
        }
      }
    },
  });

    return (
        <Form className="w-50" onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">{t('form.signUp')}</h1>
            <Form.Group className="form-floating mb-3">
                <Form.Control
                    name="username"
                    autoComplete="username"
                    id="username"
                    placeholder={t('form.fields.username')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.errors.username}
                    ref={inputName}
                />
                <Form.Label htmlFor="username">{t('form.fields.username')}</Form.Label>
                <div className="invalid-tooltip">
                    {formik.errors.username}
                </div>
            </Form.Group>

            <Form.Group className="form-floating mb-3" controlId="password">
                <Form.Control
                    type="password"
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    placeholder={t('form.fields.password')}
                    value={formik.values.password}
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.password}
                />
                <Form.Label>{t('form.fields.password')}</Form.Label>
                <div className="invalid-tooltip">
                    {formik.errors.password}
                </div>
            </Form.Group>
            <Form.Group
                className="form-floating mb-4"
                controlId="confirmPassword"
            >
                <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder={t('form.fields.passwordConfirmation')}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.confirmPassword}
                />
                <Form.Label>
                    {t('form.fields.passwordConfirmation')}
                </Form.Label>
                <div className="invalid-tooltip">
                    {formik.errors.confirmPassword}
                </div>
            </Form.Group>

            <Button
                type="submit"
                variant="outline-primary"
                className="w-100"
                disabled={formik.isSubmitting}
            >
                {t('form.signUpBtn')}
            </Button>
        </Form>
    );
};
