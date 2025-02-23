import { LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/query/client';
import { logout } from '@/query/auth';

export default function TopBar() {
  const handleLogout = async () => {
    const res = await queryClient.fetchQuery(logout());
    if (res) window.location.replace('/login');
  };

  return (
    <div className='w-screen py-4 px-3 bg-background border-solid border-b-[1px] border-stone-300/20 flex sticky top-0'>
      <h1 className='text-2xl font-display'>Oratio</h1>
      <div className="grow"></div>
      <Button size='icon' className='cursor-pointer bg-red-700 hover:bg-red-600 text-stone-200' onClick={handleLogout}>
        <LogOutIcon />
      </Button>
    </div>
  );
}