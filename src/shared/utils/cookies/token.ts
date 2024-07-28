import { CookieKeys } from '@/shared/consts';
import Cookies from 'js-cookie';

export const setToken = (accessToken: string) => {
  const date = new Date();
  date.setDate(date.getDate() + 365);
  Cookies.set(CookieKeys.accessToken, accessToken, { expires: date, secure: process.env.NODE_ENV === "production", sameSite: 'strict' });
};

export const getToken = () => {
  return Cookies.get(CookieKeys.accessToken);
};

export const removeToken = () => {
  Cookies.remove(CookieKeys.accessToken);
};