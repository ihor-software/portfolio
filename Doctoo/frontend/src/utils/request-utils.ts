import axios from 'axios';

export enum RequestMethod {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
}

export const request = async (
  method: RequestMethod = RequestMethod.GET,
  url: string,
  headers?: any,
  data?: any,
): Promise<any> => {
  try {
    const response = await axios({ method, url, headers, data });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
