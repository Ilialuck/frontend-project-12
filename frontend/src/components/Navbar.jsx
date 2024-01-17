import {
  Container, Button, Navbar as NavbarComponent, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';
// import RuLNG from '../assets/RuLNG.png';
// import EnLNG from '../assets/EnLNG.png';

const Navbar = () => {
  const auth = useAuth();
  const lngs = {
    en: { nativeName: 'Eng' },
    ru: { nativeName: 'Ru' },
  };
  const { t, i18n } = useTranslation();
  return (
    <NavbarComponent expand="lg" className="shadow-sm bg-light" id="myclass">
      <Container>
        <NavbarComponent.Brand href="/"> Hexlet Chat </NavbarComponent.Brand>
        <ButtonGroup className="mb-2">
          {Object.keys(lngs).map((lng) => (
            <Button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </Button>
          ))}
        </ButtonGroup>

        { auth.user && <Button onClick={() => auth.logOut()} variant="primary">{t('navigation.logOut')}</Button> }
      </Container>
    </NavbarComponent>
  );
};
export default Navbar;
