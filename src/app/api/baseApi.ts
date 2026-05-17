import { baseQueryWithReauth } from '@/app/api/baseQueryWithReauth.ts';
import { createApi } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Playlists', 'Auth'],
  keepUnusedDataFor: 60,
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  // skipSchemaValidation: import.meta.env.PROD,
});
