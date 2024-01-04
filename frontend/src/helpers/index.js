import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const useLoginFormSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    username: Yup.string().required(t('errors.required')),
    password: Yup.string().required(t('errors.required')),
  });
};

export const useRegistrationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    username: Yup
      .string()
      .required(t('validations.required'))
      .min(3, t('validations.minSymbols'))
      .max(20, t('validations.maxSymbolss')),
    password: Yup
      .string()
      .required(t('validations.required'))
      .min(6, t('validations.minPasswordSymbols')),
    confirmPassword: Yup
      .string()
      .oneOf([Yup.ref('password')], t('validations.passwordConfirm'))
      .required(t('validations.required')),
  });
};

export const useChannelsNamesSchema = () => {
  // eslint-disable-next-line max-len
  const existingChannels = useSelector((state) => state.channels.channels.map((channel) => channel.name));
  const { t } = useTranslation();
  return Yup.object().shape({
    name: Yup
      .string()
      .required(t('validations.required'))
      .min(3, t('validations.minSymbols'))
      .max(20, t('validations.maxSymbols'))
      .test('is-unique', t('validations.uniquely'), (value) => !existingChannels.includes(value)),
  });
};
