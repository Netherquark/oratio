import { AuthGuard } from '@/query/auth';
import { queryClient } from '@/query/client';
import { getPodcasts } from '@/query/podcasts';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
  loader: () => queryClient.ensureQueryData(getPodcasts()),
  beforeLoad: async () => {
    const isAuth = await AuthGuard();
    if (!isAuth) {
      throw redirect({
        to: '/login'
      });
    }
  },
});

function Index() {
  const data = Route.useLoaderData();
  console.log(data);

  return (
    <div className='p-[30px]'>
      <div className='h-[25px]'></div>
      <h1 className='text-2xl font-mono font-bold mb-[3px]'>Hey there!</h1>
      <h1 className='text-5xl font-display'>Shardul Nalegave</h1>
      <div className='h-[20px]'></div>
    </div>
  );
}