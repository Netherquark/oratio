import Sidebar from '@/components/sidebar';
import { LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRoute({
  component: () => (
    <div>
      {/* <div className='w-screen py-4 px-3 bg-background border-solid border-b-[1px] border-stone-300/20 flex sticky top-0'>
        <h1 className='text-2xl font-display'>Oratio</h1>
        <div className="grow"></div>
        <Button size='icon' className='cursor-pointer bg-red-700 hover:bg-red-600 text-stone-200'>
          <LogOutIcon />
        </Button>
      </div> */}

      <Outlet />

      <TanStackRouterDevtools position='bottom-right' />
      <ReactQueryDevtools initialIsOpen={false} position='right' />
    </div>
  ),
});