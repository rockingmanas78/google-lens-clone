// ApiHandler.ts

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from './ApiEndpoints';

export interface ApiRequestOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

export const ApiHandler = async <T>(
  options: ApiRequestOptions
): Promise<AxiosResponse<T>> => {
  const { endpoint, method = 'GET', data, params, headers } = options;

  const config: AxiosRequestConfig = {
    method,
    url: `${BASE_URL}${endpoint}`,
    data,
    params,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    console.error(`API Error: ${error.message}`);
    throw error.response?.data || error.message;
  }
};
