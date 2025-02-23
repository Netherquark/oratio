import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { AuthGuard, login, signUp } from '@/query/auth';

export const Route = createFileRoute('/auth/signup')({
  component: SignUpPage,
  beforeLoad: async () => {
    const isAuth = await AuthGuard();
    if (isAuth) {
      throw redirect({
        to: '/'
      });
    }
  },
})

function SignUpPage() {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
		const res = await queryClient.fetchQuery(signUp({ name, email, password }));
		if (res === true) {
			const loginRes = await queryClient.fetchQuery(login({ email, password }));
      if (loginRes) {
        window.location.replace('/');
      } else {
        alert('Couldn\'t log you in');
      }
		} else {
      alert('Couldn\'t create new account');
    }
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='p-[30px] h-full w-[400px]'>
        <div className='h-[50px]'></div>
        <h1 className='text-2xl font-raleway'>Create Account</h1>
        <div className='h-[15px]'></div>
        <form onSubmit={handleSubmit}>
          <Input type='text' placeholder="Name" value={name} onChange={e => {
            e.preventDefault();
            setName(e.target.value);
          }} />
          <div className='h-[10px]'></div>
          <Input type="email" placeholder="Email" value={email} onChange={e => {
            e.preventDefault();
            setEmail(e.target.value);
          }} />
          <div className='h-[10px]'></div>
          <Input type="password" placeholder="Password" value={password} onChange={e => {
            e.preventDefault();
            setPassword(e.target.value);
          }} />
          <div className='h-[25px]'></div>
          <Button type='submit' className='cursor-pointer'>Sign Up</Button>
          <div className='h-[10px]'></div>
          <p className='text-sm text-stone-300'>
            Already have an account?
            <Link to='/auth/login' className='ml-[5px] underline'>Login</Link>
          </p>
        </form>
      </div>
      <div className="grow h-full bg-no-repeat bg-cover" style={{
        background: 'url(https://images.unsplash.com/photo-1532153955177-f59af40d6472?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}>
      </div>
    </div>
  );
}
