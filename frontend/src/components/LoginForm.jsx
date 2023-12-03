import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useRef, useEffect, useState, useContext } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import axios, { AxiosError } from 'axios';
import { useLoginFormSchema } from '../schemas';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../routes';

export const LoginForm = () => {
  const loginFormSchema = useLoginFormSchema();
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginFormSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setAuthFailed(false);
      try {
        //перенести хранение и запрос в провайдер? 
        const { data } = await axios.post(routes.server.login, values);
        localStorage.setItem('user', JSON.stringify(data));
        console.log(localStorage.user);
        auth.logIn();
        const { from } = location.state || { from: { pathname: routes.root } };
        navigate(from);
      }catch(error) {
        setSubmitting(false);
        if (error instanceof  AxiosError && error.response.status === 401) {
          setAuthFailed(true);
          return;
        }
        throw(error);
      }
    },
  });
    return (
        <Form onSubmit={formik.handleSubmit} className="col-7 col-md-7">
          <h1 className="text-center m-3">{t('form.signIn')}</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel controlId={"formBasicEmail"} label={t('form.fields.username')}>
              <Form.Control
                className={formik.errors.username && formik.touched.username ? 'is-invalid': ''}
                type="text"
                name="username"
                autoComplete="username"
                required
                placeholder={t('form.fields.username')}
                value={formik.values.username}
                onChange={formik.handleChange}
                isInvalid={authFailed}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <FloatingLabel label={t('form.fields.password')} controlId={"formBasicPassword"}>
              <Form.Control
                className={formik.errors.password && formik.touched.password ? 'is-invalid': ''}
                required
                type="password"
                name="password"
                placeholder={t('form.fields.password')}
                onChange={formik.handleChange}
                isInvalid={authFailed}
              />
              <Form.Control.Feedback type="invalid">{t('errors.loginFail')}</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Button variant="btn btn-outline-primary" className="col-6 col-md-12" type="submit">
            {t('form.signIn')}
          </Button>
        </Form>
    );
  };

