import type { meResponseSchema, loginResponseSchema } from '../model';
import type { z } from 'zod';

// export type MeResponse = {
//   userId: string;
//   login: string;
// };

// export type LoginResponse = {
//   refreshToken: string;
//   accessToken: string;
// };

export type MeResponse = z.infer<typeof meResponseSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;

export type LoginArgs = {
  code: string;
  redirectUri: string;
  rememberMe: boolean;
  accessTokenTTL?: string;
};
