import { Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import error404 from '../../assets/error404.svg';

export const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>{t('errors.404')}</Card.Title>
        <Button href="/" variant="primary">{t('navigation.main')}</Button>
      </Card.Body>
      <img
        alt={t('notFound')}
        style={{ maxHeight: '25vh' }}
        className="img-fluid h-25"
        src={error404}
      />
    </Card>
  );
};
