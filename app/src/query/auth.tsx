import { queryOptions } from '@tanstack/react-query';
import { baseURL } from './client';

export const login = (payload: { email: string, password: string }) => queryOptions({
  queryKey: ['login', payload.email],
  gcTime: 0,
  queryFn: async () => {
    const res = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    return res.status == 200;
  },
});  