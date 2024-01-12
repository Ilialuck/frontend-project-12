import {
  Card, Col, Container, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginForm from '../LoginForm.jsx';
import routes from '../../routes.js';
import avatar from '../../assets/avatar.jpg';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className="h-100 w-75">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="card-body row p-5">
              <Col className="col-5 col-md-5 p-5 d-flex justify-content-center align-items-center">
                <Card.Img
                  className="rounded-circle"
                  src={avatar}
                />
              </Col>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <Card.Text className="text-center">
                <span>{t('form.noAccount')}</span>
                <Card.Link href={routes.signup} className="p-2">{t('form.signUp')}</Card.Link>
              </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;
