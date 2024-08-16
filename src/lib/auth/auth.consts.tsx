export const AUTH_SESSION_KEY = 'auth-session';

export const authEndpoints = [
  { key: 'login', method: 'POST', endpoint: 'api/auth/login', schema: null },
  {
    key: 'getUser',
    method: 'POST',
    endpoint: '/user/get/',
    schema: null,
  },


  // Add more endpoints and schemas as needed
] as const;

export const BaseUrl =  process.env.NEXT_PUBLIC_API_BASE_URL ?? '/'
export const sessionExpiresOn =  24 * 60 * 60 * 1000

