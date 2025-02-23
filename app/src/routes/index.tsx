import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { AuthGuard } from '@/query/auth';
import { getPodcasts } from '@/query/podcasts';
import { getUser } from '@/query/user';
import { useQueries } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { MicIcon, PlayIcon, TrashIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export const Route = createFileRoute('/')({
  component: Index,
  beforeLoad: async () => {
    const isAuth = await AuthGuard();
    if (!isAuth) {
      throw redirect({
        to: '/auth/login'
      });
    }
  },
});

function Index() {
  const [
    { data: user, isLoading: userLoading },
    { data: podcasts, isLoading: podcastsLoading },
  ] = useQueries({
    queries: [getUser(), getPodcasts()],
  });

  if (userLoading || podcastsLoading) return <div>Loading...</div>

  return (
    <ScrollArea className='p-[30px]'>
      <div className='h-[25px]'></div>
      <h1 className='text-2xl font-mono font-bold mb-[3px]'>Hey there!</h1>
      <h1 className='text-5xl font-display'>{ user?.name }</h1>
      <div className='h-[20px]'></div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <MicIcon />
            New Podcast
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate a new Podcast</DialogTitle>
            <DialogDescription>
              Upload the Research Paper that you want to convert.
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full max-w-sm items-center gap-1.5 my-[15px]">
            <Label htmlFor="picture">Research Paper</Label>
            <Input id="research-paper" type="file" />
          </div>
          <Button type="submit">Proceed</Button>
        </DialogContent>
      </Dialog>
      <div className='h-[30px]'></div>

      {[0, 0, 0, 0, 0].map(podcast => (
        <Sheet>
          <SheetTrigger>
            <div className='p-[20px] text-start bg-stone-900 rounded-lg my-[15px] hover:bg-stone-800 cursor-pointer duration-100'>
              <h1 className='text-xl font-mono font-bold mb-[5px]'>Unikernels as Processes</h1>
              <p className='max-h-[75px] overflow-hidden text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
              <div className='h-[15px]'></div>
              <Badge>Badge</Badge>
            </div>
          </SheetTrigger>
          <SheetContent className='min-w-[600px]'>
            <SheetHeader>
              <SheetTitle>Unikernels As Processes</SheetTitle>
              <SheetDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
              </SheetDescription>

              <div className='h-[10px]'></div>
              <div className='flex'>
                <Button>
                  <PlayIcon />
                  Play
                </Button>
                <div className='w-[8px]'></div>
                <Button className='cursor-pointer bg-red-700 hover:bg-red-600 text-stone-200'>
                  <TrashIcon/>
                  Delete
                </Button>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </ScrollArea>
  );
}