'server-only';

import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import ReactHook from 'alova/react';
import { headers } from 'next/headers';

export const alova = createAlova({
  baseURL: process.env.BACKEND_BASEURL,
  requestAdapter: adapterFetch(),
  statesHook: ReactHook,
  async beforeRequest(method) {
    const h = await headers();
    method.config.headers['Cookie'] = h.get('Cookie') || '';
    method.config.headers['Accept'] = 'application/json';
  },
  responded(response) {
    return response.json();
  },
  cacheLogger: false,
  cacheFor: {
    GET: 0,
  }
});
