import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TopBar from '@/components/topbar';
import { queryClient } from '@/query/client';
import { getUser } from '@/query/user';

export const Route = createRootRoute({
  component: Root,
  loader: () => queryClient.ensureQueryData(getUser()),
});

function Root() {
  const user = Route.useLoaderData();

  return (
    <div>
      {user ? <TopBar /> : <></>}
      <Outlet />

      <TanStackRouterDevtools position='bottom-right' />
      <ReactQueryDevtools initialIsOpen={false} position='right' />
    </div>
  );
}