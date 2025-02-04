"use client";

import { SignupForm, SignupData } from '@/components/signup/signup-form'

import { auth } from '@/app/firebase/config';

import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup() {

  const handleSignupSubmit = (data: SignupData) => {

    const email = data.email;
    const password = data.password;

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // console.log('user cred', userCredential);
        alert('Signed up successfully');
      })
      .catch(error => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm onSignupSubmit={handleSignupSubmit} className='dark' />
      </div>
    </div>
  )
}