import { z } from 'zod';

const PathsSchema = z.object({
  auth: z.object({
    signIn: z.string().min(1),
    signUp: z.string().min(1),
    verifyMfa: z.string().min(1),
    callback: z.string().min(1),
    passwordReset: z.string().min(1),
    passwordUpdate: z.string().min(1),
    mustAuthenticate: z.string().min(1),
  }),
  app: z.object({
    home: z.string().min(1),
    profileSettings: z.string().min(1),
  }),
  publicPaths: z.array(z.string()),
});

const pathsConfig = PathsSchema.parse({
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    verifyMfa: '/auth/verify',
    callback: '/auth/callback',
    passwordReset: '/auth/password-reset',
    passwordUpdate: '/update-password',
    mustAuthenticate: '/auth/must-authenticate',
  },
  app: {
    home: '/home',
    profileSettings: '/home/settings',
  },
  publicPaths: [
    '/', // ルートパス
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/callback',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/verify',
    '/auth/must-authenticate',
  ],
} satisfies z.infer<typeof PathsSchema>);

export default pathsConfig;
