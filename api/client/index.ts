import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import ReactHook from 'alova/react';

export const clientRequest = createAlova({
  baseURL: '/api',
  requestAdapter: adapterFetch(),
  statesHook: ReactHook,
  async beforeRequest(method) {
    method.config.credentials = 'include';
    method.config.headers['Accept'] = 'application/json';
  },
  responded(response) {
    return response.json();
  },
  cacheLogger: false,
});
