import { z } from 'zod';

const PathsSchema = z.object({
  auth: z.object({
    login: z.string().min(1),
    verifyMfa: z.string().min(1),
    callback: z.string().min(1),
    mustAuthenticate: z.string().min(1),
    acceptInvitation: z.string().min(1),
    invalidInvitation: z.string().min(1),
    error: z.string().min(1),
  }),
  app: z.object({
    home: z.string().min(1),
    billing: z.string().min(1),
    customers: z.string().min(1),
    inquiries: z.string().min(1),
    inventory: z.string().min(1),
    orders: z.string().min(1),
    production: z.string().min(1),
    quotes: z.string().min(1),
    reports: z.string().min(1),
    settings: z.string().min(1),
  }),
  publicPaths: z.array(z.string()),
});

const pathsConfig = PathsSchema.parse({
  auth: {
    login: '/auth/login',
    verifyMfa: '/auth/verify',
    callback: '/auth/callback',
    mustAuthenticate: '/auth/must-authenticate',
    acceptInvitation: '/auth/accept-invitation',
    invalidInvitation: '/auth/invalid-invitation',
    error: '/auth/error',
  },
  app: {
    home: '/',
    billing: '/billing',
    customers: '/customers',
    inquiries: '/inquiries',
    inventory: '/inventory',
    orders: '/orders',
    production: '/production',
    quotes: '/quotes',
    reports: '/reports',
    settings: '/settings',
  },
  publicPaths: [
    '/auth/login',
    '/auth/callback',
    '/auth/verify',
    '/auth/must-authenticate',
    '/auth/accept-invitation',
    '/auth/invalid-invitation',
    '/auth/error',
  ],
} satisfies z.infer<typeof PathsSchema>);

export default pathsConfig;
