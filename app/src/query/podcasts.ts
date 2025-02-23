import { queryOptions } from "@tanstack/react-query";
import { baseURL } from "./client";
import { IPodcast } from "./models";

export const getPodcasts = () => queryOptions({
  queryKey: ['getPodcasts'],
  queryFn: async (): Promise<IPodcast[] | null> => {
    try {
      const res = await fetch(`${baseURL}/podcasts`, { credentials: 'include' })
      if (res.status != 200) return null;
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  },
});