import { queryOptions } from '@tanstack/react-query';
import { baseURL } from './client';

export async function AuthGuard(): Promise<boolean> {
  const res = await fetch(`${baseURL}/user`, { credentials: 'include' });
  return res.status == 200
}

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

export const signUp = (payload: { name: string, email: string, password: string }) => queryOptions({
  queryKey: ['signUp', payload.email],
  gcTime: 0,
  queryFn: async () => {
    const res = await fetch(`${baseURL}/auth/create`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    return res.status == 200;
  },
});

export const logout = () => queryOptions({
  queryKey: ['logout'],
  gcTime: 0,
  queryFn: async () => {
    const res = await fetch(`${baseURL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    return res.status == 200;
  },
});