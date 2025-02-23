import { queryOptions } from '@tanstack/react-query';
import { baseURL } from './client';
import { IUser } from './models';

export const getUser = () => queryOptions({
  gcTime: 0,
  queryKey: ['getUser'],
  queryFn: async (): Promise<IUser | null> => {
    try {
      const res = await fetch(`${baseURL}/user`, { credentials: 'include' })
      if (res.status != 200) return null;
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  },
});
