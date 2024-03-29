import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginFormSchema } from '../helpers/validations';
import { useAuth } from '../hooks';
import routes from '../routes';
import '../style.css';
import Eye from '../assets/Eye.gif';

const LoginForm = () => {
  const loginFormSchema = useLoginFormSchema();
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginFormSchema,
    onSubmit: async ({ username, password }) => {
      setAuthFailed(false);
      try {
        await auth.logIn(username, password);
        const { from } = location.state || { from: { pathname: routes.root } };
        navigate(from);
      } catch (error) {
        if (error instanceof AxiosError && error.response.status === 401) {
          setAuthFailed(true);
          auth.logOut();
          return;
        }
        toast.error(t('notifications.errors.loginFail'));
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center m-3">{t('form.signIn')}</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <FloatingLabel controlId="formBasicEmail" label={t('form.fields.username2')}>
          <Form.Control
            className={formik.errors.username && formik.touched.username ? 'is-invalid' : ''}
            type="text"
            name="username"
            autoComplete="username"
            required
            placeholder={t('form.fields.username2')}
            value={formik.values.username}
            onChange={formik.handleChange}
            isInvalid={authFailed}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicPassword">
        <FloatingLabel label={t('form.fields.password')} controlId="formBasicPassword">
          <Form.Control
            className={formik.errors.password && formik.touched.password ? 'is-invalid' : ''}
            required
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder={t('form.fields.password')}
            onChange={formik.handleChange}
            isInvalid={authFailed}
          />
          <Button className="eye-button" variant="link" onClick={() => setShowPassword((prev) => !prev)}>
            <img src={Eye} alt="Button" />
          </Button>
          <Form.Control.Feedback type="invalid">{t('validations.loginFail')}</Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Button variant="btn btn-outline-primary" className="col-6 col-md-12" type="submit">
        {t('form.signIn')}
      </Button>
    </Form>
  );
};
export default LoginForm;
