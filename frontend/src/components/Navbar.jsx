import { Container, Button, Navbar as NavbarComponent } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';

export const Navbar = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    <NavbarComponent expand="lg" className="shadow-sm bg-white">
      <Container>
        <NavbarComponent.Brand href="/"> Hexlet Chat </NavbarComponent.Brand>
        { auth.user && <Button onClick={() => auth.logOut()} variant="primary">{t('navigation.logOut')}</Button> }
      </Container>
    </NavbarComponent>
  );
};
