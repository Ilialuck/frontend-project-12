import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import routes from "../routes";
import { getMessages } from "../store/MessagesSlice";
import { getChannels } from '../store/ChannelsSlice';

export const useLoginFormSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    username: Yup.string().required(t('errors.required')),
    password: Yup.string().required(t('errors.required')),
  });
};

export const getChannelsData  = (dispatch, header) => async () => {
  const { data } = await axios.get(routes.server.data, {
    headers: header,
  });
  dispatch(getChannels(data));
  dispatch(getMessages(data));
};