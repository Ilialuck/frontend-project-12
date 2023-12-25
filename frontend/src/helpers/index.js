import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export const useLoginFormSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    username: Yup.string().required(t('errors.required')),
    password: Yup.string().required(t('errors.required')),
  });
};

export const useChannelsNamesSchema = () => {
  const existingChannels = useSelector((state) => {
    return state.channels.channels.map((channel) => channel.name);
  });
  const { t } = useTranslation();
  return  Yup.object().shape({
    name: Yup
      .string()
      .required(t('validations.required'))
      .min(3, t('validations.minSymbols'))
      .max(20, t('validations.maxSymbols'))
      .test('is-unique', t('validations.uniquely'), (value) => !existingChannels.includes(value)),
  });
};
