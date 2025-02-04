"use client";

import { SignupForm } from '@/components/signup/signup-form'

import { app } from '@/app/firebase/config';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { FormEventHandler, useEffect } from 'react';

export default function Signup() {

  useEffect(() => {
    const auth = getAuth(app);
  }, []);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm onSignupSubmit={(data)=>{console.log(data)}} className='dark' />
      </div>
    </div>
  )
}