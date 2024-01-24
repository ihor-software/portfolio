import axios, { AxiosError, AxiosInstance, AxiosPromise } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': true,
  },
  withCredentials: true,
});

export const baseRequest = async (requestFunction: () => AxiosPromise<any>) => {
  try {
    return await requestFunction();
  } catch (error) {
    const errorMsg = error as AxiosError<any>;
    throw new Error(errorMsg.response?.data.message);
  }
};

export default axiosInstance;
