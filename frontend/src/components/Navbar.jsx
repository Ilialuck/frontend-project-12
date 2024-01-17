import { Container, Button, Navbar as NavbarComponent } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';

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
        <div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        { auth.user && <Button onClick={() => auth.logOut()} variant="primary">{t('navigation.logOut')}</Button> }
      </Container>
    </NavbarComponent>
  );
};
export default Navbar;
