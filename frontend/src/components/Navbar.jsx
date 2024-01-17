import {
  Container, Button, Navbar as NavbarComponent, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';
import RuLNG from '../assets/RuLNG.png';
import EnLNG from '../assets/EnLNG.png';

const Navbar = () => {
  const auth = useAuth();
  const lngs = {
    en: { nativeName: 'English' },
    ru: { nativeName: 'Russian' },
  };
  const { t, i18n } = useTranslation();
  return (
    <NavbarComponent expand="lg" className="shadow-sm bg-light" id="myclass">
      <Container>
        <NavbarComponent.Brand href="/"> Hexlet Chat </NavbarComponent.Brand>
        <ButtonGroup>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              <img
                src={lngs[lng].nativeName === 'Russian' ? RuLNG : EnLNG}
                alt="Button"
              />
            </button>
          ))}
        </ButtonGroup>

        { auth.user && <Button onClick={() => auth.logOut()} variant="primary">{t('navigation.logOut')}</Button> }
      </Container>
    </NavbarComponent>
  );
};
export default Navbar;
