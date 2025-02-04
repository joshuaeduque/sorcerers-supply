"use client";

import { LoginForm, LoginData } from '@/components/login/login-form'

import { auth } from '@/app/firebase/config'

import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {

  const handleLoginSubmit = (data: LoginData) => {
    const email = data.email;
    const password = data.password;

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        alert('Signed in successfully');
      })
      .catch(error => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onLoginSubmit={handleLoginSubmit} className='dark' />
      </div>
    </div>
  )
}