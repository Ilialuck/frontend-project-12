import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getChannels } from '../store/ChannelsSlice';
import { getMessages } from '../store/MessagesSlice';
import routes from '../routes';

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
      .min(3, t('validations.minMaxSymbols'))
      .max(20, t('validations.minMaxSymbols')),
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
      .min(3, t('validations.minMaxSymbols'))
      .max(20, t('validations.minMaxSymbols'))
      .test('is-unique', t('validations.uniquely'), (value) => !existingChannels.includes(value)),
  });
};
export const getChannelsData = (dispatch, header) => async () => {
  const { data } = await axios.get(routes.server.data, {
    headers: header,
  });
  dispatch(getChannels(data, header));
  dispatch(getMessages(data, header));
};
