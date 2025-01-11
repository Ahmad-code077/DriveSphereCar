'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShowToast } from '@/components/Toast';

export default function LoginPage() {
  const router = useRouter();
  const showToast = useShowToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin@gmail.com';

    if (email === adminEmail && password === adminPassword) {
      const userData = { email: adminEmail, role: 'admin' };
      localStorage.setItem('loggedInUser', JSON.stringify(userData));

      // Trigger a localStorage event manually
      window.dispatchEvent(new Event('storage'));

      showToast({
        title: 'Login Successful!',
        description: `Welcome back, ${userData.email}!`,
      });

      router.push('/');
    } else {
      setError('Invalid email or password.');
      showToast({
        title: 'Invalid Credentials',
        description: 'Please check your email and password.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <form
        onSubmit={handleLogin}
        className='space-y-4 w-[90%] md:w-[42%] bg-accent p-6'
      >
        <h1 className='text-lg text-center sm:text-2xl font-bold mb-6'>
          Welcome Back! Please log in.
        </h1>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            placeholder='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className='text-red text-sm'>{error}</p>}
        <Button type='submit' className='w-full bg-primary hover:text-black'>
          Log In
        </Button>
      </form>
    </div>
  );
}
