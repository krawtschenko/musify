import { baseApi } from '@/app/api';
import type { LoginArgs, MeResponse } from './authApi.types.ts';
import { AUTH_KEYS } from '@/common/constants/constants.ts';
import { loginResponseSchema, meResponseSchema } from '../model/auth.schemas.ts';
import { withZodCatch } from '@/common/utils/withZodCatch.ts';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<MeResponse, void>({
      query: () => `auth/me`,
      providesTags: ['Auth'],
      ...withZodCatch(meResponseSchema),
    }),
    login: build.mutation({
      query: (payload: LoginArgs) => {
        return {
          method: 'POST',
          url: 'auth/login',
          body: { ...payload },
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        localStorage.setItem(AUTH_KEYS.accessToken, data.accessToken);
        localStorage.setItem(AUTH_KEYS.refreshToken, data.refreshToken);

        // Invalidate after saving tokens
        dispatch(authApi.util.invalidateTags(['Auth']));
      },
      ...withZodCatch(loginResponseSchema),
    }),
    logout: build.mutation<void, void>({
      query: () => {
        const refreshToken = localStorage.getItem(AUTH_KEYS.refreshToken);
        return { url: 'auth/logout', method: 'post', body: { refreshToken } };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        await queryFulfilled;
        localStorage.removeItem(AUTH_KEYS.accessToken);
        localStorage.removeItem(AUTH_KEYS.refreshToken);
        dispatch(baseApi.util.resetApiState());
      },
    }),
  }),
});

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi;
