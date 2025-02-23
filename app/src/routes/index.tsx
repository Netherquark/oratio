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
import { useState } from 'react';

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

  const [doi, setDOI] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNewPodcast = async (e: any) => {
    e.preventDefault();
  };

  if (userLoading || podcastsLoading) return <div>Loading...</div>;

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
          <form onSubmit={handleNewPodcast} className='my-[15px]'>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="doi">DOI</Label>
              <Input id="doi" type="text" value={doi} onChange={e => {
                e.preventDefault();
                setDOI(e.target.value);
              }} />
            </div>
            <div className='h-[20px]'></div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="research-paper">Research Paper</Label>
              <Input id="research-paper" type="file" />
            </div>
            <div className='h-[20px]'></div>
            <Button type="submit">Proceed</Button>
          </form>
        </DialogContent>
      </Dialog>
      <div className='h-[30px]'></div>

      {
        !podcasts || podcasts?.length == 0 ?
          <div className='px-[20px] py-[60px] text-center bg-stone-900 rounded-lg'>
            <h1 className='text-2xl font-mono font-bold'>No Podcasts</h1>
            <p className='mt-[5px] text-sm text-muted-foreground'>You haven't generated any podcasts yet,<br/>click on the above button to create your first one.</p>
          </div>
        : <></>
      }

      {podcasts?.map(podcast => (
        <Sheet>
          <SheetTrigger>
            <div className='p-[20px] text-start bg-stone-900 rounded-lg my-[15px] hover:bg-stone-800 cursor-pointer duration-100'>
              <h1 className='text-xl font-mono font-bold mb-[5px]'>{podcast.title}</h1>
              <p className='max-h-[75px] overflow-hidden text-sm'>{podcast.abstract}</p>
              <div className='h-[15px]'></div>
              <Badge>{podcast.status}</Badge>
            </div>
          </SheetTrigger>
          <SheetContent className='min-w-[600px]'>
            <SheetHeader>
              <SheetTitle>{podcast.title}</SheetTitle>
              <SheetDescription>
                {podcast.abstract}
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