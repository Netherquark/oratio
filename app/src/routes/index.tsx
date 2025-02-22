import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className='p-[30px]'>
      <div className='h-[25px]'></div>
      <h1 className='text-2xl font-mono font-bold mb-[3px]'>Hey there!</h1>
      <h1 className='text-5xl font-display'>Shardul Nalegave</h1>
      <div className='h-[20px]'></div>
    </div>
  );
}