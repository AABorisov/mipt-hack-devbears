import axios, { AxiosInstance } from 'axios';
import {
  BACKEND_ENDPOINTS,
  BackendEndpointNames,
  BackendEndpoints,
  BackendEndpointsFunctions,
  EndPoint,
} from './constant';

interface OptionsHeaders {
  Accept: string;
  'Content-Type': string;
  Authorization?: string;
}

interface ApiClientClassOptions {
  headers?: OptionsHeaders;
  client?: AxiosInstance;
}

/**
 * Объект-обертка над клиентом.
 * Реализация REST
 */
class ApiClientClass {
  private readonly defaultHeaders: OptionsHeaders;

  client: AxiosInstance;

  constructor(options: ApiClientClassOptions = {}) {
    this.defaultHeaders = options.headers || {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
    };
    // Создание экзепляра клиента
    this.client =
      options.client ||
      axios.create({
        baseURL: process.env.API_URL ? process.env.API_URL : '',
        headers: this.defaultHeaders,
      });

    /**
     * Подготовка запроса
     */
    this.client.interceptors.request.use(
      config => {
        if (!localStorage.getItem('tAccess')) {
          return config;
        }
        const newHeaders = {
          ...this.defaultHeaders,
          // Authorization: `Basic ${localStorage.getItem('tAccess')}`,
        };
        return {
          ...config,
          headers: newHeaders,
        };
      },
      e => Promise.reject(e)
    );

    this.client.interceptors.response.use(
      r => r,
      async error => {
        throw error;
      }
    );
  }

  urlFormat(url: string, args: object = {}): string {
    return this ? url : args.toString();
  }
}

/**
 * Прокси объект для динамического вызова функции апи.
 */
const Api: ApiClientClass & BackendEndpointsFunctions = new Proxy(new ApiClientClass(), {
  get(target, name) {
    if (Reflect.get(BACKEND_ENDPOINTS, name) !== undefined) {
      return ({
        params = {},
        data = {},
        args = {},
      }: { params?: object; data?: object; args?: object } = {}) => {
        const endPoint: EndPoint = Reflect.get(BACKEND_ENDPOINTS, name);
        return target
          .client({
            method: endPoint.method,
            url: target.urlFormat(endPoint.url, args),
            data,
            params,
          })
          .then(serverResponse => serverResponse.data)
          .catch(error => {
            throw new Error('Server response error');
          });
      };
    }
    return Reflect.get(target, name);
  },
}) as ApiClientClass & BackendEndpointsFunctions;

export default Api;
