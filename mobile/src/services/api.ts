import { AppError } from '@utils/AppError';
import axios, { AxiosInstance } from "axios";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
  baseURL: 'http://192.168.15.29:3333'
}) as APIInstanceProps;

api.registerInterceptTokenManager = signOut => {
  const interceptorTokenManager = api.interceptors.response.use(response => response, error => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(new AppError('Erro no servidor. Tente novamente mais tarde.'))
    }
  });
  return () => {
    api.interceptors.response.eject(interceptorTokenManager)
  }
}




export { api };